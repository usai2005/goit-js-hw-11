import { picturesApiService } from './picture-service';
import { addToDOM, gallery} from './addingToDOM';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "simplelightbox/dist/simple-lightbox.min.css";
import { lightbox } from '../index';

export const scrollNotificationData = { endNotificationShown: false };

//calling addToDOM function if all conditions are OK or notification if doesn't exist more pictures to show
//smooth page scrolling
export function infiniteScroll() {

  const {
    scrollTop,
    scrollHeight,
    clientHeight,
  } = document.documentElement;
  
  const reachedBottom = scrollTop + clientHeight >= scrollHeight - 200;

  if (gallery.classList.contains('byScroll') && !picturesApiService.allPicturesLoaded() && reachedBottom) {

//interrupting the scroll event action
    gallery.classList.remove('byScroll')

//getting and using backend response for pages from number two
    picturesApiService.fetchPictures()
      .then(response => {
        addToDOM(response);

//smooth page scrolling
        const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
    
        window.scrollBy({
            top: cardHeight * 3,
            behavior: 'smooth',
        });

//simplelightbox refresh method
        lightbox.refresh();
      })
      .catch(error => console.error(error));

//notification that the end of pictures that were found reached
  } else if (picturesApiService.allPicturesLoaded() && !scrollNotificationData.endNotificationShown) {

     Notify.failure(`We're sorry, but you've reached the end of search results.`);
     scrollNotificationData.endNotificationShown = true;
  };
};