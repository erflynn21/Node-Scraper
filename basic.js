const request = require('request');
require('dotenv').config();

const basicRequest = async (userRequest) => {
    let username = process.env.USERNAME;
    let password = process.env.PASSWORD;

    if (userRequest.geo !== 'none') {
        username = `${process.env.USERNAME}-country-${userRequest.geo}`;
    }

    const proxyURL = 'http://' + username + ':' + password + '@' + userRequest.proxies;
    const proxiedRequest = request.defaults({'proxy': proxyURL});

    return new Promise((resolve, reject) => {
        proxiedRequest.get(userRequest.url, function (error, response, body){
            if (error) {
                reject(error);
                return error;
            } else {
                resolve( body);
                return body;
            }
        });
    });
}

module.exports = { basicRequest }