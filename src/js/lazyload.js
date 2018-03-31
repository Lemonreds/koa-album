class LazyLoad {

    constructor(images) {
        this.images = images
        this.src = 'data-src'
        this.observer = null
        this.init()
    }

    init() {

        if (!window.IntersectionObserver) {
            this.loadAll()
            return;
        }

        let observerConfig = {
            root: null,
            rootMargin: "0px",
            threshold: [0]
        }

        let observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.intersectionRatio > 0) {
                    let imgae = entry.target
                    let src = imgae.getAttribute(this.src)
                    this.setImage(imgae, src)
                    observer.unobserve(imgae)                   
                }
            })
        }, observerConfig)

        for (let image of this.images) {
            observer.observe(image)
        }
    }

    loadAll() {
        for (let image of this.images) {

            let src = image.getAttribute(this.src)

            this.setImage(image, src)
        }
    }

    setImage(image, src) {

        if (src) {
            if ("img" === image.tagName.toLowerCase()) {
                image.src = src
            } else {
                image.style.backgroundImage = "url(" + src + ")"
            }
            image.removeAttribute(this.src)
        }
    }
}


module.exports = LazyLoad