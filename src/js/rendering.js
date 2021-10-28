import { refs } from './refs'
import ImageApiService from './apiService'
import imagesTpl from '../templates/imagesTpl.hbs'

const imageApiService = new ImageApiService();

refs.searchForm.addEventListener('submit', onSearch)

function onSearch(e) {
    e.preventDefault();

    clearImagesGallery()
    imageApiService.query = e.currentTarget.elements.query.value;
    imageApiService.resetPage();
    imageApiService.fetchImages().then(appendImagesMarkup);
}

function appendImagesMarkup(images) {
    refs.gallery.insertAdjacentHTML('beforeend', imagesTpl(images))
}

function clearImagesGallery() {
    refs.gallery.innerHTML = ''
}

const onEntry = entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && imageApiService.query !== '') {
            imageApiService.fetchImages()
                .then(images => {
                appendImagesMarkup(images);
                imageApiService.incrementPage();
          }) 
        }
    })
}
const observer = new IntersectionObserver(onEntry);
observer.observe(refs.sentinel)

