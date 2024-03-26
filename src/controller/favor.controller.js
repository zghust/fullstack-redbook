const { create } = require('../service/favor.service')

class favorcontroller {
  async create(ctx, next) {
    const { id } = ctx.user
    const { moment_id } = ctx.request.body
    const result = await create(moment_id, id)

    ctx.body = { code: 0, data: result, message: '点赞成功' }
  }
}

module.exports = new favorcontroller()
