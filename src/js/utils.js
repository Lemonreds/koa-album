

/**
 * 是否是移动端
 */
function isMobile() {

    const userAgentInfo = navigator.userAgent,
        Agents = new Array('Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod')
    let flag = false
    for (let v = 0 ;v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = true
            break
        }
    }
    return flag
}


module.exports = {
    isMobile : isMobile
}
