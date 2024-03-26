const koaRouter = require('@koa/router')

const commmentRouter = new koaRouter({ prefix: '/my/comment' })
const { verifyAuthorization } = require('../middleware/login.middleware')
const {
  create,
  reply,
  favor,
  del,
} = require('../controller/comment.controller')
//增
commmentRouter.post('/', verifyAuthorization, create)
commmentRouter.post('/reply', verifyAuthorization, reply)
commmentRouter.post('/reply/my', verifyAuthorization, favor)
//删除评论
commmentRouter.post('/del', verifyAuthorization, del)

module.exports = commmentRouter
