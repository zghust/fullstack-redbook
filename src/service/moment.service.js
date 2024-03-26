const db = require('../app/database')

class momentservice {
  async create(id, content, title) {
    const statement =
      'insert into `moment` (content,user_id,title) values (?,?,?)'
    const [result] = await db.execute(statement, [content, id, title])
    return result
  }
  async querylist(page) {
console.log(page)
    const size = 2
 const offset = (page - 1) * size
    const statement = `SELECT
    m.id,
    m.title,
    m.content,
    m.cover,
    m.updateAt,
    JSON_OBJECT("id", u.id, "name", u.name, "surname", u.surname, "avatar", u.ava_url) AS user,
    (SELECT COUNT(*) FROM comment WHERE comment.moment_id = m.id) AS commentCount,
    (SELECT COUNT(*) FROM moment_label ml WHERE m.id = ml.moment_id) AS labelsCount,
    (SELECT COUNT(*) FROM moment_favoruser mf WHERE m.id = mf.moment_id) AS favorCount,
    JSON_ARRAYAGG(mf.user_id) AS favorUserIds 
FROM
    moment m
LEFT JOIN user u ON u.id = m.user_id
LEFT JOIN moment_favoruser mf ON m.id = mf.moment_id
GROUP BY
    m.id, m.title, m.content, m.cover, m.updateAt, user
ORDER BY
    m.updateAt DESC
LIMIT ? OFFSET ?
`
    const statementtwo = `select count(*) count from moment `
    const [result] = await db.execute(statement, [size.toString(), offset.toString()])
   const [result02] = await db.execute(statementtwo, [])
 return [result, result02[0].count]
  }
  async collectList(id) {
    const statement = `SELECT
    m.id,
    m.title,
    m.content,
    m.cover,
    m.updateAt,
    JSON_OBJECT("id", u.id, "name", u.name,"surname", u.surname, "avatar", u.ava_url) AS user,
    (SELECT COUNT(*) FROM comment WHERE comment.moment_id = m.id) AS commentCount,
    (SELECT COUNT(*) FROM moment_label ml WHERE m.id = ml.moment_id) AS labelsCount,
    (SELECT COUNT(*) FROM moment_favoruser mf WHERE m.id = mf.moment_id) AS favorCount,
    JSON_ARRAYAGG(mf.user_id) AS favorUserIds 
FROM
    moment m
LEFT JOIN user u ON u.id = m.user_id
LEFT JOIN moment_favoruser mf ON m.id = mf.moment_id
GROUP BY
    m.id, m.title, m.content, m.cover, m.updateAt, user
ORDER BY
    m.updateAt DESC `
    const statement2 = `select moment_id from moment_collect where user_id=?`
    const [result] = await db.execute(statement)
    const [result02] = await db.execute(statement2, [id])
    const filteredResult = result.filter((item) => {
      return result02.some((entry) => entry.moment_id === item.id)
    })
    return filteredResult
  }
  async followUpdateList(id) {
    const statement = `SELECT
    m.id,
    m.title,
    m.content,
    m.cover,
    m.updateAt,
    JSON_OBJECT("id", u.id, "name", u.name, "surname", u.surname,"avatar", u.ava_url) AS user,
    (SELECT COUNT(*) FROM comment WHERE comment.moment_id = m.id) AS commentCount,
    (SELECT COUNT(*) FROM moment_label ml WHERE m.id = ml.moment_id) AS labelsCount,
    (SELECT COUNT(*) FROM moment_favoruser mf WHERE m.id = mf.moment_id) AS favorCount,
    (SELECT COUNT(*) FROM moment_collect mc WHERE m.id = mc.moment_id) AS collectCount,
    JSON_ARRAYAGG(mf.user_id) AS favorUserIds,
    JSON_ARRAYAGG(mc.user_id) AS collectUsers
FROM
    moment m
LEFT JOIN user u ON u.id = m.user_id
LEFT JOIN moment_favoruser mf ON m.id = mf.moment_id
LEFT JOIN moment_collect mc ON m.id = mc.moment_id
GROUP BY
    m.id, m.title, m.content, m.cover, m.updateAt, user
ORDER BY
    m.updateAt DESC `
    const statement1 = `select befollow_userid from follow_user where follow_userid=?`
    const [result1] = await db.execute(statement1, [id])
    const [result] = await db.execute(statement)

    const filteredResult = result.filter((item) => {
      return result1.some((entry) => entry.befollow_userid === item.user.id)
    })

    // 去重函数
    function uniqueArray(arr) {
      return Array.from(new Set(arr))
    }

    // 处理每个数据项的 favorUserIds 和 collectUsers
    const newData = filteredResult.map((item) => ({
      ...item,
      favorUserIds: uniqueArray(item.favorUserIds),
      collectUsers: uniqueArray(item.collectUsers),
    }))

    return newData
  }
  async listNotes(id) {
    const statement = `SELECT
m.id,
m.title,
m.content,
m.cover,
m.updateAt,
JSON_OBJECT("id", u.id, "name", u.name, "surname", u.surname,"avatar", u.ava_url) AS user,
(SELECT COUNT(*) FROM comment WHERE comment.moment_id = m.id) AS commentCount,
(SELECT COUNT(*) FROM moment_label ml WHERE m.id = ml.moment_id) AS labelsCount,
(SELECT COUNT(*) FROM moment_favoruser mf WHERE m.id = mf.moment_id) AS favorCount,
JSON_ARRAYAGG(mf.user_id) AS favorUserIds 
FROM
moment m
LEFT JOIN user u ON u.id = m.user_id
LEFT JOIN moment_favoruser mf ON m.id = mf.moment_id
where m.user_id=?
GROUP BY
m.id, m.title, m.content, m.cover, m.updateAt, user
ORDER BY
m.updateAt DESC`
    const [result] = await db.execute(statement, [id])
    return result
  }
  async listNotesFavor(id) {
    const statement = `SELECT
m.id,
m.title,
m.content,
m.cover,
m.updateAt,
JSON_OBJECT("id", u.id, "name", u.name, "surname", u.surname,"avatar", u.ava_url) AS user,
(SELECT COUNT(*) FROM comment WHERE comment.moment_id = m.id) AS commentCount,
(SELECT COUNT(*) FROM moment_label ml WHERE m.id = ml.moment_id) AS labelsCount,
(SELECT COUNT(*) FROM moment_favoruser mf WHERE m.id = mf.moment_id) AS favorCount,
JSON_ARRAYAGG(mf.user_id) AS favorUserIds 
FROM
moment m
LEFT JOIN user u ON u.id = m.user_id
LEFT JOIN moment_favoruser mf ON m.id = mf.moment_id
where mf.user_id=?
GROUP BY
m.id, m.title, m.content, m.cover, m.updateAt, user
ORDER BY
m.updateAt DESC`
    const [result] = await db.execute(statement, [id])
    return result
  }
  async querydetail(id) {
    const statement = `select m.id, m.title,m.content, m.cover,m.updateAt, 
    json_object("id",u.id,"name",u.name,"surname",u.surname,"avatar",u.ava_url) user,
    (json_arrayagg(json_object("id",c.id,"content",c.content,"commentId",c.comment_id,"createAt", c.createAt,"favor",c.favor,"commentuser",
    json_object("id",us.id,"name",us.name,"surname",us.surname,"avatar",us.ava_url)))) comments from moment m left join user u  on u.id=m.user_id left join comment c on c.moment_id=m.id left join user us on us.id=c.user_id where m.id=? group by m.id`
    const statementtwo = `select ml.label_id,label.name from moment m left join moment_label ml on m.id=ml.moment_id left join label on ml.label_id=label.id where m.id=? `
    const favor = `SELECT COUNT(*) as favor,JSON_ARRAYAGG(mf.user_id) AS favorUserIds   FROM moment_favoruser mf WHERE  mf.moment_id=?`
    const momentUser = `select user_id as id from moment where id=?`
    const isfollow = `select JSON_ARRAYAGG(follow_userid) as followUsers from follow_user where befollow_userid=?`
    const iscollect = `select JSON_ARRAYAGG(user_id) as collectUsers from moment_collect where moment_id=?`

    const [result] = await db.execute(statement, [id])
    const [resulttwo] = await db.execute(statementtwo, [id])
    const [result03] = await db.execute(favor, [id])
    const [muser] = await db.execute(momentUser, [id])
    const [result04] = await db.execute(isfollow, [muser[0].id])
    const [result05] = await db.execute(iscollect, [id])

    result[0].labels = resulttwo
    result[0].favorCounts = result03[0].favor
    result[0].favorUserIds = result03[0].favorUserIds
    result[0].followUsers = result04[0].followUsers
    result[0].collectUsers = result05[0].collectUsers
    return result
  }
  async updatedetail(id, content, title) {
    const statement = `update moment set content = ?,title=? where id = ?`
    const [result] = await db.execute(statement, [content, , title, id])
    return result
  }
  async deldetail(id) {
    const statement = `delete from moment where id = ?`
    const [result] = await db.execute(statement, [id])
    return result
  }
  async queryLabelByName(name) {
    const statement = `select * from label where name = ?`
    const [result] = await db.execute(statement, [name])
    return result
  }
  async queryLabelMoment(momentId, labelId) {
    const statement = `select * from moment_label where moment_id=? and label_id=?`
    const [result] = await db.execute(statement, [momentId, labelId])
    return !!result.length
  }
  async addLabel(momentId, labelId) {
    const statement = `insert into moment_label (moment_id,label_id) values (?,?)`
    const [result] = await db.execute(statement, [momentId, labelId])
    return result
  }
  async findCoverById(momentId) {
    const statement = 'select * from cover where moment_id=?'
    const [result] = await db.execute(statement, [momentId])
    return result[result.length - 1]
  }
  async saveCover(coverUrl, momentId) {
    const statement = `update moment set cover=? where id=?`
    const [result] = await db.execute(statement, [coverUrl, momentId])
    return result
  }
  async insertToCover(filename, mimetype, size, momentId) {
    const statement = `insert into cover (filename,mimetype,size,moment_id) values (?,?,?,?)`
    const [result] = await db.execute(statement, [
      filename,
      mimetype,
      size,
      momentId,
    ])
    return result
  }

  async updateToCover(filename, mimetype, size, momentId) {
    const statement = `update cover set filename=?,mimetype=?, size=? where moment_id=?`
    const [result] = await db.execute(statement, [
      filename,
      mimetype,
      size,
      momentId,
    ])
    return result
  }
  async collect(id, momentId) {
    const statement = `select * from moment_collect where user_id=? and moment_id=?`
    const statement1 = `delete  from moment_collect where user_id=? and moment_id=?`
    const statement2 = `INSERT INTO moment_collect (user_id, moment_id)
    VALUES (?, ?)`

    const [result] = await db.execute(statement, [id, momentId])
    if (result.length !== 0) {
      const [values] = await db.execute(statement1, [id, momentId])
      return values
    } else {
      const [value] = await db.execute(statement2, [id, momentId])
      return value
    }
  }
}

module.exports = new momentservice()
