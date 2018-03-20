'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3()

module.exports.upload = (event) => {
  console.log('upload happened')
  console.log(event.Records)
  event.Records.forEach((record) => {
    const filename = record.s3.object.key;
    const eventType = record.eventName
    const eventTime = record.eventTime

    const params = {
      TableName: 'modifications',
      Item: {
        id: uuid.v1(),
        objectName: filename,
        eventType: eventType,
        eventTime: eventTime
      }
    }

    dynamoDb.put(params, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("data uploaded")
    })

  });
};
