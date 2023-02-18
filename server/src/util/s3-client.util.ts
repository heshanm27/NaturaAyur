import { S3Client } from "@aws-sdk/client-s3";

const S3 = new S3Client({
  region: process.env.AWSREGION,
  credentials: {
    accessKeyId: process.env.AWSACCESSKEY ?? "",
    secretAccessKey: process.env.AWSSECREATKEY ?? "",
  },
});

export default S3;
