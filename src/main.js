const app = require('./app')
const { SERVER_PORT } = require('./config/server')
require('./utils/handle-error')
app.listen(8000, () => {
  console.log('服务器运行成功！')
})
