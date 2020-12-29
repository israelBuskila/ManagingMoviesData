var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  if (req.session.adminAuthenticated) {
    res.render("SearchMoviesPage", {});
  } else if (
    req.session.authenticated &&
    req.session.numForToday < req.session.NumOfTransaction
  ) {
    res.render("SearchMoviesPage", {});
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
  req.session.numForToday++;

  res.redirect("/ResultsPage");
});

module.exports = router;
