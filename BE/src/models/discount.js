'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Discount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Discount.init({
    name: DataTypes.STRING,
    value: DataTypes.INTEGER,
    start_date: DataTypes.DATEONLY,
    finish_date: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Discount',
  });
  return Discount;
};