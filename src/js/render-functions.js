import iziToast from "izitoast";
import SimpleLightbox from "simplelightbox";

export function createMarkup(arr) {
    return arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `
            <li class="gallery-item">
                <a class="gallery-link" href="${largeImageURL}">
                    <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
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

export function showLoader(loader) {
    loader.textContent = "Loading images, please wait..."; 
    loader.classList.remove("hidden");
}

export function hideLoader(loader) {
    loader.classList.add("hidden");
}

export function displayNoResultsError() {
    iziToast.error({
        message: "Sorry, there are no images matching your search query. Please try again!",
        position: "topRight",
    });
}

export function displayFetchError() {
    iziToast.error({
        title: "Error",
        message: "An error occurred while fetching images. Please try again later.",
        position: "topRight",
    });
}

export function displayEndOfResults() {
    iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: "topRight",
    });
}