const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User} = require('../models');
const { session } = require('passport');

// get all posts for homepage
router.get('/', (req, res) => {
  console.log(req.session);
  Post.findAll({
    attributes: [
      'id',
      'title',
      'ingredients',
      'post_text',
      'category',
      'user_id',
      'created_at'
      
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));

        let loginStatus;
        if (typeof req.session.passport != 'undefined') {
          loginStatus = req.session.passport.user;
          console.log('loginStatus', loginStatus);
        } else {
          loginStatus = false;
        }
  
        res.render('homepage', {
          posts,
          loggedIn: loginStatus }
        );
      })
  
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// route for login / signup

  // login route
  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
  
    res.render('login');
  });

  // signup route

  router.get('/signup', (req, res) => {
    res.render('signup')
  });

module.exports = router;
