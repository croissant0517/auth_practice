const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

require('dotenv').config()

const app = express();
const port = process.env.PORT || 4000;

app.use(cookieParser(process.env.MY_COOKIE_SECRET_KEY));
app.use(session({
  secret: process.env.MY_SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false //only localhost test
  }
}));

app.get('/', (req, res) => {
  res.send('Hello World');
  console.log(req.signedCookies);
  console.log(req.cookies);
})

app.get('/setCookie', (req, res) => {
  res.cookie('yourCookie', "Oreo", { signed: true })
  res.send('already setting cookie');
})

app.get('/setSession', (req, res) => {
  req.session.example = 'Hello Vic';
  req.session.userName = 'Vic';
  res.send('already setting session');
})

app.get('/seeSession', (req, res) => {
  res.send('see session');
  console.log(req.session);
})

app.listen(port, () => console.log("Node server listening on port " + port));