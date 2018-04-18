const axios = require('axios')

module.exports.helloWorld = (event, context, callback) => {
  axios.get('https://xkcd.com/info.0.json')
    .then(responseBody => {
      console.log(responseBody.data)

      const response = {
        statusCode: 200,
        // headers: {
        //   'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        // },
        body: JSON.stringify({
          message: responseBody.data,
          input: event,
        }),
      };

      callback(null, response);
    })
};
