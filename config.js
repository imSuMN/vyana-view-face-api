require("dotenv/config");

const { S3Client } = require("@aws-sdk/client-s3");

const config = {
  region: process.env.PB_REGION,
  credentials: {
    secretAccessKey: process.env.PB_SECRET_KEY,
    accessKeyId: process.env.PB_ACCESS_KEY_ID,
  },
};

const s3Client = new S3Client(config);

module.exports = { s3Client };
