"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    }
    catch (e) {
        return res.status(400).json(e.errors.map((err) => {
            if (err.code === "custom") {
                return { ["custom"]: err.message };
            }
            else {
                return { [err.path[1]]: err.message };
            }
        }));
    }
};
exports.default = validate;
//# sourceMappingURL=schemavalidator.middleware.js.map