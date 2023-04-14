import S3 from "../util/s3-client.util";
import multer from "multer";
import multerS3 from "multer-s3";
import { v4 as uuidv4 } from "uuid";

export const upload = multer({
  storage: multerS3({
    s3: S3,
    bucket: process.env.S3_BUCKET_NAME ?? "",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, uuidv4() + "-" + file.originalname);
    },
  }),
});
