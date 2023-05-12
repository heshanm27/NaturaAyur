import S3 from "../util/s3-client.util";
import multer from "multer";
import multerS3 from "multer-s3";
import { v4 as uuidv4 } from "uuid";

const customContentType = (req: any, file: any, cb: any) => {
  const ext = file.originalname.split(".").pop();
  console.log(ext);
  console.log(file);
  switch (ext.toLowerCase()) {
    case "jpg":
    case "jpeg":
      return cb(null, "image/jpeg");
    case "png":
      return cb(null, "image/png");
    case "svg":
      return cb(null, "image/svg+xml");
    default:
      return cb(null, "application/octet-stream");
  }
};

export const upload = multer({
  storage: multerS3({
    s3: S3,
    bucket: process.env.S3_BUCKET_NAME ?? "",
    contentType: customContentType,
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, uuidv4() + "-" + file.originalname);
    },
  }),
});
