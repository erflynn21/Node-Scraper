const request = require('request');
require('dotenv').config();

const basicRequest = (userRequest) => {
    let username = process.env.USERNAME;
    let password = process.env.PASSWORD;

    if (userRequest.geo !== 'none') {
        username = `${process.env.USERNAME}-country-${userRequest.geo}`;
    }

    const proxyURL = 'http://' + username + ':' + password + '@' + userRequest.proxies;
    const proxiedRequest = request.defaults({'proxy': proxyURL});

    proxiedRequest.get(userRequest.url, function (err, resp, body) {
        console.log('error = ', err);
        console.log('body = ', body);
    })
}

module.exports = { basicRequest }