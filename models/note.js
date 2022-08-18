const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Note extends Model {}

Note.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    important: {
      type: DataTypes.BOOLEAN,
    },
    date: {
      type: DataTypes.DATE,
    },
    // status: {
    //   type: DataTypes.ENUM("1", "0"),
    //   defaultValue: "1"
    // }
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'note',
    indexes: [
      {
        fields: ['content'],
      },
    ],
  }
)

module.exports = Note
