import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default function noMorePictures() {

    Notify.failure(`We're sorry, but you've reached the end of search results.`);

    if (Math.ceil(picturesApiService.totalHits / picturesApiService.perPage) === 1) {
        return;
    }

    document.removeEventListener('scroll', onScroll);
};