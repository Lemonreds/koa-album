
/**
 * 插入css标签到EJS模板生成的Html中
 * @param {string} path 
 */
function css(path) {

    if (typeof (path) != 'string') return ''

    if (path.substring(path.length - 4, path.length) !== '.css') path += '.css'

    return '<link rel="stylesheet" href="/' + path + '" type="text/css" >'
}

module.exports = css