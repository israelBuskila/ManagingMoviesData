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
  console.log(user);
  res.render("UserDataPage", { data: user });
});

router.post("/updateUser", async function (req, res, next) {
  let newUser = {
    Username: req.body.Username,
    Password: req.body.Password,
    CreatedData: req.body.CreatedData,
    NumOfTransaction: req.body.NumOfTransaction,
  };

  let oldUser = await model.deleteUser(req.body);
  let store = await model.addUser(newUser);
  if (req.body.Reset) {
    let reset = await model.reset(newUser.Username);
  }
  res.redirect("/UsersManagementPage");
});

router.post("/saveUser", async function (req, res, next) {
  let newUser = {
    Username: req.body.Username,
    Password: req.body.Password,
    CreatedData: req.body.CreatedData,
    NumOfTransaction: req.body.NumOfTransaction,
    numForToday: 0,
    Year: 0,
    Month: 0,
    Day: 0,
  };

  let store = await model.addUser(newUser);
  res.redirect("/UsersManagementPage");
});

module.exports = router;
