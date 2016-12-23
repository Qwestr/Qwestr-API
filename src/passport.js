import passport from 'passport';
/*import config from './passportConfig'*/
import passportFacebook from 'passport-facebook';
import passportGoogle from 'passport-google-oauth';
import passportLocal from 'passport-local';
import Users from './lib/users';

const GoogleStrategy = passportGoogle.OAuth2Strategy;
const FacebookStrategy = passportFacebook.Strategy;
const LocalStrategy = passportLocal.Strategy;
const users = new Users();

passport.use(new FacebookStrategy(
  {
    clientID: config.facebook.id,
    clientSecret: config.facebook.secret,
    callbackURL: config.facebook.cb
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

passport.use(new GoogleStrategy(
  {
    clientID: config.google.id,
    clientSecret: config.google.secret,
    callbackURL: config.google.cb
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

passport.use(new LocalStrategy(
  function(username, password, done) {
    users.login(username, password, done);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

export default passport;
