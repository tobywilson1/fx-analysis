const path = require('path');
const fileData = require('../db.json');

exports.handler = async (event, context) => {
  // Only allow GET
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ status: 'Only GET allowed!' }),
    };
  }

  //obtain fx pair as basename of path

  const fxPair = path.basename(event.path);
  const returnData = fileData.fxData.find((item) => item.id === fxPair);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(returnData),
  };
};
