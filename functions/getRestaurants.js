

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const defaultResults = process.env.defaultResults || 8;
const tableName = process.env.restaurants_table;  // prevent hardcoding

async function getRestaurants(count) {  
    
    let req = {
        TableName: tableName,
        Limit: count
    };
    let resp = await dynamodb.scan(req).promise();
    console.log('resp 6:', resp);
    return resp.Items;
}

module.exports.handlerHello2 = async (event, context) => {
    console.log('event 6:', event);

    let restaurants = await getRestaurants(defaultResults);
    console.log('look 6:', restaurants);
  
    return {
        statusCode: 200,
        body: JSON.stringify(restaurants, null, 2),
    };
  
};
  