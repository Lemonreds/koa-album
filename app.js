const Koa = require('koa'),
    app = new Koa()


const router = require('./lib/router'),
    error = require('./lib/error')


// 处理意外错误
app.use(error)

// 路由
app.use(router)

app.listen(8888)
console.log('server started at localhost: 8888')