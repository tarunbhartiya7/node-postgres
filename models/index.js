// Note.sync();  will create table if not already exists
const Note = require('./note')
const User = require('./user')

User.hasMany(Note)
Note.belongsTo(User)

;(async () => {
  if (process.env.NODE_ENV !== 'test') {
    await User.sync()
    await Note.sync()
  }
})()

module.exports = {
  Note,
  User,
}
