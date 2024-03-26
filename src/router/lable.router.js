const koaRouter = require('@koa/router')

const { verifyAuthorization } = require('../middleware/login.middleware')
const { create } = require('../controller/lable.controller')

const lableRouter = new koaRouter({ prefix: '/lable' })

lableRouter.post('/', verifyAuthorization, create)

module.exports = lableRouter
