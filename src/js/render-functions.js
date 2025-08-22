import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let lightbox = null;

const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");


function ensureLightbox() {
    
    if (!lightbox) {
        lightbox = new SimpleLightbox(".gallery a", {
            captionsData: "alt",
            captionDelay: 250,
            nav: true,
            loop: true,
            showCounter: true,
           
        });
    } else {

        lightbox.refresh();
    }
}




export function createGallery(images, append=true) {
    const markup = images
        .map(
            (img) => `
      <li class="card">
        <a href="${img.largeImageURL}" rel="noopener noreferrer">
          <img src="${img.webformatURL}" alt="${img.tags || "image"}" loading="lazy">
        </a>
        <ul class="stats">
          <li><span>Likes</span><span>${img.likes}</span></li>
          <li><span>Views</span><span>${img.views}</span></li>
          <li><span>Comments</span><span>${img.comments}</span></li>
          <li><span>Downloads</span><span>${img.downloads}</span></li>
        </ul>
      </li>`
        )
        .join("");
    if (append) {
     gallery.insertAdjacentHTML("beforeend", markup);
    } else {
   gallery.innerHTML = markup;
}
   


    ensureLightbox();
}

export function clearGallery() {
    gallery.innerHTML = "";
}

export function showLoader() {
    if (loader) loader.classList.remove("hidden");
}

export function hideLoader() {
    if (loader) loader.classList.add("hidden");
}
export function hideLoadMoreButton() {
      const loadMoreBtn = document.querySelector('.hidden-btn');
    if (loadMoreBtn) loadMoreBtn.style.display= 'none';
  
}
export function showLoadMoreButton() {
      const loadMoreBtn = document.querySelector('.hidden-btn');
      if (loadMoreBtn) loadMoreBtn.style.display= 'block';
    
 }