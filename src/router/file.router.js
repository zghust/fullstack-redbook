const koaRouter = require('@koa/router')
//单独上传头像和查看头像接口，备用

const multer = require('@koa/multer')
const upload = multer({
  dest: 'upload',
})

const { verifyAuthorization } = require('../middleware/login.middleware')
const { create } = require('../controller/file.controller')
const { showAva } = require('../controller/user.controller')

const fileRouter = new koaRouter({ prefix: '/user' })

fileRouter.post('/avatar', verifyAuthorization, upload.single('avatar'), create)
fileRouter.get('/avatar/:userId', showAva)

module.exports = fileRouter
