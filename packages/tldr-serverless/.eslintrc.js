require('@wix/serverless-eslint-config/modern-module-resolution');
module.exports = {
  extends: require.resolve('@wix/serverless-eslint-config'),
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
};
