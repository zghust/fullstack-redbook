const permitService = require('../service/permit.service')

const permit = async (ctx, next) => {
  const { id } = ctx.user
  const resourceKeyName = Object.keys(ctx.params)[0]
  const resourceId = ctx.params[resourceKeyName]
  const resourceName = resourceKeyName.replace('Id', '')

  const result = await permitService.check(id, resourceId, resourceName)
  if (result.length !== 0) {
    await next()
  } else {
    ctx.app.emit('error', 'no_permit', ctx)
  }
}
module.exports = permit
