const contentful = require('contentful');

const {
  CONTENTFUL_SPACE,
  CONTENTFUL_ACCESS_TOKEN,
} = require('./config');

const client = contentful.createClient({
  space: CONTENTFUL_SPACE,
  accessToken: CONTENTFUL_ACCESS_TOKEN,
});

module.exports = client;
