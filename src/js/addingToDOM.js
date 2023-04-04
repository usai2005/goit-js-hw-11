import { galleryMarkup } from './create-markup'
import { smoothAutoScroll } from './infinite-scroll';

export let timerId = null;

export const gallery = document.querySelector('.gallery');

export function addToDOM(pictures) {

    const arrOfPictures = pictures.data.hits;

    gallery.classList.add('byScroll');

    gallery.insertAdjacentHTML('beforeend', galleryMarkup(arrOfPictures));

    timerId = setInterval(smoothAutoScroll, 2000);
};

    
