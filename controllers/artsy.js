const rp = require('request-promise');
const Promise = require('bluebird');

const artsyToken = {
  token: null,
  exp: 0
};

function getToken() {

  return new Promise(resolve => {
    if(artsyToken.exp > (new Date()).getTime()) return resolve(artsyToken.token);

    rp({
      method: 'POST',
      url: 'https://api.artsy.net/api/tokens/xapp_token',
      qs: {
        client_id: process.env.ARTSY_CLIENT_ID,
        client_secret: process.env.ARTSY_CLIENT_SECRET
      },
      json: true
    })
      .then(response => {
        artsyToken.token = response.token;
        artsyToken.exp = (new Date(response.expires_at)).getTime();

        resolve(response.token);
      });
  });
}

function artistsIndexRoute(req, res, next) {
  // first get a token
  getToken()
    .then(token => {
      return rp({
        method: 'GET',
        url: 'https://api.artsy.net/api/artists',
        qs: {
          size: 1,
          term: req.query.search
        },
        headers: {
          'X-XAPP-Token': token
        },
        json: true
      });
    })
    .then(response => res.json(response._embedded.artists[0]))
    .catch(next);
}

module.exports = {
  artistsIndex: artistsIndexRoute
};
