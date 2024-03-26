//用户登陆

const koaRouter = require('@koa/router')
const loginController = require('../controller/login.controller')
const {
  verifylogin,
  verifyAuthorization,
} = require('../middleware/login.middleware')

const loginRouter = new koaRouter({ prefix: '/login' })
//登录
loginRouter.post('/', verifylogin, loginController.sign)
//获取用户信息
loginRouter.get('/my/userinfo', verifyAuthorization, loginController.userinfo)

module.exports = loginRouter
