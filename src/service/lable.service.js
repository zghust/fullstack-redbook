const db = require('../app/database')

class lableservice {
  async create(name) {
    const statement = `insert into label (name) values (?)`
    const [values] = await db.execute(statement, [name])
    return values
  }
}

module.exports = new lableservice()
