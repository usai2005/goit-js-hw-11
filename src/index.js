//imports
import SimpleLightbox from "simplelightbox";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';
import "simplelightbox/dist/simple-lightbox.min.css";
import { picturesApiService } from './js/picture-service';
import { addToDOM, gallery } from './js/addingToDOM';
import { infiniteScroll, scrollNotificationData } from './js/infinite-scroll';

//variables
const body = document.querySelector('body');
const form = document.querySelector('.search-form');
const searchBtn = document.querySelector('[type="submit"]');
const inputField = document.querySelector('[name="searchQuery"]');

//static markup creating
inputField.classList.add('search-field');
searchBtn.classList.add('search-btn');

const header = document.createElement('header');
header.classList.add('page-header');
const section = document.createElement('section');
section.classList.add('section');
const container = document.createElement('div');
container.classList.add('container');

body.prepend(header, section);
header.prepend(form);
section.prepend(container);
container.prepend(gallery);

//usage of simplelightbox
export const lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });

//fixed header
const { height: headerHeight } = header.getBoundingClientRect();
document.body.style.paddingTop = `${headerHeight}px`;

//listeners
form.addEventListener('submit', onSubmitBtnClick);
document.addEventListener('scroll', () => {
    infiniteScroll();
});

//getting fetch result
function onSubmitBtnClick(e) {

//clearing markup
    gallery.innerHTML = '';

//preventing default behaviour
    e.preventDefault();
  
    picturesApiService.query = e.currentTarget.elements.searchQuery.value;
  
    scrollNotificationData.endNotificationShown = false;

//getting and using backend response for first page
    picturesApiService.fetchPictures()
        .then((response) => {const noResults = response.data.hits.length === 0;

//notification if no result or amount of pictures found
    if (noResults) {

        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        } else {

        Notify.info(`Hooray! We found ${response.data.totalHits} images.`);

//notification if all pictures were loaded
        if (picturesApiService.allPicturesLoaded()) {

            Notify.failure(`We're sorry, but you've reached the end of search results.`);

            scrollNotificationData.endNotificationShown = true;
        };

//calling of addToDOM function
        addToDOM(response);
    };

//refresh method of simplelightbox using
    lightbox.refresh();
    })

//if error was caught      
    .catch(error => console.error(error));
};