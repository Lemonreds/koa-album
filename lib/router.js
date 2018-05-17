const {
    isNotEmptyStr
} = require('./utils'), {
        getMIME
    } = require('./mime'),
    hanlder = require("./handler")

/**
 * router 处理中间件
 * 根据url处理不同的任务
 */
async function router(ctx, next) {

    let route = ctx.request.url,
        mime = getMIME(route)
    ctx.cache = false

    // 静态资源请求
    if (isNotEmptyStr(mime)) {

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