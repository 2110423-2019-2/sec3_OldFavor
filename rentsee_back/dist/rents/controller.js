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
const mongodb_1 = require("mongodb");
const notifications = require("../notifications/service");
const service = require("./service");
function find(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        ctx.body = yield service.find({});
    });
}
exports.find = find;
function findById(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        ctx.body = (yield service.findById(ctx.params.id))[0];
    });
}
exports.findById = findById;
function search(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = ctx.query.q;
        const dateBegin = new Date(ctx.query.pickUpDateTime);
        const dateEnd = new Date(ctx.query.returnDateTime);
        let sorter = {};
        sorter[ctx.query.sort] = parseInt(ctx.query.sortWay);
        ctx.body = yield service.search(query, sorter, dateBegin, dateEnd);
    });
}
exports.search = search;
function findAsLessor(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        ctx.body = yield service.find({ lessorId: (new mongodb_1.ObjectID(ctx.state.user._id)) });
    });
}
exports.findAsLessor = findAsLessor;
function findAsLessee(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        ctx.body = yield service.find({ renterId: (new mongodb_1.ObjectID(ctx.state.user._id)) });
    });
}
exports.findAsLessee = findAsLessee;
function _clear(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        ctx.body = yield service._clear();
    });
}
exports._clear = _clear;
function confirm(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const rentId = new mongodb_1.ObjectID(ctx.params.id);
        const rent = yield service.findOne({ _id: rentId });
        if (rent.status != 0)
            ctx.body = null;
        else
            ctx.body = yield service.patch({ _id: rentId }, {
                pickUpDateTime: new Date(ctx.request.body.pickUpDateTime),
                returnDateTime: new Date(ctx.request.body.returnDateTime),
                status: 1,
                renterId: new mongodb_1.ObjectID(ctx.state.user._id),
                totalPrice: Math.round((Date.parse(ctx.request.body.returnDateTime) - Date.parse(ctx.request.body.pickUpDateTime)) * rent.pricePerDay / (3600 * 24 * 1000)),
                matched: new Date(),
            });
        ctx.assert(ctx.body, 400, 'Deal is off');
    });
}
exports.confirm = confirm;
function lessorCancel(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const rentId = new mongodb_1.ObjectID(ctx.params.id);
        const rent = yield service.findOne({ _id: rentId });
        yield notifications.create({
            to: rent.renterId,
            message: 'One of the deals has been canceled by the lessor, please check your history page for more detail',
            read: false,
            created: new Date()
        });
        const lessorId = new mongodb_1.ObjectID(ctx.state.user._id);
        ctx.body = yield service.patch({ _id: rentId, lessorId: lessorId }, {
            status: 2,
            cancelReason: ctx.request.body.cancelReason,
        });
        ctx.assert(ctx.body, 401, 'Not Your Deal');
    });
}
exports.lessorCancel = lessorCancel;
function lesseeCancel(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const rentId = new mongodb_1.ObjectID(ctx.params.id);
        const rent = yield service.findOne({ _id: rentId });
        yield notifications.create({
            to: rent.lessorId,
            message: 'One of the deals has been canceled by the lessee, please check your history page for more detail',
            read: false,
            created: new Date()
        });
        const lesseeId = new mongodb_1.ObjectID(ctx.state.user._id);
        ctx.body = yield service.patch({ _id: rentId, renterId: lesseeId }, {
            status: 3,
            cancelReason: ctx.request.body.cancelReason,
        });
        ctx.assert(ctx.body, 401, 'Not Your Deal');
    });
}
exports.lesseeCancel = lesseeCancel;
function create(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        ctx.request.body.pricePerDay = parseInt(ctx.request.body.pricePerDay);
        ctx.request.body.pickUpDateTime = new Date(ctx.request.body.pickUpDateTime);
        ctx.request.body.returnDateTime = new Date(ctx.request.body.returnDateTime);
        const rent = ctx.request.body;
        rent.carId = new mongodb_1.ObjectID(ctx.params.id);
        rent.lessorId = new mongodb_1.ObjectID(ctx.state.user._id);
        rent.renterId = null;
        rent.status = 0;
        rent.created = new Date();
        rent.matched = null;
        ctx.body = yield service.create(rent);
    });
}
exports.create = create;
function removeById(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const rentId = new mongodb_1.ObjectID(ctx.params.id);
        const userId = new mongodb_1.ObjectID(ctx.state.user._id);
        ctx.body = yield service.removeOne({ _id: rentId, renterId: userId });
    });
}
exports.removeById = removeById;
//# sourceMappingURL=controller.js.map