var express = require("express");
var router = express.Router();
const model = require("../models/usersMODEL");

//show all users
router.get("/", async function (req, res, next) {
  if (req.session.adminAuthenticated) {
    let users = await model.getUsers();

    res.render("UsersManagementPage", { data: users });
  } else {
    res.redirect("/Login");
  }
});

//delet user
router.get("/deleteUser/:id", function (req, res, next) {
  let n = req.url.lastIndexOf("=");
  let data = req.url.substring(n + 1).replace(/%20/g, " ");
  let password = data.substring(data.lastIndexOf(" ") + 1);
  let name = data.substring(
    0,
    data.length - (password.length + " ".length + 1)
  );

  model.deleteUser(name);
  res.redirect("/UsersManagementPage");
});

//add new user
router.get("/addNewUser", function (req, res, next) {
  res.render("UserDataPage", { data: "save" });
});

//update user
router.get("/UserDataPage/:id", async function (req, res, next) {
  let n = req.url.lastIndexOf("=");
  let name = req.url.substring(n + 1).replace(/%20/g, " ");

  let user = await model.getOneUser(name);

  res.render("UserDataPage", { data: user });
});

//post => update user
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

//post => add new user
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
