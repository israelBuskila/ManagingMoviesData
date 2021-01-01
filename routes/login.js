var express = require("express");
var router = express.Router();
const usersModel = require("../models/usersMODEL");

router.get("/", function (req, res, next) {
  res.render("Login", {});
});

/* GET home page. */
router.get("/Login", function (req, res, next) {
  res.render("Login", {});
});

router.post("/getlogindata", async function (req, res, next) {
  let userLogin = { Username: req.body.user, Password: req.body.pwd };
  let date = new Date();
  let isAuthenticted = false;
  let adminAuthenticted = false;
  req.session.Username = req.body.user;
  console.log(req.body.user);
  let check = await usersModel.checkLogin(userLogin);

  if (check === "Admin") adminAuthenticted = true;
  else isAuthenticted = check;

  if (req.session.adminAuthenticated) res.redirect("/MenuPage");
  else if (req.session.authenticated) res.redirect("/MenuPage");
  else {
    if (isAuthenticted) {
      let user = await usersModel.getOneUser(req.body.user);

      if (
        user.LastLogin !==
        date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate()
      ) {
        req.session.authenticated = true;
        res.redirect("/MenuPage");
        usersModel.resetTransaction(user.Username);
        req.session.authenticated = true;
      } else if (parseInt(user.DailyOperations) > 0) {
        req.session.authenticated = true;
        res.redirect("/MenuPage");
      } else res.render("Login", { data: "incorrect" });
    } else if (adminAuthenticted) {
      req.session.adminAuthenticated = true;
      res.redirect("/MenuPage");
    } else res.render("Login", { data: "incorrect" });
  }
});

router.get("/MenuPage", async function (req, res, next) {
  if (req.session.adminAuthenticated) {
    res.render("MenuPage", { data: "admin" });
  } else if (req.session.authenticated) {
    res.render("MenuPage", { data: "user" });
  } else {
    res.redirect("/Login");
  }
});

module.exports = router;
