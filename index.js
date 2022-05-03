const { setProxies } = require("./proxies");
const { basicRequest } = require("./basic");
const { puppeteerRequest } = require("./puppeteer");

const request = {
  proxyType: 'premium', 
  url: "http://google.com",
  rendering: true,
  geo: 'US',
  proxies: null,
  parse: false,
}

setProxies(request.proxyType).then((proxies) => {
  request.proxies = proxies;
  if (request.rendering) {
    // run a puppeteer request
    puppeteerRequest(request);
  }

  if (!request.rendering) {
    // run a basic request
    basicRequest(request);
  }
});
