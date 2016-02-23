'use strict';

module.exports = {
  app: "Organisr",
  mongodb: {
    uri: 'mongodb://heroku_mn7dt712:s00p7jb3fg28ti9fgu5m3s6nfb@ds013898.mongolab.com:13898/heroku_mn7dt712'
  },
  auth: {
    facebookAuth: {
      clientID: '1518392685131105',
      clientSecret: '9875dea85d1a43edb47686d10bf3354b',
      callbackURL: 'http://www.organisr.xyz/auth/facebook/callback'
    }
  }
};
