const setProxies = async (proxyType) => {
    let proxies = '';
    if (proxyType === 'datacenter') {
        proxies = 'global.rotating.proxyrack.net:9000';
    }

    if (proxyType === 'residential') {
        proxies = 'private.residential.proxyrack.net:10000';
    }

    if (proxyType === 'premium' || google === true) {
        proxies = 'premium.residential.proxyrack.net:9000';
    }

    return proxies;
}

module.exports = { setProxies }