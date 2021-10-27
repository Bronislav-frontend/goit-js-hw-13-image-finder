const BASE_URL = 'https://pixabay.com/api'
const API_KEY = 'key=24062603-26c27bb668dda6ecae2734f01'

export default class ImageApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchImages() {
        const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&${API_KEY}`;

       return fetch(url)
            .then(r => r.json())
            .then(({hits}) => {
                this.incrementPage();
                return hits
            })

    }

    get query() {
        return this.searchQuery
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }
}



