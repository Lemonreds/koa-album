
/**
 * 入口JS文件
 */



const addLoadEvent = require('./dom')
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

    // 返回主页按钮事件
    document.getElementById('home-nav').addEventListener('click', () => {
        window.location.href = '/'
    })

    // 初始化图片相册
    initGallery()
    // 初始化懒加载图片
    initLazyLoad()   
})



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