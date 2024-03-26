const { create } = require('../service/lable.service')

class lablecontroller {
  async create(ctx, next) {
    const { name } = ctx.request.body
    const result = await create(name)
    ctx.body = { code: 0, data: result, message: '创建标签成功' }
  }
}

module.exports = new lablecontroller()
