const mysql = require('mysql2')
const connectionPool = mysql.createPool({
  database: 'koa_server',
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'admin123',
  connectionLimit: 5,
})
connectionPool.getConnection((err, connection) => {
  if (err) {
    console.log('数据库连接失败！')
    return
  }
  connection.connect((err) => {
    if (err) {
      console.log('和数据库建立连接失败！')
    } else {
      console.log('和数据库建立连接成功！')
    }
  })
})
const connection = connectionPool.promise()
module.exports = connection
