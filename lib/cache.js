//
// cache控制
//

// 默认缓存2天
const cacheTime = 3600 * 24 * 2
const expiresTime = getAfterDate(cacheTime)

module.exports = async (ctx, next) => {

  await next()
  if (ctx.cache) {
    ctx.set('Cache-Control', `private,maxAge:${cacheTime}`)
    ctx.set('expires', `${expiresTime}`)
  }
}


// 传入秒数
// 获取这个时间之后的日期
// GMT格式返回
function getAfterDate(seconds) {

  let date = new Date().getTime()

  date = date + seconds * 1000 //转毫秒

  return new Date(date).toGMTString()
}