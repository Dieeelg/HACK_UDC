const webpack = require('webpack');

module.exports = {
    webpack: (config) => {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            querystring: require.resolve('querystring-es3'),
        };
        return config;
    },
};
