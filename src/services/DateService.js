const { SELECT } = require("sequelize/lib/query-types");
const { BaseService } = require("./BaseService");
const { DateModel } = require("../models/dateModel");
const { appEventBus } = require("../eventBus/EventBus");

const fp = require("lodash/fp");

class DateService extends BaseService {
    constructor(database, transaction) {
        super(database, transaction);
        this.date = new DateModel(database, transaction);
    }

    get(id) {
        return this.date.findOne({ id });
    }

    getAll() {
        return this.date.findAll();
    }

    create(values) {
        return this.date
            .create(values)
            .then(date => {
                appEventBus.emit("date.create", date);
                return date;
            })
            .then(fp.get("id"));
    }

    update(id, values) {
        return this.date
            .update(values, { id })
            .then(() => this.get(id))
            .then(date => {
                appEventBus.emit("date.update", date);
                return date;
            })
            .then(fp.get("id"));
    }
}

module.exports = { DateService };
