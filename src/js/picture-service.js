import axios from 'axios';
class PicturesApiService {
    constructor() {
        this.searchQueryArg = '';
        this.page = 0;
        this.perPage = 40;
        this.totalHits = 0;
        // this.arrO
    }

    async fetchPictures() {
        this.page += 1;
        
        const PIXABAY_API_KEY = '34698924-79f900cdf3ce6a77ada7891ad';
        
        const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${this.searchQueryArg}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.perPage}&totalHits=100`;

        console.log(url);

        const response = await axios.get(url);
        this.totalHits = response.data.totalHits;

        return response;
    }

    get query() {
        return this.searchQueryArg;
    }

    set query(newQuery) {
        this.searchQueryArg = newQuery;
        this.page = 0;
    }
};

export const picturesApiService = new PicturesApiService();
