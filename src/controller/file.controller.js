const { insertAvatar, updateUserAva } = require('../service/user.service')
const BASEURL = require('../utils/baseurl')

class filecontroller {
  async create(ctx, next) {
    try {
      const { id } = ctx.user
      const { filename, mimetype, size } = ctx.request.file
      const result = await insertAvatar(filename, mimetype, size, id)
      const avaUrl = `${BASEURL}user/avatar/${id}`
      const resulttwo = await updateUserAva(avaUrl, id)
      ctx.body = { code: 0, data: [result, resulttwo], message: '创建标签成功' }
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = new filecontroller()
