const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const defaultResults = process.env.defaultResults || 8;
const tableName = process.env.restaurants_table; // prevent hardcoding

async function findRestaurantsByTheme(theme, count) {
    let req = { 
        TableName: tableName, 
        Limit: count,
        FilterExpression: 'contains(themes, :theme)',
        ExpressionAttributeValues: {":theme": theme}
     };
    let resp = await dynamodb.scan(req).promise();
    console.log('resp 6:', resp);
    return resp.Items;
}

module.exports.handlerHello3 = async (event, context) => {
    console.log('event search:', event);

    let req = JSON.parse(event.body);
    let restaurants = await findRestaurantsByTheme(req.theme, defaultResults);
    console.log('restaurants log:', restaurants);

    return {
        statusCode: 200,
        body: JSON.stringify(restaurants, null, 2),
    };
};
