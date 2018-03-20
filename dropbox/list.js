'use strict';

const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    params: { Bucket: 'dropbox-demo' }
});

module.exports.list = (event, context, callback) => {
    const params = {
        Bucket: 'dropbox-demo'
    }
    
    console.log("list objects")
    s3.listObjects(params, (err, data) => {
        if(err) {
            console.error(err);
            callback(new Error('couldnt get the objects'));
            return
        }
        const response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify(data.Contents)
        };
        callback(null, response);
    })
}