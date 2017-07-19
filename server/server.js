const express = require('express'),
      session = require('express-session'),
      bodyParser = require('body-parser'),
      massive = require('massive'),
      passport = require('passport'),
      Auth0Strategy = require('passport-auth0'),
      config = require('./config.js'),
      cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(session({
  resave: true, 
  saveUninitialized: true, 
  secret: config.sessionSecret
}))
app.use(passport.initialize());
app.use(passport.session());


passport.use(new Auth0Strategy({
   domain:       config.auth0.domain,
   clientID:     config.auth0.clientID,
   clientSecret: config.auth0.clientSecret,
   callbackURL:  config.auth0.callbackUrl
  },
  function(accessToken, refreshToken, extraParams, profile, done) {



    done(null, { id: 2, username: 'Joe', email: 'joe@joe.com' })
  }
));


passport.serializeUser(function(user, done) {
  console.log('serializing', user);
  done(null, user);
});

passport.deserializeUser(function(user, done) {
    console.log('deserialize', user)
  done(null, user);
});


app.get('/auth', passport.authenticate('auth0'));

app.get('/auth/callback', passport.authenticate('auth0', 
{ successRedirect: 'http://localhost:3000/'}));

app.get('/auth/me', function(req, res) {
  if (!req.user) return res.status(200).send('No one logged in!');
  res.status(200).send(req.user);
})
app.get('/auth/logout', function(req, res) {
  req.logout();
  res.redirect('/');
})



app.listen( config.port, () => console.log( `Listening on port: ${config.port}` ));