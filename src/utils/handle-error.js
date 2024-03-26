const app = require('../app')

app.on('error', (error, ctx) => {
  let code = 0
  let message = ''
  switch (error) {
    case 'user_password_notnull':
      code = 1001
      message = '用户名和密码不能为空'
      break
    case 'user_exits':
      code = 1002
      message = '用户名已存在,请换一个用户名注册'
      break
    case 'wrong_password':
      code = 1003
      message = '密码错误'
      break
    case 'user_notexits':
      code = 1004
      message = '用户名不存在'
      break
    case 'password_notright':
      code = 1005
      message = '密码错误'
      break
    case 'tokenwrong':
      code = 1006
      message = 'token错误'
      break
    case 'no_permit':
      code = 1007
      message = '无权限'
      break
  }

  ctx.body = { code, message }
})
