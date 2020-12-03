const aws = require("aws-sdk");
const multer = require("multer");
const multers3 = require("multer-s3");

aws.config.update({
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey,
});

const s3 = new aws.S3();

const upload = multer({
  storage: multers3({
    s3: s3,
    bucket: "amazon-clone-zk-v1",
    acl: "public-read",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString());
    },
  }),
});

module.exports = upload;
