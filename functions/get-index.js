'use strict';

const fs = require('fs');
const { promisify } = require('util');
const readHtmlFileAsync = promisify(fs.readFile);
const Mustache = require('mustache');
const http = require('superagent-promise')(require('superagent'), Promise);

const restaurantsApiRoot = process.env.restaurants_api;
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const static_html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Big Mouth</title>
  
  <style>
    .fullscreenDiv {
      background-color: #05bafd;
      width: 100%;
      height: auto;
      bottom: 0px;
      top: 0px;
      left: 0;
      position: absolute;        
    }

    .column-container {
      padding: 0;
      margin: 0;        
      list-style: none;
      display: -webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      flex-flow: column;
      justify-content: center;
    }

    .item {
      padding: 5px;
      height: auto;
      margin-top: 10px;
      display: flex;
      flex-flow: row;
      justify-content: center;
    }

    input {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 18px;
    }

    button {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 18px;
    }
  </style>

  <script>
  </script>
</head>

<body>
  <div class="fullscreenDiv">
    <ul class="column-container">
      <li class="item">
        <img id="logo" src="https://d2qt42rcwzspd6.cloudfront.net/manning/big-mouth.png">
      </li>
      <li class="item">
        <input id="theme" type="text" size="50" placeholder="enter a theme, eg. cartoon"/>
        <button onclick="search()">Find Restaurants</button>
      </li>        
    </ul>
</div>
</body>

</html>
`;

// for test Async Await
function forOsakaTest() {
    return 'hello OSAKA!';
}


function getRestaurants2() {

    let forTest = [
        { 
            name: 'Fangtasia', 
            image: 'https://d2qt42rcwzspd6.cloudfront.net/manning/fangtasia.png', 
            themes: ['true blood'] 
        },
        { 
            name: 'Shoney\'s', 
            image: 'https://d2qt42rcwzspd6.cloudfront.net/manning/shoney\'s.png', 
            themes: ['cartoon', 'rick and morty'] 
        },
    ];

    return forTest;
}

async function getRestaurants() {

    try {
        const getResponse = await http.get(restaurantsApiRoot);
        console.log('show getRespBody:', getResponse.body);
        return (getResponse.body);
    } catch (error) {
        console.log('async await Error: ', error.message);
    }


}

module.exports.handlerHello = async (event, context) => {
    console.log('landing page event:', event);

    const helloOsaka = forOsakaTest(); // why without await will not get an Error?
    // const helloOsaka = await forOsakaTest();
    let staticHtmlFile = await readHtmlFileAsync('static/index3.html', 'utf-8');

    let restaurants = await getRestaurants();
    let dayOfWeek = days[new Date().getDay()];
    let staticHtmlFile2 = Mustache.render(staticHtmlFile, { dayOfWeek, restaurants });
  
    console.log('hiOsaka:', helloOsaka);
    console.log('static HTML:', staticHtmlFile);
    console.log('static HTML2:', staticHtmlFile2);
    console.log('show restaurants array:', restaurants);

    return {
        statusCode: 200,
        body: staticHtmlFile2,
        headers: {
            'Content-Type': 'text/html; charset=UTF-8'
        }
    };

    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
