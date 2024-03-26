const koaRouter = require('@koa/router')
const {
  create,
  list,
  detail,
  update,
  del,
  addLabel,
  showCover,
  listNotes,
  listNotesFavor,
} = require('../controller/moment.controller')
const { verifyAuthorization } = require('../middleware/login.middleware')
const permit = require('../middleware/permit.middleware')
const { verifyLabelExists } = require('../middleware/label.middleware')
const multer = require('@koa/multer')
const upload = multer({
  dest: 'momentCover',
})

const momentRouter = new koaRouter({ prefix: '/moment' })
//增
momentRouter.post('/my', verifyAuthorization, upload.single('cover'), create)
//查看封面
momentRouter.get('/cover/:momentId', showCover)
//查
momentRouter.get('/', list)
momentRouter.get('/:momentId', detail)
//改
momentRouter.patch(
  '/my/:momentId',
  verifyAuthorization,
  permit,
  upload.single('cover'),
  update
)
//删
momentRouter.delete('/:momentId', verifyAuthorization, permit, del)
//查看我的笔记
momentRouter.get('/my/note', verifyAuthorization, listNotes)
//查看我点过赞的笔记
momentRouter.get('/my/notefavor', verifyAuthorization, listNotesFavor)
//为特定moment添加标签
momentRouter.post(
  '/:momentId/label',
  verifyAuthorization,
  permit,
  verifyLabelExists,
  addLabel
)

module.exports = momentRouter
