var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/success', (req, res) => {
  res.render('success');
});

router.get('/failure', (req, res) => {
  res.render('failure');
});

router.get(
  '/auth/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/failure',
  }),
  (req, res) => {
    res.redirect('/success');
  }
);

router.get('/auth/google', (req, res) => {
  passport.authenticate(
    'google',
    { scope: ['email', 'profile'] },
  );
});

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/failure',
  }),
  (req, res) => {
    res.redirect('/success');
  }
);



module.exports = router;

module.exports = router;
