// import multer from "multer";

// const multerOptions: multer.Options = {
//   storage: multer.memoryStorage(),
//   limits: {
//     fileSize: 1 * 1024 * 1024, // no larger than 10mb, you can change as needed.
//   },
//   fileFilter(req, file, callback) {
//     const isAccepted = ["image/png", "image/jpg", "image/jpeg", "image/svg"].find((acceptedFormat) => acceptedFormat === file.mimetype);

//     if (isAccepted) {
//       return callback(null, true);
//     }

//     callback(null, false);
//     return callback(new Error("Only .png,.svg, .jpg and .jpeg format allowed!"));
//   },
// };

// const upload = multer({ dest: "uploads/" });
