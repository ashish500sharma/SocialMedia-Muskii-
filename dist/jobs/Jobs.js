"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jobs = void 0;
const DataBase_1 = require("./DataBase");
const Email_1 = require("./Email");
class Jobs {
    static runRequiredjobs() {
        DataBase_1.DataBase.runDataBaseJobs();
        Email_1.Email.runEmailJobs();
    }
}
exports.Jobs = Jobs;
