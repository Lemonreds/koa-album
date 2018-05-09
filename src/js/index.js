let addLoadEvent = require('./dom')

const LazyLoad = require('./lazyload')
const Gallery = require('./gallery')


document.ready = (cb) => {

    if (document.addEventListener) {

        let readyFn = () => {
            cb()
            document.removeEventListener('DOMContentLoaded', readyFn, false)            
        }
        document.addEventListener('DOMContentLoaded', readyFn)
    } else {
        addLoadEvent(cb)
    }
}



document.ready(() => {

    document.getElementById('home-nav').addEventListener('click', () => {
        window.location.href = '/'
    })

    initGallery()
    initLazyLoad()   

//    ajaxtest()
})

// function ajaxtest(){

//     console.log(55)
    
//     let xhr = new XMLHttpRequest()
//     xhr.open('GET','/ajax/11')

//     xhr.onreadystatechange = ()=>{
//             console.log(xhr.status)
//             console.log(xhr.readyState)
//     }
//     xhr.send(null)

// }


function initGallery() {
    let galleryElements = document.getElementsByTagName('img')
    let gallery = new Gallery(galleryElements)
}

function initLazyLoad() {
    
    let imgs = document.getElementsByClassName('lazyload')

    HTMLCollection.prototype.forEach = function (cb) {
        Array.prototype.slice.call(this).forEach(cb)
    }

    let lz = new LazyLoad(imgs)
}