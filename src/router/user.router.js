const koaRouter = require('@koa/router')
const usercontroller = require('../controller/user.controller')
const { userverify, handlepassword } = require('../middleware/user.middleware')
const { verifyAuthorization } = require('../middleware/login.middleware')
const permit = require('../middleware/permit.middleware')
const multer = require('@koa/multer')
const upload = multer({
  dest: 'avatar',
})
const userRouter = new koaRouter({ prefix: '/user' })
//用户注册
userRouter.post('/', userverify, handlepassword, usercontroller.create)
//编辑更新用户信息
userRouter.patch(
  '/my/:userId',
  verifyAuthorization,
  upload.single('avatar'),
  usercontroller.update
)
userRouter.get('/my/:userId', usercontroller.showAva)
module.exports = userRouter
