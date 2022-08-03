const Note = require("./note");

Note.sync(); // will create table if not already exists

module.exports = {
  Note,
};
