"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const db_1 = require("../db");
function find(query) {
    return db_1.db.cars.find(query).toArray();
}
exports.find = find;
function findById(id) {
    return db_1.db.cars.findOne({ _id: new mongodb_1.ObjectID(id) });
}
exports.findById = findById;
function findByOwner(id) {
    return db_1.db.cars.find({ ownerId: new mongodb_1.ObjectID(id) }).toArray();
}
exports.findByOwner = findByOwner;
function findByOwnerVerified(id) {
    return db_1.db.cars.find({ ownerId: new mongodb_1.ObjectID(id), verified: true }).toArray();
}
exports.findByOwnerVerified = findByOwnerVerified;
function create(car) {
    return db_1.db.cars.insertOne(car);
}
exports.create = create;
function patch(query, car) {
    return db_1.db.cars.findOneAndUpdate(query, { $set: car }, { upsert: false, returnOriginal: false });
}
exports.patch = patch;
function patchById(id, car) {
    return patch({ _id: new mongodb_1.ObjectID(id) }, car);
}
exports.patchById = patchById;
function remove(query) {
    return db_1.db.cars.deleteOne(query);
}
exports.remove = remove;
function removeById(id) {
    return remove({ id: new mongodb_1.ObjectID(id) });
}
exports.removeById = removeById;
//# sourceMappingURL=service.js.map