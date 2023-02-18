"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_routes_1 = __importDefault(require("../routes/product.routes"));
const order_routes_1 = __importDefault(require("../routes/order.routes"));
const order_routes_2 = __importDefault(require("../routes/order.routes"));
const s3_client_util_1 = __importDefault(require("../util/s3-client.util"));
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const uuid_1 = require("uuid");
function routes(app) {
    var _a;
    app.get("/", (req, res) => {
        res.status(200).json({
            server: "Server Is running",
        });
    });
    // app.get("/bucket", (req: Request, res: Response) => {
    //   const params: PutObjectCommandInput = {
    //     Bucket: process.env.S3BUCKETNAME,
    //     Key: "test",
    //     Body: "test",
    //     ContentType: "text/plain",
    //   };
    //   const command = new PutObjectCommand(params);
    // });
    const upload = (0, multer_1.default)({
        storage: (0, multer_s3_1.default)({
            s3: s3_client_util_1.default,
            bucket: (_a = process.env.S3BUCKETNAME) !== null && _a !== void 0 ? _a : "",
            metadata: function (req, file, cb) {
                cb(null, { fieldName: file.fieldname });
            },
            key: function (req, file, cb) {
                cb(null, (0, uuid_1.v4)());
            },
        }),
    });
    app.post("/test", upload.array("files", 6), (req, res) => {
        const files = req.files;
        res.status(200).json({
            files,
        });
    });
    app.use("api/v1/product", product_routes_1.default);
    app.use("api/v1/user", order_routes_1.default);
    app.use("api/v1/order", order_routes_2.default);
}
exports.default = routes;
//# sourceMappingURL=index.js.map