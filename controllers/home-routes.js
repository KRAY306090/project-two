const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User} = require('../models');

// get all posts for homepage
router.get('/', (req, res) => {
  console.log('======================');
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
  
        res.render('homepage', {
          posts,
          //loggedIn: req.session.loggedIn
        });
      })
  
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
