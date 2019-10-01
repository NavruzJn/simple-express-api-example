const { STRING, INTEGER, DECIMAL } = require("sequelize/lib/data-types");
const { BaseModel } = require("./BaseModel.js");

const DATE_TABLE_NAME = "date";

class DateModel extends BaseModel {
    constructor(database, transaction) {
        super(DATE_TABLE_NAME, database, transaction);
    }
}

function initDateModel(database) {
    database.define(DATE_TABLE_NAME, {
        date: STRING, //TODO: Should be date
        commissions: STRING, //TODO: Should be int
        sales: STRING, //TODO: Should be int
        leads: STRING, //TODO: Should be int
        clicks: STRING, //TODO: Should be int
        epc: STRING, //TODO: Should be int
        impressions: STRING, //TODO: Should be int
        cr: STRING //TODO: Should be int
    }, {});
}

module.exports = { initDateModel, DateModel, DATE_TABLE_NAME };
