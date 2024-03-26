const db = require('../app/database')

class permitservice {
  async check(id, resourceId, resourceName) {
    const statement = `select * from ${resourceName} where id=? and user_id=?`
    const [values] = await db.execute(statement, [resourceId, id])
    return values
  }
}

module.exports = new permitservice()
