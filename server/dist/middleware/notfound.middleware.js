"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NotFoundMiddleware = (req, res, next) => {
    return res.status(404).json({
        error: "Route does not exist",
    });
};
exports.default = NotFoundMiddleware;
//# sourceMappingURL=notfound.middleware.js.map