const parseCookies = (req, res, next) => {
  var cookieString = req.get('Cookie');
  //split on the semi colon-- makes array of cookies [test1  'hello', test2='goodbye']
  var cookiesParsed = cookieString.split('; ').reduce((cookies, cookie) => {
    if (cookie) {
      let crumbs = cookie.split('=');
      cookies[crumbs[0]] = crumbs[1];
    }
  });
  req.cookies = cookiesParsed;
  next();
};

module.exports = parseCookies;
