"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function loggedIn(ctx, next) {
    const auth = ctx.headers.authorization.trim();
    if (!auth || auth == 'Bearer null' || auth == 'Bearer') {
        ctx.throw(401, 'require login');
    }
    const err = ctx.state.jwtOriginalError;
    return err ? Promise.reject(err) : next();
}
exports.loggedIn = loggedIn;
//# sourceMappingURL=guard.js.map