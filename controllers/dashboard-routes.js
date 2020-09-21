const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const passportAuth = require("../utils/auth");

router.get('/', passportAuth, (req, res) => {
  // console.log("made it to call");
  // console.log('user message', req.session.passport.user);
  const userId = Array.isArray(req.session.passport.user) ? req.session.passport.user[0].id : req.session.passport.user.id;
  Post.findAll({
    style: 'dashboard.css',
    where: {
      // use the ID from the session
      //id: req.params.id
      user_id: Number(userId)
    
      
    },
    attributes: [      
    'id',
    'title',
    'ingredients',
    'post_text',
    'category',
    'created_at'
  ],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      // console.log('dbpostdata', dbPostData);
    
      
      let loginStatus;
      if (typeof req.session.passport != "undefined") {
        loginStatus = req.session.passport.user;
        console.log("loginStatus", loginStatus);
      } else {
        loginStatus = false;
      }
        const posts = dbPostData.map((post) => {
          // console.log('post', post);
         return post.get({ plain: true });
        })
      
      
      res.render('dashboard', {
        posts,
        loggedin: loginStatus,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// new recipe
router.get("/new-recipe", (req, res) => {
  res.render("new-recipe");
});

router.get("/edit/:id", passportAuth, (req, res) => {
  Post.findOne({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "post_text", "title", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      let loginStatus;
      if (typeof req.session.passport != "undefined") {
        loginStatus = false;
      }
      console.log(loginStatus);

      res.render("edit-post", { post, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
