"use strict";

require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const userModel = require("./users-model");
const POSTGRES_URI =
  process.env.NODE_ENV === "test" ? "sqlite:memory:" : process.env.DATABASE_URL;

let sequelizeOptions =
  process.env.NODE_ENV === "production"
    ? {
        dialect: "postgres",
        protocol: "postgres",
        dialectOptions: {
          ssl: { require: true, rejectUnauthorized: false },
          native: true,
        },
      }
    : {};

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

const userTable = userModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  Users: userTable,
};