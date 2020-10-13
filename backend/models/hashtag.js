const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Hashtag extends Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      }
    }, {
      modelName: 'Hashtag',
      tableName: 'Hashtags',
      timestamps: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
      sequelize
    })
  }
  
  static associate(db) {
    db.Hashtag.belongsToMany(db.Place, { through: 'PlaceHashtag' });
  }
}