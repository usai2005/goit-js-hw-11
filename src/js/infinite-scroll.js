import { picturesApiService } from './picture-service';
import { createMarkup, gallery } from './create-markup';
import { galleryMarkup } from './one-query-markup';

// let isScrollListenerRegistered = false;

// if (!isScrollListenerRegistered) {
//         isScrollListenerRegistered = true;

    document.addEventListener('scroll', infiniteScroll)
// };

export function infiniteScroll(arrOfPictures) {
console.log(arrOfPictures)
            const {
                scrollTop,
                scrollHeight,
                clientHeight
            } = document.documentElement;
        
            if (scrollTop + clientHeight >= scrollHeight - 200) {

                picturesApiService.fetchPictures()
                    // .then(createMarkup)
                    .then((response) => {
                        const preparedMarkup = createMarkup(response)
                    })
                    // .then(lightbox.refresh)
                    .catch(error => console.error(error));
    };
    
    document.removeEventListener('scroll', infiniteScroll)
            //ADDING NEW MARKUP TO DOM
            // gallery.insertAdjacentHTML('beforeend', galleryMarkup(arrOfPictures));
            // return;
};
