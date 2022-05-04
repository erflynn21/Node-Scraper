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
                const result = {
                    status: 500,
                    queryURL: userRequest.url,
                    body: error,
                }
                reject(result);
                return result;
            } else {
                const result = {
                    status: 200,
                    queryURL: userRequest.url,
                    body: body,
                }
                resolve( result );
                return result;
            }
        });
    });
}

module.exports = { basicRequest }