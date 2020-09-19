const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const { session } = require("passport");
const passportAuth = require("../utils/auth");

router.get("/dashboard", passportAuth, (req, res) => {
  console.log("made it to call");
  console.log(req.session);
  Post.findAll({
    where: {
      // use the ID from the session
      //id: req.params.id
      user_id: req.session.passport.user
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
    
      
      let loginStatus;
      if (typeof req.session.passport != "undefined") {
        loginStatus = req.session.passport.user;
        console.log("loginStatus", loginStatus);
      } else {
        loginStatus = false;
      }
        const posts = dbPostData.map((post) => post.get({ plain: true }));
      console.log(posts);
      
      res.render("dashboard", {
        posts,
        loggedin: loginStatus,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
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
