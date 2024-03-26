const db = require('../app/database')

class favorservice {
  async create(moment_id, user_id) {
    const statementtwo = `select * from moment_favoruser where moment_id=? and user_id=?`
    const statement = `insert into moment_favoruser (moment_id, user_id) values (?,?)`
    const statement03 = `delete from moment_favoruser where moment_id=? and user_id=?`
    const [result] = await db.execute(statementtwo, [moment_id, user_id])
    if (result.length !== 0) {
      const [result01] = await db.execute(statement03, [moment_id, user_id])

      return [{ add: false }, result01]
    } else {
      const [values] = await db.execute(statement, [moment_id, user_id])
      return [{ add: true }, values]
    }
  }
}

module.exports = new favorservice()
