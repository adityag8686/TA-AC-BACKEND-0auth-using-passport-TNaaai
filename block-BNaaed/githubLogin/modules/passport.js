var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var User = require('../models/User');

passport.use(
    new GitHubStrategy(
        {
            clientID : process.env.CLIENT_ID,
            clientSecret : process.env.CLIENT_SECRET,
            callbackURL : 'http://localhost:3000/auth/github/callback',
            scope: ['user :email']
        },
        (accessToken, refreshToken,profile,done) =>{
            var profileData = {
                name : profile.displayname,
                username : profile.username,
                email : profile._json.email,
                photo : profile._json.avatar_url,
            };
            User.findOne({ email: profile._json.email }, (err, user) => {
                if (err) return done(err);
                if (!user) {
                    User.create(profileData, (err, addedUser) => {
                        if (err) return done(err);
                        return done(null, addedUser);
                    });
                }
                return done(null, user);
                });

        }
    )
)