module.exports = {
  ...require('@wix/serverless-jest-config'),
  moduleNameMapper: {
    "^uuid(/(.*)|$)": "uuid$1"
  }
}
