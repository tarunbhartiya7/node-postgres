// Note.sync();  will create table if not already exists
const Note = require('./note')
const User = require('./user')

User.hasMany(Note)
Note.belongsTo(User)

if (process.env.NODE_ENV !== 'test') {
  Note.sync()
  User.sync()
}

module.exports = {
  Note,
  User,
}
