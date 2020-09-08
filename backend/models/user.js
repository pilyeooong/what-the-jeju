module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    nickname: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    snsId: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    provider: {
      type: DataTypes.STRING(15),
      allowNull: false,
      defaultValue: 'local',
    }
  }, {
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_general_ci', // for ko-kr
  });
  User.associate = db => {

  };
  return User;
}