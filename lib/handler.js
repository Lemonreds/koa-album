const path = require('path'),
    fs = require('fs'),
    datas = require('./data'),
    {render} = require('./render')

    
/**
 * 仅处理ctx-body内容
 */
const hanlder = {
    '/': index,
    '/index': index,
    '/albums': albums,
    '/static': static,
    '/notfound':NotFound
}


function static(ctx) {

    let url = ctx.request.url,
        content,
        staticPath = '../static',
        assestsPath = '../assets'

    /**
     * 判断是否文件是 assets/static
     */
    url.indexOf('albums/') === -1 ?
        url = path.join(staticPath, url) : url = path.join(assestsPath, url)


    url = path.resolve(__dirname, url)

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


function index(ctx) {

    let tmpl = 'index',
        data = datas.getAlbumsData()

    ctx.body = render(tmpl, data)
}


function albums(ctx, route) {

    let tmpl = 'album',
        data = datas.getPohotoData(route)
    
    ctx.body = render(tmpl, data)
}


function NotFound(ctx){

    let tmpl = '404'

    ctx.body = render(tmpl,null)

}

module.exports = hanlder