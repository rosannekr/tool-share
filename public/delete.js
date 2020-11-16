"use strict";
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "Message",
    {

      text: DataTypes.STRING
    },
    {}
  );
Message.associate = function (models) {
    Message.belongsTo(models.User, { as:'sender', foreignKey: 'sender_id'});
    Message.belongsTo(models.User, { as:'receiver', foreignKey: 'receiver_id'});
   
  };
  return Message;
};
