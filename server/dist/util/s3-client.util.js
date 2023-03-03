"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const client_s3_1 = require("@aws-sdk/client-s3");
const S3 = new client_s3_1.S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: (_a = process.env.AWS_ACCESS_KEY) !== null && _a !== void 0 ? _a : "",
        secretAccessKey: (_b = process.env.AWS_SECREAT_KEY) !== null && _b !== void 0 ? _b : "",
    },
});
exports.default = S3;
//# sourceMappingURL=s3-client.util.js.map