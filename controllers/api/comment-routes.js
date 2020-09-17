const router = require('express').Router();
const { Comment } = require('../../models');
const passportAuth = require("../../utils/auth");

// get route to find all comments
router.get('/', (req, res) => {
  Comment.findAll({

  })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
          console.log(err);
          res.status(400).json(err);
      });
});

router.post('/', passportAuth, (req, res) => {
    // check the session
    if (req.session) {
      Comment.create({
        comment_text: req.body.comment_text,
        post_id: req.body.post_id,
        // use the id from the session
        user_id: req.session.passport.user.id
      })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    }
  });

// delete route to destroy the information
router.delete('/:id', passportAuth, (req, res) => {
  Comment.destroy({
      where: {
          id: req.params.id
      }
  })
      .then(dbUserData => { // returns promise
          if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id' });
              return;
          }
          res.json(dbUserData);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

module.exports = router;