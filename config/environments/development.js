'use strict';

module.exports = {
  app: "Organisr",
  mongodb: {
    uri: 'mongodb://localhost/organisr-dev'
  },
  auth: {
    facebookAuth: {
      clientID: '1518392685131105',
      clientSecret: '9875dea85d1a43edb47686d10bf3354b',
      callbackURL: 'http://localhost:5001/auth/facebook/callback'
    }
  }
};
