import { fetchImages } from "./js/pixabay-api.js";
import { createMarkup, showLoader, hideLoader, displayNoResultsError, displayFetchError, displayEndOfResults } from "./js/render-functions.js";
import SimpleLightbox from "simplelightbox";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector(".search-form");
const input = document.querySelector(".search-input");
const galleryMenu = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const loadMore = document.querySelector(".load-more-btn");

let page = 1;
let currentQury = "";
let loadedHits = 0;
const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});

form.addEventListener("submit", handleSearch);
loadMore.addEventListener("click", onLoadMore);

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
    
    page = 1;  // сброс страницы на 1 при новом запросе

    showLoader(loader);
    galleryMenu.innerHTML = "";
    loadedHits = 0;
    loadMore.disabled = false;
    loadMore.classList.add("hidden");

    try {
        const data = await fetchImages(currentQury, page); 

        if (!data.hits.length) {
            displayNoResultsError();
            return;
        }

        galleryMenu.innerHTML = createMarkup(data.hits);
        loadedHits = data.hits.length;
        lightbox.refresh();

        if (loadedHits < data.totalHits) {
            loadMore.classList.remove("hidden");
        } else {
            loadMore.classList.add("hidden");
        }
    } catch (error) {
        console.error(error);
        displayFetchError();
    } finally {
        hideLoader(loader);
        form.reset();
    }
}

async function onLoadMore() {
    page += 1;
    loadMore.disabled = true;
    loadMore.classList.add("hidden");
    showLoader(loader);

    try {
        const data = await fetchImages(currentQury, page);
        galleryMenu.insertAdjacentHTML("beforeend", createMarkup(data.hits));
        loadedHits += data.hits.length;
        lightbox.refresh();

        if (loadedHits >= data.totalHits) {
            loadMore.classList.add("hidden");
            displayEndOfResults();
        } else {
            loadMore.classList.remove("hidden");
        }

        const card = document.querySelector(".gallery-item");
        const cardHeight = card.getBoundingClientRect().height;
        window.scrollBy({
            left: 0,
            top: cardHeight * 2,
            behavior: "smooth"
        });

    } catch (error) {
        alert(error.message);
    } finally {
        loadMore.disabled = false;
        hideLoader(loader);
    }
}