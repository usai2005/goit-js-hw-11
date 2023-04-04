import { picturesApiService } from './picture-service';
import { addToDOM, gallery, timerId } from './addingToDOM';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "simplelightbox/dist/simple-lightbox.min.css";
import { lightbox } from '../index';

export const scrollNotificationData = { endNotificationShown: false };

const {
  scrollTop,
  scrollHeight,
  clientHeight,
} = document.documentElement;

const ReachedBottom = scrollTop + clientHeight >= scrollHeight - 200;

//calling addToDOM function if all conditions are OK or notification if doesn't exist more pictures to show 
export function infiniteScroll() {

  if (gallery.classList.contains('byScroll') && !picturesApiService.allPicturesLoaded() && ReachedBottom) {

    gallery.classList.remove('byScroll')
   
    picturesApiService.fetchPictures()
      .then(response => {
        addToDOM(response);
        lightbox.refresh();
      })
      .catch(error => console.error(error));
    
  } else if (picturesApiService.allPicturesLoaded() && !scrollNotificationData.endNotificationShown) {

     Notify.failure(`We're sorry, but you've reached the end of search results.`);
     scrollNotificationData.endNotificationShown = true;
  };
};

//autoscroll function and calling infiniteScroll function
export function smoothAutoScroll() {
  const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
    
        window.scrollBy({
            top: cardHeight * 2 + 30,
            behavior: 'smooth',
        });

        if (document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 200) {

            infiniteScroll()

            clearInterval(timerId);
        };
    };
