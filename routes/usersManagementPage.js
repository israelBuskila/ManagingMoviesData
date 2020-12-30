var express = require("express");
var router = express.Router();
const model = require("../models/usersMODEL");

router.get("/", async function (req, res, next) {
  if (req.session.adminAuthenticated) {
    let users = await model.getUsers();

    res.render("UsersManagementPage", { data: users });
  } else {
    res.redirect("/Login");
  }
});

router.get("/:id", function (req, res, next) {
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

module.exports = router;
