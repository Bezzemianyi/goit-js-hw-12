import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector(".search-form")
const input = document.querySelector(".search-input")
const galleryMenu = document.querySelector(".gallery")
const loader = document.querySelector(".loader");
const loadMore = document.querySelector(".load-more-btn")

form.addEventListener("submit", handleSearch)
loadMore.addEventListener("click", onLoadMore)

const API_KEY = "47599452-88585afd800a8eb35bdc3af8b";
const BASE_URL = "https://pixabay.com/api/";
let page = 1;
let currentQury = "";
let loadedHits = 0;
const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});

async function fetchImages(currentQury = "" , page = 1) {
    const params = new URLSearchParams({
        key: API_KEY,
        q: currentQury,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true",
        page,
        per_page: 15
    });
    try {
        const response = await axios(`${BASE_URL}?${params}`)
        console.log(response);
        return response.data;
    } catch (error) {
        throw new Error(res.statusText);
    }
}

 async function handleSearch(event) {
    event.preventDefault();
    currentQury = input.value.trim();

    if (!currentQury) {
        iziToast.error({
            title: "Error",
            message: "Please enter a keyword to search.",
            position: "topRight",
        });
        return;
    }
    showLoader();

     galleryMenu.innerHTML = "";
     page = 1;
     loadedHits = 0;
     
     try {
         const data = await fetchImages(currentQury); 

         if (!data.hits.length) {
             iziToast.error({
                 message: "Sorry, there are no images matching your search query. Please try again!",
                 position: "topRight",
             });
             return;
         }
         galleryMenu.innerHTML = createMarkup(data.hits);
         loadedHits = data.hits.length;
         lightbox.refresh();

         console.log(data.hits);
         console.log(data.totalHits);

         if (loadedHits < data.totalHits) {
         loadMore.classList.remove("hidden");
         } else {
             loadMore.classList.add("hidden");
         }
         
         
     } catch (error) {
        console.error(error);
        iziToast.error({
            title: "Error",
            message: "An error occurred while fetching images. Please try again later.",
            position: "topRight",
        });
    } finally {
        hideLoader(); 
        form.reset(); 
     }
}
function createMarkup(arr) {
    return arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `
            <li class="gallery-item">
                <a class="gallery-link" href="${largeImageURL}">
                    <img
                        class="gallery-image"
                        src="${webformatURL}"
                        alt="${tags}"
                    />
                </a>
                <ul class="gallery-item-categories-menu">
                    <li class="gallery-item-categories-menu-item">
                        <p class="categories-item-title">Likes</p>
                        <p class="categories-item-count">${likes}</p>
                    </li>
                    <li class="gallery-item-categories-menu-item">
                        <p class="categories-item-title">Views</p>
                        <p class="categories-item-count">${views}</p>
                    </li>
                    <li class="gallery-item-categories-menu-item">
                        <p class="categories-item-title">Comments</p>
                        <p class="categories-item-count">${comments}</p>
                    </li>
                    <li class="gallery-item-categories-menu-item">
                        <p class="categories-item-title">Downloads</p>
                        <p class="categories-item-count">${downloads}</p>
                    </li>
                </ul>
            </li>
        `;
    }).join("");
}
function showLoader() {
    loader.textContent = "Loading images, please wait..."; 
    loader.classList.remove("hidden");
}

function hideLoader() {
    loader.classList.add("hidden");
}

async function onLoadMore() {
        page += 1;
        try {
            const data = await fetchImages(currentQury, page);
            galleryMenu.insertAdjacentHTML("beforeend", createMarkup(data.hits))
            loadedHits += data.hits.length;
            lightbox.refresh();

            if (loadedHits >= data.totalHits) {
            loadMore.classList.add("hidden");
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: "topRight",
            });
        }
        } catch (error) {
            alert(error.message);
     }
}