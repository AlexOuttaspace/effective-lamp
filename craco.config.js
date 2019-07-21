const { loaderByName, getLoader } = require('@craco/craco') // eslint-disable-line

const transformBabelLoader = require('./transform-babel-loader') // eslint-disable-line

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const lm = getLoader(webpackConfig, loaderByName('babel-loader'))
      const loader = lm.match.loader
      webpackConfig.module.rules[2].oneOf[1] = transformBabelLoader(loader)
      return webpackConfig
    }
  },
  eslint: {
    loaderOptions: {
      useEslintrc: true
    }
  }
}
