const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const { session } = require("passport");
const passportAuth = require("../utils/auth");

// get all posts for homepage
router.get("/", (req, res) => {
  console.log(req.session);
  Post.findAll({
    attributes: [
      "id",
      "title",
      "ingredients",
      "post_text",
      "category",
      "user_id",
      "created_at",
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
      const posts = dbPostData.map((post) => {
        // console.log(post);
       return post.get({ plain: true });
      })

      res.render("homepage", {
        posts,
        loggedIn: loginStatus,
      });
    })

    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// router.get("/dashboard", passportAuth, (req, res) => {
//   console.log("made it to call");
//   console.log(req.session);
//   Post.findAll({
//     where: {
//       // use the ID from the session
//       //id: req.params.id
//       user_id: req.session.passport.user
//     },
//     attributes: [      
//     'id',
//     'title',
//     'ingredients',
//     'post_text',
//     'category',
//     "user_id",
//     'created_at'
//   ],
//     include: [
//       {
//         model: Comment,
//         attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
//         include: {
//           model: User,
//           attributes: ["username"],
//         },
//       },
//       {
//         model: User,
//         attributes: ["username"],
//       },
//     ],
//   })
//     .then((dbPostData) => {
//       console.log(dbPostData);
    
      
//       let loginStatus;
//       if (typeof req.session.passport != "undefined") {
//         loginStatus = req.session.passport.user;
//         console.log("loginStatus", loginStatus);
//       } else {
//         loginStatus = false;
//       }
//         const posts = dbPostData.map((post) => {
//           console.log(post);
//          return post.get({ plain: true });
//         })
      
      
//       res.render("dashboard", {
//         posts,
//         loggedin: loginStatus,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// route for first time or logged out visitor
router.get("/enter", function (req, res) {
  res.render("enter");
});

// route for login / signup

// login route
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

// signup route

router.get("/signup", (req, res) => {
  res.render("signup");
});

// new recipe route

// router.get("/new-recipe", (req, res) => {
//   res.render("new-recipe");
// });

// router.get("/dashboard", (req, res) => {
//   res.render("dashboard");
// });

router.get("/post/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
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
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      let loginStatus;
      if (typeof req.session.passport != 'undefined') {
        loginStatus = req.session.passport.user;
      } else {
        loginStatus = false;
      }

      // serialize the data
      const post = dbPostData.get({ plain: true });

      // pass data to template
      res.render("single-post", {
        post,
        loggedIn: loginStatus,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
