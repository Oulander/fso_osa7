const { injectBabelPlugin } = require('react-app-rewired')
const rewireLess = require('react-app-rewire-less')

const colorPalette = {
  color1: '#69D2E7',
  color2: '#A7DBD8',
  color3: '#E0E4CC',
  color4: '#F38630',
  color5: '#FA6900'
}

const stylingOverrides = {
  '@layout-header-background': colorPalette.color2,
  '@layout-footer-background': colorPalette.color2,
  '@layout-header-padding': 0,
  '@layout-footer-padding': 0,
  '@primary-color': colorPalette.color4,
  '@info-color': colorPalette.color4,
  '@success-color': colorPalette.color4,
  '@processing-color': colorPalette.color4,
  '@error-color': colorPalette.color5,
  '@highlight-color': colorPalette.color4,
  '@warning-color': colorPalette.color4,
  '@normal-color': colorPalette.color4,
  '@menu-bg': 'transparent'
}

module.exports = function override(config, env) {
  config = injectBabelPlugin(
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
    config,
  )
  config = rewireLess.withLoaderOptions({
    modifyVars: stylingOverrides,
    javascriptEnabled: true,
  })(config, env)
  return config
}
