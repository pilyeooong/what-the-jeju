const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Category extends Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    }, {
      modelName: 'Category',
      tableName: 'Categories',
      timestamps: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
      sequelize
    })
  }
  
  static associate(db) {
    db.Category.hasMany(db.Place);
  }
}