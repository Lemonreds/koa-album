let addLoadEvent = require('./dom')

const Lazyload = require('./lazyload')
const Gallery = require('./gallery')



document.ready(() => {

    document.getElementById('home-nav').addEventListener('click', () => {
        window.location.href = '/'
    })

    initGallery()
    initLazyLoad()   

})

function initGallery() {
    let galleryElements = document.getElementsByTagName('img')
    let gallery = new Gallery(galleryElements)
}

function initLazyLoad() {
    let imgs = document.getElementsByClassName('lazyload')
    let lazyload = new Lazyload(imgs)
}