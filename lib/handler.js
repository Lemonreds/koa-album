const path = require('path'),
    fs = require('fs'),
    datas = require('./data'),
    {render} = require('./render')

    
/**
 * 路由处理
 * 
 * 仅处理ctx-body内容
 */
const hanlder = {
    '/': index,
    '/index': index,
    '/albums': albums,
    '/static': static,
    '/notfound':notFound
}


/**
 * @param {ctx} ctx 
 */
function static(ctx) {

    let url = ctx.request.url,
        content,
        staticPath = '../static',
        assestsPath = '../assets'

    /**
     * 判断是否文件是 assets目录下的图片 或者 static下文件(js/css)
     */
    url.indexOf('albums/') === -1 ?
        url = path.join(staticPath, url) : url = path.join(assestsPath, url)

    // 拼接成完整的路径
    url = path.resolve(__dirname, url)

    // 返回这个静态文件给浏览器
    if (fs.existsSync(url)) {

        content = fs.readFileSync(url, 'binary')

        // 图片资源通过Node原生对象写回
        // 没发现koa有相关API....
        if (ctx.type.indexOf('image') !== -1) {
            ctx.res.writeHead(200)
            ctx.res.write(content, 'binary')
        } else
            ctx.body = content
    }else{
        //hanlder 404
    }
}


/**
 * index的路由处理
 * @param {*} ctx 
 */
function index(ctx) {

    let tmpl = 'index', // 模板名称
        data = datas.getAlbumsData() // 模板数据

    // 渲染返回
    ctx.body = render(tmpl, data)
}

/**
 * albums的路由处理
 * 对应某一个相册的页面
 * @param {} ctx 
 */
function albums(ctx, route) {

    let tmpl = 'album',// 模板名称
        data = datas.getPohotoData(route)// 模板数据

    // 渲染返回
    ctx.body = render(tmpl, data)
}

/**
 * 404的路由处理
 * @param {} ctx 
 */
function notFound(ctx){

    let tmpl = '404'

    ctx.body = render(tmpl,null)

}

module.exports = hanlder