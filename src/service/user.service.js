const db = require('../app/database')

class userservice {
  async create(user) {
    const { name, password } = user
    const statement = 'insert into `user` (name,password) values (?,?)'
    const [result] = await db.execute(statement, [name, password])
    return result
  }
  async findUserByName(name) {
    const statement = 'select * from user where name=?'
    const [values] = await db.execute(statement, [name])
    return values
  }
  async findbeFollowOrbeFavorCount(id) {
    const statement2 = `SELECT COUNT(*) AS beFavorCount FROM moment m JOIN moment_favoruser mf ON m.id = mf.moment_id WHERE m.user_id = ?`
    const statement3 = `SELECT COUNT(*) AS beCollectCount FROM moment m JOIN moment_collect mc ON m.id = mc.moment_id WHERE m.user_id = ?`
    const statement1 = `select count(*) as beFollowCounts from follow_user where befollow_userid=?`
    const [result02] = await db.execute(statement2, [id])
    const [result03] = await db.execute(statement3, [id])
    const [result1] = await db.execute(statement1, [id])
    return [
      {
        beFollowCounts: result1[0].beFollowCounts,
        beFavorAndCollectCounts:
          result02[0].beFavorCount + result03[0].beCollectCount,
      },
    ]
  }
  async insertAvatar(filename, mimetype, size, id) {
    const statement =
      'insert into avatar (filename, mimetype, size, user_id) values (?,?,?,?)'
    const [values] = await db.execute(statement, [filename, mimetype, size, id])
    return values
  }
  async findAvaByUserId(userId) {
    const statement = `select * from avatar where user_id=?`
    const [values] = await db.execute(statement, [userId])
    return values[values.length - 1]
  }
  async updateUserAva(avaUrl, id) {
    const statement = `update user set ava_url=? where id=?`
    const [result] = await db.execute(statement, [avaUrl, id])
    return result
  }
  async update(id, surname, gender, intro, avaUrl) {
    const statement = `update user set surname=?, gender=?, intro=?,ava_url=? where id=?`
    const [result] = await db.execute(statement, [
      surname,
      gender,
      intro,
      avaUrl,
      id,
    ])
    return result
  }

  async insertToAvatar(filename, mimetype, size, id) {
    const statement = `insert into avatar (filename,mimetype,size,user_id) values (?,?,?,?)`
    const [result] = await db.execute(statement, [filename, mimetype, size, id])
    return result
  }
  async follow(id, beFollowedUser) {
    const statement = `select * from follow_user where follow_userid=? and befollow_userid=?`
    const statement1 = `delete  from follow_user where follow_userid=? and befollow_userid=?`
    const statement2 = `INSERT INTO follow_user (follow_userid, befollow_userid)
    VALUES (?, ?)`

    const [result] = await db.execute(statement, [id, beFollowedUser])
    if (result.length !== 0) {
      const [values] = await db.execute(statement1, [id, beFollowedUser])
      return values
    } else {
      const [value] = await db.execute(statement2, [id, beFollowedUser])
      return value
    }
  }
}

module.exports = new userservice()
