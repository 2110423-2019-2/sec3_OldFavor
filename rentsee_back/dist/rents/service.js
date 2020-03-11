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
const mongodb_1 = require("mongodb");
function find(query = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_1.db.rents.find(query).sort({ created: -1 }).toArray();
    });
}
exports.find = find;
function findOne(query) {
    return db_1.db.rents.findOne(query);
}
exports.findOne = findOne;
function findById(id) {
    return db_1.db.rents.aggregate([
        { $match: { _id: new mongodb_1.ObjectID(id) } },
        {
            $lookup: {
                from: 'cars',
                localField: 'carId',
                foreignField: '_id',
                as: 'car'
            },
        },
    ]).toArray();
}
exports.findById = findById;
function search(query, sorter, dateBegin, dateEnd) {
    return db_1.db.rents.aggregate([
        {
            $lookup: {
                from: 'cars',
                localField: 'carId',
                foreignField: '_id',
                as: 'car'
            },
        },
        { $unwind: '$car' },
        {
            $match: {
                $and: [
                    { status: 0 },
                    { $or: [
                            { 'car.licensePlate': { $regex: `.*${query}.*`, $options: 'i' } },
                            { 'car.carModel': { $regex: `.*${query}.*`, $options: 'i' } },
                            { 'car.carType': { $regex: `.*${query}.*`, $options: 'i' } },
                            { 'car.carDescription': { $regex: `.*${query}.*`, $options: 'i' } },
                            { pickUpLocation: { $regex: `.*${query}.*`, $options: 'i' } },
                            { returnLocation: { $regex: `.*${query}.*`, $options: 'i' } },
                        ] },
                    { pickUpDateTime: { $lte: dateBegin } },
                    { returnDateTime: { $gte: dateEnd } },
                ]
            }
        },
        { $sort: sorter }
    ]).toArray();
}
exports.search = search;
function create(rent) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_1.db.rents.insertOne(rent);
    });
}
exports.create = create;
function removeOne(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_1.db.rents.deleteOne(query);
    });
}
exports.removeOne = removeOne;
function patch(query, rent) {
    return db_1.db.rents.findOneAndUpdate(query, { $set: rent }, { upsert: false, returnOriginal: false });
}
exports.patch = patch;
function _clear(query = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_1.db.rents.remove(query);
    });
}
exports._clear = _clear;
//# sourceMappingURL=service.js.map