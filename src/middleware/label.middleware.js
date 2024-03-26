const momentService = require('../service/moment.service')
const lableservice = require('../service/lable.service')
//不确定是否用户传过来的标签在标签表里，此处判断处理
const verifyLabelExists = async (ctx, next) => {
  const { label } = ctx.request.body
  const newLabels = []
  for (const name of label) {
    const result = await momentService.queryLabelByName(name)
    const labelObj = { name }
    if (result.length === 0) {
      const values = await lableservice.create(name)
      labelObj.id = values.insertId
    } else {
      labelObj.id = result[0].id
    }
    newLabels.push(labelObj)
  }
  ctx.labels = newLabels
  await next()
}

module.exports = { verifyLabelExists }
