'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Application', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Username: DataTypes.STRING,
    Appname: DataTypes.STRING
  });
}
