var express = require("express");
var router = express.Router();
const model = require("../models/usersMODEL");

router.get("/", async function (req, res, next) {
  let date = new Date();
  let user = await model.getOneUser(req.session.Username);
  if (req.session.adminAuthenticated) {
    res.render("MenuPage", { data: "admin" });
  } else if (req.session.authenticated) {
    if (
      user.LastLogin !==
      date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate()
    ) {
      model.resetTransaction(user.Username);

      res.render("MenuPage", { data: "user" });
    } else if (parseInt(user.DailyOperations) > 0) {
      res.render("MenuPage", { data: "user" });
    } else res.redirect("/Login");
  } else {
    res.redirect("/Login");
  }
});

module.exports = router;
