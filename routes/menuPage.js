var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  if (req.session.authenticated) {
    res.render("MenuPage", { data: "user" });
  } else if (req.session.adminAuthenticated) {
    res.render("MenuPage", { data: "admin" });
  } else res.redirect("/Login");
});

module.exports = router;
