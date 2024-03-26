const koa = require('koa')
const userRouter = require('../router/user.router')
const loginRouter = require('../router/login.router')
const bodyParser = require('koa-bodyparser')
const regRouter = require('../router')
const cors = require('koa2-cors')
const path = require('path')

const app = new koa()
app.use(bodyParser())
app.use(require('koa-static')(path.join(__dirname, 'build')))
app.use(cors({ origin: '*' }))

//自动注册路由
regRouter(app)

module.exports = app
