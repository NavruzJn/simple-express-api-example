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
        date: STRING,
        commissions: STRING,
        sales: STRING,
        leads: STRING,
        clicks: STRING,
        epc: STRING,
        impressions: STRING,
        cr: STRING
    }, {});
}

module.exports = { initDateModel, DateModel, DATE_TABLE_NAME };
