const setProxies = async (request) => {
    let proxies = '';
    if (request.proxyType === 'datacenter') {
        proxies = 'global.rotating.proxyrack.net:9000';
    }

    if (request.proxyType === 'residential') {
        proxies = 'private.residential.proxyrack.net:10000';
    }

    if (request.proxyType === 'premium' || request.google === true) {
        proxies = 'premium.residential.proxyrack.net:9000';
    }

    return proxies;
}

module.exports = { setProxies }