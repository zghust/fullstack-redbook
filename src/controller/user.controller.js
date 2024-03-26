const momentService = require('../service/moment.service')
const userservice = require('../service/user.service')
const BASEURL = require('../utils/baseurl')
const fs = require('fs')
class usercontroller {
  async create(ctx, next) {
    const user = ctx.request.body
    const result = await userservice.create(user)
    ctx.body = { code: 0, data: result }
  }
  async showAva(ctx, next) {
    const { userId } = ctx.params

    const { filename, mimetype } = await userservice.findAvaByUserId(userId)
    ctx.type = mimetype
    ctx.body = fs.createReadStream(`./avatar/${filename}`)
  }
  async update(ctx, next) {
    try {
      const { userId } = ctx.params
      const id = userId
      const { surname, gender, intro } = ctx.request.body
      const avaUrl = `${BASEURL}user/my/${id}`
      const result = await userservice.update(
        id,
        surname,
        gender,
        intro,
        avaUrl
      )

      if (!!ctx.request.file) {
        const { filename, mimetype, size } = ctx.request.file
        const resulttwo = await userservice.insertToAvatar(
          filename,
          mimetype,
          size,
          id
        )
        ctx.body = {
          code: 0,
          message: '编辑个人资料成功',
          data: [result, resulttwo],
        }
      } else {
        ctx.body = {
          code: 0,
          message: '编辑个人资料成功',
          data: [result],
        }
      }
    } catch (err) {
      console.log(err)
    }
  }
  async follow(ctx, next) {
    try {
      const { beFollowedUser, id } = ctx.request.body
      const res = await userservice.follow(id, beFollowedUser)
      ctx.body = { code: 0, data: res }
    } catch (e) {
      console.log(e)
    }
  }
  async collect(ctx, next) {
    const { momentId } = ctx.request.body
    const { id } = ctx.user
    const res = await momentService.collect(id, momentId)
    ctx.body = { code: 0, data: res }
  }
}

module.exports = new usercontroller()
