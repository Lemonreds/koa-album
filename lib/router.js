const {
    isNotEmptyStr
} = require('./utils'), {
        getMIME
    } = require('./mime'),
    hanlder = require("./handler")



async function router(ctx , next) {

    let route = ctx.request.url,
        mime = getMIME(route)
        ctx.cache = false

    if (isNotEmptyStr(mime)) {
        // 静态资源请求
        ctx.type = mime      
        // 设置缓存
        ctx.cache = true
        await next()     

        hanlder['/static'](ctx)
    } else {
        // 网页资源请求
        ctx.type = 'text/html'      

        if (hanlder.hasOwnProperty(route) && typeof hanlder[route] == 'function') {

            hanlder[route](ctx)

        } else if (route.indexOf('/albums') !== -1) {

            hanlder['/albums'](ctx, route)
        } else {

            hanlder['/notfound'](ctx)

        }
    }     
}

module.exports = router