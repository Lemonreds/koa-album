
/**
 * MIME 类型
 */
const path = require('path')
const MIME = {
    'js': 'text/javascript',
    'json': 'application/json',
    'css': 'text/css',
    'html': 'text/html',
    'ico': 'image/x-icon',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'png': 'image/png',
    'svg': 'image/svg+xml'
}



/**
 * 获取url请求的MIME类型
 * @param {string} url 
 */
function getMIME(url) {

    let ext = path.extname(url).replace('.', "").toLocaleLowerCase()

    if (MIME.hasOwnProperty(ext)) {
        return MIME[ext]
    } else {
        return ''
    }
}


exports.getMIME = getMIME;