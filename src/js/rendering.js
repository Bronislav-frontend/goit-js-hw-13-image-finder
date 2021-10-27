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
        if (entry.isIntersecting) {
            console.log('ало')
            imageApiService.fetchImages().then(images => {
                appendImagesMarkup(images);
                imageApiService.incrementPage();
          }) 
        }
    })
}
const options = {}
const observer = new IntersectionObserver(onEntry, options);
const items = document.querySelectorAll('.photo-item');
const lastItem = items[items.length - 1]
console.log (lastItem)

observer.observe(lastItem)