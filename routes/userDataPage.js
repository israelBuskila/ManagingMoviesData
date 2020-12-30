var express = require("express");
var router = express.Router();
const model = require("../models/usersMODEL");

router.get("/", function (req, res, next) {
  if (req.session.adminAuthenticated) {
    res.render("UserDataPage", { data: "save" });
  } else {
    res.redirect("/Login");
  }
});

router.get("/:id", async function (req, res, next) {
  let n = req.url.lastIndexOf("=");
  let name = req.url.substring(n + 1).replace(/%20/g, " ");

  let user = await model.getOneUser(name);

  res.render("UserDataPage", { data: user });
});

router.post("/updateUser", async function (req, res, next) {
  let user = await model.getOneUser(req.body.Username);
  let newUser = {
    Username: req.body.Username,
    Password: req.body.Password,
    CreatedData: req.body.CreatedData,
    NumOfTransaction: req.body.NumOfTransaction,
    LastLogin: user.LastLogin,
    DailyOperations: user.DailyOperations,
  };

  model.updateUser(newUser);
  if (req.body.Reset) {
    model.resetTransaction(req.body.Username);
  }
  res.redirect("/UsersManagementPage");
});

router.post("/saveUser", async function (req, res, next) {
  let newUser = {
    Username: req.body.Username,
    Password: req.body.Password,
    CreatedData: req.body.CreatedData,
    NumOfTransaction: req.body.NumOfTransaction,
    LastLogin: "0/0/0",
    DailyOperations: req.body.NumOfTransaction,
  };

  model.addUser(newUser);
  res.redirect("/UsersManagementPage");
});

module.exports = router;
