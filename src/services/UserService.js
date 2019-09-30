const Sequelize = require("sequelize");
const { SELECT } = require("sequelize/lib/query-types");
const { BaseService } = require("./BaseService");
const { UserModel, userRole } = require("../models/UserModel");
const { appEventBus } = require("../eventBus/EventBus");
const fp = require("lodash/fp");

class UserService extends BaseService {
    constructor(database, transaction) {
        super(database, transaction);

        this.user = new UserModel(database, transaction);
    }

    getUser(id) {
        return this.user.findOne({ user_id: id });
    }

    getAllUser() {
        return this.user.findAll();
    }

    createUser(values) {
        return this.user
            .create(values)
            .then(user => {
                appEventBus.emit("user.create", user);
                return user;
            })
            .then(fp.get("id"));
    }

    updateUser(id, values) {
        return this.user
            .update(values, { user_id: id })
            .then(() => this.findOne({ user_id: id }))
            .then(user => {
                appEventBus.emit("user.update", user);
                return user;
            })
            .then(fp.get("id"));
    }
}

module.exports = { UserService };
