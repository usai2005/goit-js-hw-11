import { galleryMarkup } from './create-markup'
import { smoothScroll } from './infinite-scroll';

export const gallery = document.querySelector('.gallery');

export function addToDOM(pictures) {

    const arrOfPictures = pictures.data.hits;

//adding a class to an element to later interrupt the scroll event action
    gallery.classList.add('byScroll');

//adding to DOM
    gallery.insertAdjacentHTML('beforeend', galleryMarkup(arrOfPictures));

};

