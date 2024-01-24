// eslint-disable-next-line import/no-extraneous-dependencies
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1',
});

const snsClient = new AWS.SNS();

export default snsClient;
