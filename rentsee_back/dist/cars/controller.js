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
const service = require("./service");
function find(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        ctx.body = yield service.find({});
    });
}
exports.find = find;
function findById(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        ctx.body = yield service.findById(ctx.params.id);
    });
}
exports.findById = findById;
function mine(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        ctx.body = yield service.findByOwner(ctx.state.user._id);
        ctx.assert(ctx.body, 404);
    });
}
exports.mine = mine;
function rentableMine(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        ctx.body = yield service.findByOwnerVerified(ctx.state.user._id);
        ctx.assert(ctx.body, 404);
    });
}
exports.rentableMine = rentableMine;
function create(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const car = ctx.request.body;
        car.verified = false;
        car.ownerId = new mongodb_1.ObjectID(ctx.state.user._id);
        ctx.body = yield service.create(ctx.request.body);
    });
}
exports.create = create;
function patchById(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const carId = ctx.params.id;
        const userId = ctx.state.user._id;
        ctx.body = service.patch({ _id: new mongodb_1.ObjectID(carId), ownerId: new mongodb_1.ObjectID(userId) }, ctx.request.body);
        ctx.assert(ctx.body, 401, 'you not own this car');
    });
}
exports.patchById = patchById;
function removeById(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const carId = ctx.params.id;
        const userId = ctx.state.user._id;
        ctx.body = service.remove({ _id: new mongodb_1.ObjectID(carId), ownerId: new mongodb_1.ObjectID(userId) });
        ctx.assert(ctx.body, 401, 'you not own this car');
    });
}
exports.removeById = removeById;
//# sourceMappingURL=controller.js.map