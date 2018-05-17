/**
 * lemonreds@163.com
 * https://github.com/Lemonreds/koa-album
 */
const Koa = require('koa'),
    app = new Koa()


const router = require('./lib/router'),
    cache = require('./lib/cache')
    error = require('./lib/error')


// 处理意外错误
app.use(error)
// 路由
app.use(router)
// cache
app.use(cache)

// 绑定端口在 8888
app.listen(8888)
console.log('server started at localhost: 8888')