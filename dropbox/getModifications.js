'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.getModifications = (event, context, callback) => {
    const params = {
        TableName: 'modifications'
    }

    dynamoDb.scan(params, (err, result) => {
        if(err) {
            console.error(err);
            callback(new Error('couldnt get the modifications'));
            return;
        }

        const response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify(result.Items)
        };
        callback(null, response);
    })
}