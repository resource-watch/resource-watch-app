const path = require('path');
const express = require('express');

const indexPath = path.join(process.cwd(), 'dist/index.html');

function auth(username, password) {
  const user = basicAuth(req);
  if (!user || user.name !== username || user.pass !== password) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.sendStatus(401);
  }
  return next();
}

module.exports = (app) => {
  app.use(auth(process.env.USERNAME, process.env.PASSWORD));
  app.use(express.static(path.join(process.cwd(), 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(indexPath);
  });
};
