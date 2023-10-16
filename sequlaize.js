const Sequelize = require("sequelize");
const sequelize = require("./SDatabase.js");

const Model = sequelize.define(
  "model",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true, // Corrected
    },

    name: {
      type: Sequelize.STRING, // Corrected
      allowNull: false,
      // unique:true,
    },

    email: {
      type: Sequelize.STRING, // Corrected
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING, // Corrected
      allowNull: false,
      // unique:true,
    },
  },
  {
    tableName: "model", // Specify the table name as 'model'
  }
);

const newModel = sequelize.define(
  "expenseTable",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true, // Corrected
    },

    amount: {
      type: Sequelize.INTEGER, // Corrected
      allowNull: false,
      // unique:true,
    },

    description: {
      type: Sequelize.STRING, // Corrected
      allowNull: false,
      unique: true,
    },
    category: {
      type: Sequelize.STRING, // Corrected
      allowNull: false,
      // unique:true,
    },
  },
  {
    tableName: "expenseTable", // Specify the table name as 'model'
  }
);

module.exports = {Model, newModel};

