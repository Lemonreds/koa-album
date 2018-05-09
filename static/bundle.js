(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){


exports.addLoadEvent = function addLoadEvent(fn) {

    let old = window.onload

    if (typeof old != 'function') {
        window.onload = fn
    } else {

        window.onload = () => {
            old()
            fn()
        }
    }
}
},{}],2:[function(require,module,exports){
class Gallery {

    constructor(elements) {
        this.elements = elements

        this.isMobile() ? this.config = {
            width: window.innerWidth * 0.98,
            height: window.innerHeight * 0.64
        } : this.config = {
            width: window.innerWidth * 0.68,
            height: window.innerHeight * 0.78
        }

        this.mainthumb = null
        this.bottomDom = null

        this.init()
    }
    init() {

        Array.from(this.elements).forEach((element) => {
            element.addEventListener('click', () => {

                this.layout()
                this.show(element)
            })
        })
    }
    layout() {

        let container = document.createElement('div'),
            mainBox = document.createElement('div'),
            bottom = document.createElement('div'),
            mainthumb = document.createElement('img')




        container.className = 'gContainer'
        mainBox.className = 'gmainBox gSlideDown'
        bottom.className = 'gBottom'
        this.setStyle(mainBox)



        this.mainthumb = mainthumb
        this.bottomDom = bottom
        mainBox.appendChild(mainthumb)

        container.appendChild(bottom)
        container.appendChild(mainBox)


        container.addEventListener('click', () => {
            this.desotry()
        })
        document.getElementsByTagName('body')[0].appendChild(container)

    }
    show(element) {

        // mainthumb      

        this.mainthumb.src = this.getSrc(element)


        // bottomThumb
        let adjacent = this.getAdjacent(element)
        for (let index of adjacent.values()) {

            let bottomThumb = document.createElement('img'),
                elem = this.elements[index]

            // add active Element
            if (element === elem) {
                bottomThumb.className = 'gActive'
            }


            // add Bottom Thumb
            bottomThumb.src = this.getSrc(elem)
            bottomThumb.addEventListener('click', (e) => {
                this.clearDOM(this.bottomDom)
                this.show(elem)
                e.stopPropagation()
            })

           
            this.bottomDom.appendChild(bottomThumb)
        }

    }

    clearDOM(dom) {

        while (dom.hasChildNodes()) {
            dom.removeChild(dom.firstChild)
        }
    }

    getAdjacent(element) {

        /// 找到正在显示的thumb下标
        let idx = -1
        for (let e of this.elements) {
            idx++
            if (e === element)
                break
        }
        // 找到附近 images 张的所有thumb
        let thumb = new Set(),
            count = this.isMobile() ? 5 : 9,
            length = this.elements.length - 1

        //起始坐标
        let i = parseInt(idx - (count / 2)) + 1


        for (; count > 0; i++) {
            if (i >= 0) {
                if (i > length - 1) {
                    thumb.add((length + i) % length)
                } else {
                    thumb.add(i)
                }
                count--
            }
        }


        return thumb
    }



    setSrc(element, src) {
        if (src) {
            if ("img" === element.tagName.toLowerCase()) {
                element.src = src
            } else {
                element.style.backgroundImage = "url(" + src + ")"
            }
        }

    }

    getSrc(element) {

        let src = ''
        src = element.getAttribute('src')

        if (!src) {
            let bgr = element.style.backgroundImage,
                src = bgr.substring(6, bgr.length - 2)
        }

        if (!src) {
            // 避免懒加载图片时
            // 图片路径失败的情况.
            src = element.getAttribute('data-src')
        }
     
        
        return src
    }

    setStyle(element, width = this.config.width, height = this.config.height, center = true) {

        let unit = 'px',
            style = element.style

        style.width = width + unit
        style.height = height + unit

        if (center) {
            style.marginTop = (height * -0.5) + unit
            style.marginLeft = (width * -0.5) + unit
        }
    }

    desotry() {
        let container = document.getElementsByClassName('gContainer')[0]
        document.getElementsByTagName('body')[0].removeChild(container)
    }

    isMobile() {

        const userAgentInfo = navigator.userAgent,
            Agents = new Array('Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod')
        let flag = false
        for (let v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = true
                break
            }
        }
        return flag
    }
}


module.exports = Gallery
},{}],3:[function(require,module,exports){
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
},{"./dom":1,"./gallery":2,"./lazyload":4}],4:[function(require,module,exports){

let LazyLoad = (function () {
    const defaults = {
            src: 'data-src'
        },
        root = window

    function LazyLoad(images) {
        this.settings = defaults
        this.images = images
        this.observer = null
        this.init()
    }

    LazyLoad.prototype = {
        init: function () {

            if (!root.IntersectionObserver) {
                this.loadImages()
                return
            }

            let self = this
            let observerConfig = {
                root: null,
                rootMargin: "0px",
                threshold: [0]
            }

            this.observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.intersectionRatio > 0) {
                        self.observer.unobserve(entry.target)

                        let src = entry.target.getAttribute(self.settings.src)

                        if (src) {
                            if ("img" === entry.target.tagName.toLowerCase()) {

                                entry.target.src = src
                                entry.target.removeAttribute(self.settings.src)
                            } else {
                                entry.target.style.backgroundImage = "url(" + src + ")"
                                entry.target.removeAttribute(self.settings.src)
                            }
                        }
                    }
                })
            }, observerConfig)

            this.images.forEach(function (image) {
                self.observer.observe(image)
            })

        },

        loadImages: function () {
            if (!this.settings) {
                return
            }

            let self = this
            this.images.forEach(function (image) {
                let src = image.getAttribute(self.settings.src)
                if (src) {
                    if ("img" === image.tagName.toLowerCase()) {

                        image.src = src
                        image.removeAttribute(self.settings.src)
                    } else {
                        image.style.backgroundImage = "url(" + src + ")"
                        image.removeAttribute(self.settings.src)
                    }
                }

            })
        }      
    }

    return LazyLoad
})()

module.exports = LazyLoad
},{}]},{},[3]);
