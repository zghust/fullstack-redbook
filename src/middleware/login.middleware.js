const { findUserByName } = require('../service/user.service')
const md5password = require('../utils/md5-password')
const jwt = require('jsonwebtoken')

const verifylogin = async (ctx, next) => {
  const { name, password } = ctx.request.body

  if (!name || !password) {
    return ctx.app.emit('error', 'user_password_notnull', ctx)
  }
  const value = await findUserByName(name)
  if (value.length === 0) {
    return ctx.app.emit('error', 'user_notexits', ctx)
  }
  if (value[0].password !== md5password(password)) {
    return ctx.app.emit('error', 'password_notright', ctx)
  }
  ctx.user = value[0]
  await next()
}
const verifyAuthorization = async (ctx, next) => {
  const sign = ctx.headers.authorization

  if (!sign) {
    ctx.app.emit('error', 'tokenwrong', ctx)
    return
  }
  const token = sign.replace(/^Bearer\s+/i, '')
  const secretkey = 'jsldfj'
  try {
    const result = jwt.verify(token, secretkey)
    ctx.user = result

    await next()
  } catch (error) {
    console.log(error)
    // ctx.app.emit('error', 'tokenwrong', ctx)
  }
}
module.exports = { verifylogin, verifyAuthorization }
