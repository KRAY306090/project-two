const router = require('express').Router();
const { Post, User, Vote, Comment } = require('../../models');
const passportAuth = require("../../utils/auth");

// get all users
router.get('/', (req, res) => {
    Post.findAll({
      attributes: ['id', 'title', 'ingredients', 'post_text', 'category', 'created_at'],
      order: [['created_at', 'DESC']], 
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'title', 'ingredients', 'post_text', 'category', 'created_at'],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

   router.post('/', passportAuth, (req, res) => {
    const userId = Array.isArray(req.session.passport.user) ? req.session.passport.user[0].id : req.session.passport.user.id;
    // console.log('check this out', userId);
    Post.create({
      title: req.body.title,
      ingredients: req.body.ingredients,
      post_text: req.body.post_text,
      category: req.body.category,
      user_id: Number(userId)
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.put('/:id', passportAuth,  (req, res) => {
    Post.update(
      {
        title: req.body.title,
        post_text: req.body.post_text
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  // PUT /api/posts/upvote
router.put('/upvote', passportAuth, (req, res) => {
  // make sure the session exists first
  if (req.session) {
      // pass session id along with all destructured properties on req.body
      Post.upvote({ ...req.body, user_id: req.session.user.id }, { Vote, Comment, User })
          .then(updatedVoteData => res.json(updatedVoteData))
          .catch(err => {
              console.log(err);
              res.status(500).json(err);
          });
  }
});

  router.delete('/:id', passportAuth,  (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;