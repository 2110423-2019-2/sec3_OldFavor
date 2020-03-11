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
const _ = require("lodash");
const service = require("./service");
function register(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = ctx.request.body;
        ctx.assert(body.username, 400, 'username is required');
        ctx.assert(body.password, 400, 'password is required');
        ctx.assert(!_.isEmpty(body), 400, 'body is required');
        body.emailVerified = false;
        body.licenseVerified = false;
        ctx.body = yield service.register(body);
    });
}
exports.register = register;
function login(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = ctx.request.body;
        ctx.assert(username, 400, 'username is required');
        ctx.assert(password, 400, 'password is required');
        ctx.body = yield service.login(username, password);
    });
}
exports.login = login;
function patch(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        ctx.throw(401, 'edit another people profile is prohibit');
    });
}
exports.patch = patch;
function patchMe(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = ctx.request.body;
        const userData = yield service.findById(ctx.state.user._id);
        if (user.email != userData.email) {
            user.emailVerified = false;
            service.sendEmail(user.email, userData._id);
        }
        if (user.drivingLicense != userData.drivingLicense)
            user.licenseVerified = false;
        ctx.assert(user, 400, 'body is required');
        ctx.body = yield service.patch(ctx.state.user._id, user);
    });
}
exports.patchMe = patchMe;
function find(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        ctx.body = yield service.find(ctx.query || {});
    });
}
exports.find = find;
function findById(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        ctx.body = yield service.findById(ctx.params.id);
        ctx.assert(ctx.body, 404);
    });
}
exports.findById = findById;
function verify(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        yield service.verify(ctx.params.id);
        ctx.body = { success: true };
        ctx.assert(ctx.body, 404);
    });
}
exports.verify = verify;
function profile(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        ctx.body = yield service.findById(ctx.state.user._id);
        ctx.assert(ctx.body, 404);
    });
}
exports.profile = profile;
//# sourceMappingURL=controller.js.map