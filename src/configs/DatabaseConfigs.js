const DATABASE_NAME = "test";
const DATABASE_USER = "root";
const DATABASE_PASS = "";
const DATABASE_HOST = "127.0.0.1";
const DATABASE_PORT = "3306";

const DATABASE_SETTINGS = {
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  dialect: "mysql",
  username: "root",
  password: DATABASE_PASS,
  database: DATABASE_NAME,
  define: {
    timestamps: false,
    freezeTableName: true // true by default
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
};

module.exports = {
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASS,
  DATABASE_PORT,
  DATABASE_HOST,
  DATABASE_SETTINGS
};
