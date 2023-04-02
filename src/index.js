//IMPORTS
import throttle from 'lodash.throttle';
import debounce from 'lodash.debounce';
// import SimpleLightbox from "simplelightbox";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';
import "simplelightbox/dist/simple-lightbox.min.css";
// import {loadNewPageByScroll} from './js/infinite-scroll';
// import noMorePictures from './js/no-more-pictures';
import { picturesApiService } from './js/picture-service';
import { createMarkup, gallery } from './js/create-markup';



//VARIABLES
const body = document.querySelector('body');
const form = document.querySelector('.search-form');
const searchBtn = document.querySelector('[type="submit"]');
const inputField = document.querySelector('[name="searchQuery"]');

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

//USING SIMPLELIGHTBOX

    
//FIXED HEADER
const { height: headerHeight } = header.getBoundingClientRect();
document.body.style.paddingTop = `${headerHeight}px`;

//SEARCHING BY REQUEST AND CREATING DYNAMIC MARKUP
// let searchQuery = '';

// console.log(picturesApiService)

form.addEventListener('submit', onSubmitBtnClick);

//GETTING FETCH RESULT
function onSubmitBtnClick(e) {

    gallery.innerHTML = '';

    e.preventDefault();
  
    picturesApiService.query = e.currentTarget.elements.searchQuery.value;

    picturesApiService.fetchPictures()
        .then(createMarkup)
        .catch(error => console.error(error));
};

// loadNewPageByScroll();

//LOADING ADDITIONAL PAGES BY SCROLL. CALLING DYNAMIC MARKUP CREATING FUNCTION. SCROLLING BY SCROLLBY


    // const onScroll = function() {
        
    // const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();

    // window.scrollBy({
    //     top: cardHeight * 2 + 30,
    //     behavior: 'smooth',
    // });

    //     const {
    //         scrollTop,
    //         scrollHeight,
    //         clientHeight
    //     } = document.documentElement;
        
    //     if (scrollTop + clientHeight >= scrollHeight - 200) {
            
    //         picturesApiService.fetchPictures(searchQuery)
    //             .then(createMarkup)
    //             .catch(error => console.error(error));
    //     };
    // };
    
// function infiniteScroll() {

//     if (!isScrollListenerRegistered) {
//         isScrollListenerRegistered = true;
        
//         document.addEventListener('scroll', () => {
//             const {
//                 scrollTop,
//                 scrollHeight,
//                 clientHeight
//             } = document.documentElement;
        
//             if (scrollTop + clientHeight >= scrollHeight - 200) {
//             picturesApiService.fetchPictures(searchQuery)
//                 .then(createMarkup)
//                 .then(lightbox.refresh())
//                 .catch(error => console.error(error));
//             };
//         });
//     };
// };

// function searchResultNotification(arrOfPictures) {
//     if (arrOfPictures.length === 0) {
//         Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//         return;
//     } else if (picturesApiService.page === 1) {
//         Notify.info(`Hooray! We found ${pictures.data.totalHits} images.`);
//     };
// };
    
    

function noMorePictures() {

    Notify.failure(`We're sorry, but you've reached the end of search results.`);

    if (Math.ceil(picturesApiService.totalHits / picturesApiService.perPage) === 1) {
        return;
    }

    document.removeEventListener('scroll', onScroll);
};