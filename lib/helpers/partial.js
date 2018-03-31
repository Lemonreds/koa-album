const ejs = require('ejs'),
    path = require('path'),
    fs = require('fs'),
    helper = require('./helper'),
    views = '../../views'

 
/**
 * 在ejs模板中调用其它ejs模板
 * @param {string} tmpl 
 * @param {object} data 
 */
function partial(tmpl, data) {
    // 获取文件名
    let filename = path.resolve(__dirname, path.join(views, tmpl)),
        content;
    // 补全文件名
    if (tmpl.lastIndexOf('.ejs') === -1) {
        filename = filename + '.ejs'
    }

    ejs.renderFile(filename,Object.assign({partial:partial},data), (err, str) => {

        if (err) throw err
        content = str
    })

    return content
}





module.exports = partial