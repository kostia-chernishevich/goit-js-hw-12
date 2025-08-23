import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api.js";
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  refreshGallery,
} from "./js/render-functions.js";

const form = document.querySelector(".form");
const input = document.querySelector('[name="search-text"]');
const loadMoreBtn = document.querySelector(".hidden-btn");

let currentQuery = "";
let page = 1;
let totalHits = 0;

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const query = input.value.trim();
  if (!query) return;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  currentQuery = query;
  page = 1;

  try {
    const resp = await getImagesByQuery(currentQuery, page);
    const hits = resp.hits;
    totalHits = resp.totalHits;

    if (hits.length === 0) {
      iziToast.info({
        message:
          "Sorry, there are no images matching your search query. Please try again!",
      });
      return;
    }

    createGallery(hits, false); 
    refreshGallery(); 

    if (totalHits > page * 15) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (err) {
    iziToast.error({ message: err.message || "Network or server error" });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener("click", async () => {
  page += 1;
  showLoader();
  hideLoadMoreButton();
  try {
    const resp = await getImagesByQuery(currentQuery, page);
    const hits = resp.hits;
    totalHits = resp.totalHits;

    createGallery(hits, true); 
    refreshGallery(); 

    if (totalHits > page * 15) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    }

    const cardHeight = document.querySelector(".card").getBoundingClientRect().height;
    window.scrollBy({ top: cardHeight * 2, behavior: "smooth" });
  } catch (err) {
    iziToast.error({ message: err.message });
  } finally {
    hideLoader();
  }
});