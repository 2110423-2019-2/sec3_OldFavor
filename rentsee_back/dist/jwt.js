"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const config_1 = require("./config");
function sign(payload) {
    return jwt.sign(payload, config_1.default.jwt.secret);
}
exports.sign = sign;
function varify(token) {
    return jwt.verify(token, config_1.default.jwt.secret);
}
exports.varify = varify;
//# sourceMappingURL=jwt.js.map