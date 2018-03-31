
document.ready = (cb) => {

    if (document.addEventListener) {

        let readyFn = () => {
            document.removeEventListener('DOMContentLoaded', readyFn, false)
            cb()
        }
        document.addEventListener('DOMContentLoaded', readyFn)
    } else {
        addLoadEvent(cb)
    }
}

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