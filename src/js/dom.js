

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