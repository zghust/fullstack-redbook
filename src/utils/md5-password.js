const cropto = require('crypto')

const md5password = (password) => {
  const md5 = cropto.createHash('md5')
  const md5Pwd = md5.update(password).digest('hex')
  return md5Pwd
}
module.exports = md5password
