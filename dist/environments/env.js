"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvironment = void 0;
const prod_env_1 = require("./prod.env");
const dev_env_1 = require("./dev.env");
function getEnvironment() {
    if (process.env.NODE_ENV === 'production') {
        return prod_env_1.ProdEnviornment;
    }
    else {
        return dev_env_1.DevEnviornment;
    }
}
exports.getEnvironment = getEnvironment;
