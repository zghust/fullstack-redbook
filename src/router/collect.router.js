const koaRouter = require('@koa/router')
const usercontroller = require('../controller/user.controller')
const { verifyAuthorization } = require('../middleware/login.middleware')
const momentController = require('../controller/moment.controller')

const collectRouter = new koaRouter({ prefix: '/user' })
//用户收藏数据展示
collectRouter.get(
  '/my/collect/list',
  verifyAuthorization,
  momentController.listcollect
)
//用户收藏
collectRouter.post('/my/collect', verifyAuthorization, usercontroller.collect)

module.exports = collectRouter
