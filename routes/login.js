var express = require("express");
var router = express.Router();
const usersModel = require("../models/usersMODEL");

router.get("/", function (req, res, next) {
  let appSession = req.session;
  if (appSession.counter) {
    appSession.counter += 1;
  } else {
    appSession.counter = 1;
  }

  res.render("login", { counter: appSession.counter });
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("Login", { title: "Express" });
});

router.get("/Login", function (req, res, next) {
  res.render("Login", {});
});

router.post("/getlogindata", async function (req, res, next) {
  let userLogin = { Username: req.body.user, Password: req.body.pwd };

  let isAuthenticted = false;
  let adminAuthenticted = false;
  let check = await usersModel.checkLogin(userLogin);
  let user = await usersModel.getTransactionForToday(userLogin.Username);
  req.session.numForToday = user.numForToday;
  req.session.NumOfTransaction = user.NumOfTransaction;

  console.log(user);
  if (check == "Admin") adminAuthenticted = true;
  else isAuthenticted = check;

  if (req.session.authenticated || req.session.adminAuthenticated) {
    res.redirect("/MenuPage");
  } else {
    if (isAuthenticted) {
      req.session.authenticated = true;

      res.redirect("/MenuPage");
    } else if (adminAuthenticted) {
      req.session.adminAuthenticated = true;

      res.redirect("/MenuPage");
    } else res.redirect("/Login");
  }

  // if (req.session.authenticated  ) {
  //   res.redirect("/MenuPage");
  // } else if (req.session.adminAuthenticated) {
  //   res.redirect("MenuAdminPage");
  // } else {
  //   if (isAuthenticted) {
  //     req.session.authenticated = true;

  //     res.redirect("/MenuPage");
  //   } else if (adminAuthenticted) {
  //     req.session.adminAuthenticated = true;

  //     res.redirect("MenuAdminPage");
  //   } else res.redirect("/Login");
  // }
});

module.exports = router;
