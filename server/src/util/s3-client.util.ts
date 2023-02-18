import { S3Client } from "@aws-sdk/client-s3";

console.log(process.env.AWSREGION, process.env.AWSACCESSKEY, process.env.AWSSECREATKEY);
const S3 = new S3Client({
  region: process.env.AWSREGION,
  credentials: {
    accessKeyId: process.env.AWSACCESSKEY ?? "",
    secretAccessKey: process.env.AWSSECREATKEY ?? "",
  },
});

export default S3;
