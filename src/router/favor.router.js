const koaRouter = require('@koa/router')

const { verifyAuthorization } = require('../middleware/login.middleware')
const { create } = require('../controller/favor.controller')

const favorRouter = new koaRouter({ prefix: '/my/favor' })

favorRouter.post('/', verifyAuthorization, create)

module.exports = favorRouter
