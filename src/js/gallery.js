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