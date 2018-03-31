module.exports = async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        ctx.status = err.status || 500
        ctx.type = 'text/html'
        ctx.body = `Wow,a unexpected error.  [ ${err.message}]`
    }
}