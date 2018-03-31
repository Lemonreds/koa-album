/**
 * 插入js标签到EJS模板生成的Html中
 * @param {string} path 
 */
function js(path) {
    
    if (typeof (path) != 'string') return '';

    if (path.substring(path.length - 3, path.length) !== '.js') path += '.js';

    return '<script type="text/javascript" src="/' + path +'"></script>';
}

module.exports = js;