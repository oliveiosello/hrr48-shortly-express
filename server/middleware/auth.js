const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  Promise.resolve(req.cookies.shortlyId)
    .then((hash) => {
      if (!hash) {
        throw hash;
      }
      return models.Sessions.get({hash});
    })
    .then((session) => {
      if (!session) {
        throw session;
      }
      req.session = session;
    })
    .catch(() => {
      return models.Sessions.create()
        .then((results) => {
          return models.Sessions.get({id: results.id});
        })
        .then((session) => {
          res.cookie('shortlyId', session.id);
        });
      next();
    });
  //check for hash
  //how are we iding hash in our shortly db?
  //if no hash
  //throw hash
  //check for session
  //if no session
  //throw session
  //return session --session id? and user id?
  //catch
  //create new session
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

module.exports.verifySession = (req, res, next) => {
  if (models.Sessions.isLoggedIn(req.session)) {
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
  next();
};


// isLoggedIn(session) {
//   return !!session.user;
// }