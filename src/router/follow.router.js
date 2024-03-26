const koaRouter = require('@koa/router')
const usercontroller = require('../controller/user.controller')
const { verifyAuthorization } = require('../middleware/login.middleware')
const momentController = require('../controller/moment.controller')

const followRouter = new koaRouter({ prefix: '/user' })
//关注用户
followRouter.post('/my/follow', verifyAuthorization, usercontroller.follow)
//获取关注用户的最新动态
followRouter.get(
  '/my/follow',
  verifyAuthorization,
  momentController.listFollowUpdate
)

module.exports = followRouter
