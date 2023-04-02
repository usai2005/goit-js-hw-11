import { picturesApiService } from './picture-service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { galleryMarkup } from './one-query-markup';
import { infiniteScroll } from './infinite-scroll';
import { SimpleLightbox } from "simplelightbox/dist/simple-lightbox.esm"; 

// const lightboxGallery = new SimpleLightbox('.gallery a');
console.log(picturesApiService);
export const gallery = document.querySelector('.gallery');

// export let arrOfPictures = [];
    // console.log(arrOfPictures);

export function createMarkup(pictures) {

    console.log(pictures)

    const arrOfPictures = pictures.data.hits;
    
    console.log(arrOfPictures);
    console.log(arrOfPictures.length);

//SEARCH RESULTS NOTIFICATION
    if (arrOfPictures.length === 0) {

        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return;

    } else if (picturesApiService.page === 1) {

        Notify.info(`Hooray! We found ${pictures.data.totalHits} images.`);

        //ADDING FIRST PAGE MARKUP TO DOM
        gallery.insertAdjacentHTML('beforeend', galleryMarkup(arrOfPictures));
        
        if (Math.ceil(picturesApiService.totalHits / picturesApiService.perPage) === 1) {
            
            Notify.failure(`We're sorry, but you've reached the end of search results.`);
            return;
        };

               
    // } else {
        //ADDING NEW MARKUP TO DOM
    //     gallery.insertAdjacentHTML('beforeend', galleryMarkup(arrOfPictures));
    }
        
    //CHECKING IF EXISTS MORE PICTURES TO SHOW
    if (picturesApiService.page <= Math.floor(picturesApiService.totalHits / picturesApiService.perPage && picturesApiService.page >= 2)) {

       infiniteScroll(arrOfPictures);
    };

    //ADDING NEW MARKUP TO DOM
    // gallery.insertAdjacentHTML('beforeend', galleryMarkup(arrOfPictures));

    
    // if (picturesApiService.page <= Math.floor(picturesApiService.totalHits / picturesApiService.perPage && picturesApiService.page > 1)) {
        
    //     infiniteScroll();
    // };

    // const lightboxGallery = new SimpleLightbox('.gallery a');
    
   //CHECKING IF AMOUNT OF TOTALHITS THAT WERE FOUND IS LESS THEN PERPAGE BUT MORE THEN ZERO
    // if (picturesApiService.totalHits <= picturesApiService.perPage && arrOfPictures.length !== 0) {

    // noMorePictures()
    //     return;
    // };

    

};

 
