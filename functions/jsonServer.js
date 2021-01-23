const fxData = require('../db.json');

exports.handler = async (event, context) => {
  // Only allow GET
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Only GET allowed!' };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(fxData),
  };
};
