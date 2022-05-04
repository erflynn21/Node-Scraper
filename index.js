const { setProxies } = require("./proxies");
const { basicRequest } = require("./basic");
const { puppeteerRequest } = require("./puppeteer");
const { googleRequest } = require("./google");

const request = {
  proxyType: 'premium', 
  url: "https://google.com/search?q=residential+proxies",
  render: true,
  geo: 'US',
  proxies: null,
  parse: false,
  google: true,
}

setProxies(request.proxyType).then((proxies) => {
  request.proxies = proxies;
  if (request.google) {
    googleRequest(request).then((response) => {
      console.log(response);
    });
  }

  if (request.render) {
    // run a puppeteer request
    puppeteerRequest(request).then((response) => {
      // console.log(response);
    });
  }

  if (!request.render) {
    // run a basic request
    basicRequest(request).then((response) => {
      console.log(response);
    });
  }
});
