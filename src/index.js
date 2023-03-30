//IMPORTS
import throttle from 'lodash.throttle';
import SimpleLightbox from "../node_modules/simplelightbox";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PicturesApiService from './js/picture-service';
import './css/styles.css';
import "simplelightbox/dist/simple-lightbox.min.css";

//VARIABLES
const body = document.querySelector('body');
const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const searchBtn = document.querySelector('[type="submit"]');
const inputField = document.querySelector('[name="searchQuery"]');

let isScrollListenerRegistered = false;

//STATIC MARKUP CREATING
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

//FIXED HEADER
const { height: headerHeight } = header.getBoundingClientRect();
document.body.style.paddingTop = `${headerHeight}px`;

//SEARCHING BY REQUEST AND CREATING DYNAMIC MARKUP
let searchQuery = '';

const picturesApiService = new PicturesApiService();

form.addEventListener('submit', onSubmitBtnClick);

//GETTING FETCH RESULT
function onSubmitBtnClick(e) {

    gallery.innerHTML = '';

    e.preventDefault();
  
    picturesApiService.query = e.currentTarget.elements.searchQuery.value;

    picturesApiService.fetchPictures(searchQuery)
        .then(createMarkup)
        .catch(error => console.error(error));
};

//DYNAMIC MARKUP CREATING USING RESPONSE DATA
function createMarkup(pictures) {

    const arrOfPictures = pictures.data.hits;

//NOTIFICATION
    if (arrOfPictures.length === 0) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return;
    } else if (picturesApiService.page === 1) {
        Notify.info(`Hooray! We found ${pictures.data.totalHits} images.`);
    };

    const galleryMarkup = arrOfPictures.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {

        return `
            <a class="link card-item" href="${largeImageURL}">
                <div class="photo-card">
                    <img class="card-img" src="${webformatURL}" alt="${tags}" width="300" loading="lazy">
                
                <div class="info">
                    <p class="info-item"><b>Likes</b>${likes}</p>
                    <p class="info-item"><b>Views</b>${views}</p>
                    <p class="info-item"><b>Comments</b>${comments}</p>
                    <p class="info-item"><b>Downloads</b>${downloads}</p>
                </div>
                </div>
            </a>`
    }).join('');

    gallery.insertAdjacentHTML('beforeend', galleryMarkup);
    

   //USING SIMPLELIGHTBOX
    const lightbox = new SimpleLightbox('.gallery a');
    lightbox.refresh();
    
    //CHECKING IF AMOUNT OF TOTALHITS THAT WERE FOUND IS LESS THEN PERPAGE BUT MORE THEN ZERO
    if (picturesApiService.totalHits <= picturesApiService.perPage && arrOfPictures.length !== 0) {

        noMorePictures();
        return;
    };

    //CHECKING IF EXISTS MORE PICTURES TO SHOW
    if ( picturesApiService.page <= Math.floor(picturesApiService.totalHits / picturesApiService.perPage)) {
        loadMorePictures();
    };
};

//LOADING ADDITIONAL PAGES BY SCROLL. CALLING DYNAMIC MARKUP CREATING FUNCTION. SCROLLING BY SCROLLBY
function loadMorePictures() {

    const onScroll = function() {
        
    const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2 + 30,
        behavior: 'smooth',
    });

        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement;
        
        if (scrollTop + clientHeight >= scrollHeight - 200) {
            
            picturesApiService.fetchPictures(searchQuery)
                .then(createMarkup)
                .catch(error => console.error(error));
        };
    };
    
    if (!isScrollListenerRegistered) {
        isScrollListenerRegistered = true;
        document.addEventListener('scroll', throttle(onScroll, 3000));
    };
};

function noMorePictures() {

    Notify.failure(`We're sorry, but you've reached the end of search results.`);

    if (Math.ceil(picturesApiService.totalHits / picturesApiService.perPage) === 1) {
        return;
    }

    document.removeEventListener('scroll', onScroll);
};