const { STRING, INTEGER } = require("sequelize/lib/data-types");
const { BaseModel } = require("./BaseModel");

const USER_TABLE_NAME = "user";

class UserModel extends BaseModel {
    constructor(database, transaction) {
        super(USER_TABLE_NAME, database, transaction);
    }

    findById(userId) {
        return this.findOne({ user_id: userId });
    }
}

function initUserModel(database) {
    database.define(USER_TABLE_NAME, {
        email: STRING,
        first_name: STRING,
        last_name: STRING,
        avatar: STRING,
    }, {});
}

module.exports = { initUserModel, UserModel, USER_TABLE_NAME};
