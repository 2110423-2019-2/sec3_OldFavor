"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
function getAll(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield db_1.db.notifications.find(query).sort({ created: -1 }).toArray();
        yield db_1.db.notifications.updateMany(query, { $set: { read: true } });
        return res;
    });
}
exports.getAll = getAll;
function getCount(query) {
    return db_1.db.notifications.find(query).count();
}
exports.getCount = getCount;
function create(notification) {
    return db_1.db.notifications.insertOne(notification);
}
exports.create = create;
//# sourceMappingURL=service.js.map