const jwt = require('jsonwebtoken')
const userService = require('../service/user.service')

class logincontroller {
  async sign(ctx, next) {
    try {
      const { id, name } = ctx.user
      const secretkey = 'jsldfj'
      const token = jwt.sign({ id, name }, secretkey, {
        expiresIn: 24 * 60 * 60,
      })
      ctx.body = { code: 0, data: { token, id, name } }
    } catch (e) {
      console.log(e)
    }
  }
  async userinfo(ctx, next) {
    const { id, name } = ctx.user
    const [result] = await userService.findUserByName(name)
    const [value] = await userService.findbeFollowOrbeFavorCount(id)

    ctx.body = { code: 0, data: [result, value] }
  }
}

module.exports = new logincontroller()
