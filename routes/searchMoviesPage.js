var express = require("express");
var router = express.Router();
const model = require("../models/usersMODEL");

router.get("/", async function (req, res, next) {
  let date = new Date();
  let user = await model.getOneUser(req.session.Username);
  if (req.session.adminAuthenticated) {
    res.render("SearchMoviesPage", {});
  } else if (req.session.authenticated) {
    if (
      user.LastLogin !==
      date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate()
    ) {
      model.resetTransaction(user.Username);

      res.render("SearchMoviesPage", {});
    } else if (parseInt(user.DailyOperations) > 0) {
      res.render("SearchMoviesPage", {});
    } else res.redirect("/Login");
  } else {
    res.redirect("/Login");
  }
});

router.post("/searchMovie", function (req, res, next) {
  let obj = {
    name: req.body.name,
    language: req.body.language,
    genres: [req.body.genres],
  };
  req.session.obj = obj;

  res.redirect("/ResultsPage");
  if (req.session.Username != "Admin")
    model.updateTransaction(req.session.Username);
});

module.exports = router;
