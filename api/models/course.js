const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class Course extends Model {}

  Course.init(
    {
      // Model attributes are defined here
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "A title is required",
          },
          notEmpty: {
            msg: "Please provide a title",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "A description is required",
          },
          notEmpty: {
            msg: "Please provide a description",
          },
        },
      },
      estimatedTime: {
        type: DataTypes.STRING,
      },
      materialsNeeded: {
        type: DataTypes.STRING,
      },
    },
    {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: "Course", // We need to choose the model name
    }
  );

  Course.associate = (models) => {
    Course.belongsTo(models.User, {
      foreignKey: {
        fieldName: "userId",
      },
    });
  };

  return Course;
};
