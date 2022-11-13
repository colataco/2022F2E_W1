/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
const {
  useBabelRc,
  override,
  fixBabelImports,
  addLessLoader,
  setWebpackPublicPath,
  adjustStyleLoaders,
} = require('customize-cra');
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');
const AntTheme = require('./src/styles/antTheme');

const cspConfigPolicy = {
  'default-src': "* data: 'unsafe-eval' 'unsafe-inline' blob:",
  'style-src':
    "'unsafe-inline' 'self' 'unsafe-eval' http://fonts.googleapis.com/earlyaccess/notosanstc.css",
};

const cspOptions = { nonceEnabled: { 'style-src': false } };

function addCspHtmlWebpackPlugin(config) {
  config.plugins.push(new CspHtmlWebpackPlugin(cspConfigPolicy, cspOptions));

  return config;
}

// Import your eslint configuration here
const eslintConfig = require('./.eslintrc.js');

const useEslintConfig = (configRules) => (config) => {
  const updatedRules = config.module.rules.map((rule) => {
    // Only target rules that have defined a `useEslintrc` parameter in their options
    if (
      rule.use &&
      rule.use.some(
        // eslint-disable-next-line no-void
        (use) => use.options && use.options.useEslintrc !== void 0
      )
    ) {
      const ruleUse = rule.use[0];
      const baseOptions = ruleUse.options;
      const baseConfig = baseOptions.baseConfig || {};
      const newOptions = {
        useEslintrc: false,
        ignore: true,
        baseConfig: { ...baseConfig, ...configRules },
      };
      ruleUse.options = newOptions;
      return rule;

      // Rule not using eslint. Do not modify.
    }
    return rule;
  });

  config.module.rules = updatedRules;
  return config;
};

const lessLoader = addLessLoader({
  lessOptions: {
    javascriptEnabled: true,
    modifyVars: AntTheme,
  },
});

const styleLoader = adjustStyleLoaders(({ use: [, , postcss] }) => {
  const postcssOptions = postcss.options;
  postcss.options = { postcssOptions };
});
const fixAntd = fixBabelImports('import', {
  libraryName: 'antd',
  libraryDirectory: 'es',
  style: true,
});

// Support environment -specific settings
const env = process.env.NODE_ENV;
const envs = {
  development: override(
    useEslintConfig(eslintConfig), // Use your imported .eslintrc.js file here
    addCspHtmlWebpackPlugin,
    fixAntd,
    lessLoader,
    useBabelRc(),
    styleLoader,
    setWebpackPublicPath('')
  ),
  production: override(
    addCspHtmlWebpackPlugin,
    fixAntd,
    lessLoader,
    useBabelRc(),
    styleLoader,
    setWebpackPublicPath('')
  ),
};

module.exports = envs[env];
