const userService = require('../service/user.service')
const md5password = require('../utils/md5-password')

const userverify = async (ctx, next) => {
  const { name, password } = ctx.request.body
  if (!name || !password) {
    return ctx.app.emit('error', 'user_password_notnull', ctx)
  }
  const values = await userService.findUserByName(name)
  if (values.length !== 0) {
    return ctx.app.emit('error', 'user_exits', ctx)
  }

  await next()
}
const handlepassword = async (ctx, next) => {
  const { password } = ctx.request.body
  ctx.request.body.password = md5password(password)
  await next()
}

module.exports = { userverify, handlepassword }
