module.exports = (sequelize, DataTypes) => {
  const Place = sequelize.define('Place', {
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    fee: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    }
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });
  Place.associate = db => {
    db.Place.belongsTo(db.User);
    db.Place.hasMany(db.Image);
  }
  return Place;
}