const commentService = require('../service/comment.service')

class commentcontroller {
  async create(ctx, next) {
    const { id } = ctx.user
    const { momentId, content } = ctx.request.body
    const result = await commentService.create(id, content, momentId)
    ctx.body = { code: 0, message: '评论成功', data: result }
  }
  async reply(ctx, next) {
    const { id } = ctx.user
    const { momentId, content, commentId } = ctx.request.body
    const result = await commentService.reply(id, content, momentId, commentId)
    ctx.body = { code: 0, message: '回复评论成功', data: result }
  }
  async favor(ctx, next) {
    try {
      const { commentId, favor } = ctx.request.body
      console.log(ctx.request.body)
      const result = await commentService.favor(commentId, favor)
      ctx.body = { code: 0, message: '点赞成功', data: result }
    } catch (e) {
      console.log(e)
    }
  }
  async del(ctx, next) {
    const { commentId } = ctx.request.body
    const result = await commentService.del(commentId)
    ctx.body = { code: 0, data: result, message: '删除评论成功' }
  }
}

module.exports = new commentcontroller()
