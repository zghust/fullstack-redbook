const db = require('../app/database')

class commentservice {
  async create(id, content, momentId) {
    const statement =
      'insert into comment (content,user_id,moment_id) values (?,?,?)'
    const [result] = await db.execute(statement, [content, id, momentId])
    return result
  }
  async reply(id, content, momentId, commentId) {
    const statement =
      'insert into comment (content,user_id,moment_id,comment_id) values (?,?,?,?)'
    const [result] = await db.execute(statement, [
      content,
      id,
      momentId,
      commentId,
    ])
    return result
  }
  async favor(commentId, favor) {
    const statement = 'update  comment set favor=? where id=?'
    const [result] = await db.execute(statement, [favor, commentId])
    return result
  }
  async del(commentId) {
    const statement = `DELETE FROM comment
    WHERE id = ? `
    const statement1 = `DELETE FROM comment
    WHERE comment_id = ?`
    const [result] = await db.execute(statement, [commentId])
    const [result1] = await db.execute(statement1, [commentId])
    return result
  }
}

module.exports = new commentservice()
