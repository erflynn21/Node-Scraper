const { setProxies } = require("./proxies");
const { basicRequest } = require("./basic");
const { puppeteerRequest } = require("./puppeteer");

const request = {
  proxyType: 'premium', 
  url: "http://ipinfo.io",
  rendering: true,
  geo: 'US',
  proxies: null,
  parse: false,
}

setProxies(request.proxyType).then((proxies) => {
  request.proxies = proxies;
  if (request.rendering) {
    // run a puppeteer request
    puppeteerRequest(request).then((response) => {
      console.log(response);
    });
  }

  if (!request.rendering) {
    // run a basic request
    basicRequest(request).then((response) => {
      console.log(response);
    });
  }
});
