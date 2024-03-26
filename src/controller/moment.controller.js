const momentservice = require('../service/moment.service')
const BASEURL = require('../utils/baseurl')
const fs = require('fs')
class momentcontroller {
  async create(ctx, next) {
    try {
      const { id } = ctx.user
      const { content, title } = ctx.request.body
      const { filename, mimetype, size } = ctx.request.file
      const result = await momentservice.create(id, content, title)
      const coverUrl = `${BASEURL}moment/cover/${result.insertId}`
      const resulttwo = await momentservice.saveCover(coverUrl, result.insertId)
      const resultthree = await momentservice.insertToCover(
        filename,
        mimetype,
        size,
        result.insertId
      )
      ctx.body = {
        code: 0,
        message: '创建成功',
        data: [result, resulttwo, resultthree],
      }
    } catch (err) {
      console.log(err)
    }
  }
  async showCover(ctx, next) {
    const { momentId } = ctx.params
    const { filename, mimetype } = await momentservice.findCoverById(momentId)
    try {
      ctx.type = mimetype
      ctx.body = fs.createReadStream(`./momentCover/${filename}`)
    } catch (err) {
      console.log(err)
    }
  }
  async list(ctx, next) {
    const { page } = ctx.query

    try {
      const [result, result02] = await momentservice.querylist(page)
      ctx.body = {
        code: 0,
        message: '获取动态列表成功',
        data: { data: [...result], total: result02 },
      }
    } catch (e) {
      console.log(e)
    }
  }
  async detail(ctx, next) {
    try {
      const { momentId } = ctx.params

      const result = await momentservice.querydetail(momentId)
      ctx.body = { code: 0, message: '获取动态详情成功', data: result[0] }
    } catch (e) {
      console.log(e)
    }
  }
  async update(ctx, next) {
    try {
      const { momentId } = ctx.params
      const { filename, mimetype, size } = ctx.request.file
      const { content, title } = ctx.request.body
      const result = await momentservice.updatedetail(momentId, content, title)
      const resulttwo = await momentservice.updateToCover(
        filename,
        mimetype,
        size,
        momentId
      )
      ctx.body = {
        code: 0,
        message: '修改动态成功',
        data: result,
        data2: resulttwo,
      }
    } catch (err) {
      console.log(err)
    }
  }
  async del(ctx, next) {
    const { momentId } = ctx.params
    const result = await momentservice.deldetail(momentId)
    ctx.body = { code: 0, message: '删除成功', data: result }
  }
  async addLabel(ctx, next) {
    const labels = ctx.labels
    const { momentId } = ctx.params
    for (const label of labels) {
      const hasLabel = await momentservice.queryLabelMoment(momentId, label.id)
      if (!hasLabel) {
        await momentservice.addLabel(momentId, label.id)
      }
    }
    ctx.body = { code: 0, message: '添加标签成功' }
  }
  async listcollect(ctx, next) {
    const { id } = ctx.user
    const result = await momentservice.collectList(id)
    ctx.body = { code: 0, data: result }
  }
  async listFollowUpdate(ctx, next) {
    const { id } = ctx.user
    const result = await momentservice.followUpdateList(id)
    ctx.body = { code: 0, data: result }
  }
  async listNotes(ctx, next) {
    try {
      const { id } = ctx.user
      const result = await momentservice.listNotes(id)
      ctx.body = { code: 0, data: result }
    } catch (e) {
      console.log(e)
    }
  }
  async listNotesFavor(ctx, next) {
    try {
      const { id } = ctx.user
      const result = await momentservice.listNotesFavor(id)
      ctx.body = { code: 0, data: result }
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new momentcontroller()
