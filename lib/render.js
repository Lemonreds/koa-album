const ejs = require('ejs'),
    fs = require('fs'),
    path = require('path'),
    helper = require('./helpers/helper'),
    datas = require('./data')

/**
 * 对上一层ejs渲染的content进行layout包装 再进行一次渲染
 * 同时包装 helper 函数 能在模板中直接调用
 * @param {string} content 
 */
function layout(content) {

    return render('layout', Object.assign({},{  
        main: content
    },datas.getSitesConfigData(),helper), false)
}


/**
 * 
 * ejs模板渲染
 * @param {string} tmpl 模板名字
 * @param {string} data  模板数据
 * @param {boolean} needLayout 是否嵌套入layout.ejs(默认为是)
 */
function render(tmpl, data, needLayout = true) {

    // 获取文件名
    let content,
        filename = getTmplPath(tmpl)
        

    // 补全文件名
    if (tmpl.lastIndexOf('.ejs') === -1) {
        filename = filename + '.ejs'
    }
    // 生成file
    ejs.renderFile(filename, Object.assign({},datas.getSitesConfigData(),helper,data), (err, str) => {

        if (err) throw err
        content = str
    })


    // 是否需要嵌套进layout模板
    if (needLayout) {
        content = layout(content)
    }

    return content
}
/**
 * 获取名字为tmpl的模板路径
 * @param {string} tmpl 
 */
function getTmplPath(tmpl) {

    let views = '../views'

    return path.resolve(__dirname, path.join(views, tmpl))
}


module.exports.render = render