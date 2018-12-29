'use strict';

const fs = require('fs');
const { promisify } = require('util');
const readHtmlFileAsync = promisify(fs.readFile);

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

function forOsakaTest() {
  return 'hello...Tom.';
}

module.exports.handler = async (event, context) => {
  
  const helloOsaka = await forOsakaTest();
  const staticHtmlFile = await readHtmlFileAsync('static/index.html', 'utf8');
  
  console.log('hiOsaka:', helloOsaka);
  console.log('static HTML:', staticHtmlFile);

  return {
    statusCode: 200,
    body: staticHtmlFile,
    headers: {
      'Content-Type': 'text/html; charset=UTF-8'
    }
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
