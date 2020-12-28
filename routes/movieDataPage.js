var express = require("express");
var router = express.Router();
const model = require("../models/resultsPageMODEL");

router.get("/", function (req, res, next) {
  if (req.session.authenticated || req.session.adminAuthenticated) {
    res.render("MovieDataPage", {});
  } else {
    res.redirect("/Login");
  }

  router.get("/SearchMoviesPage", function (req, res, next) {
    res.redirect("/SearchMoviesPage");
  });
});

router.get("/:id", async function (req, res, next) {
  let n = req.url.lastIndexOf("=");
  let data = req.url.substring(n + 1).replace(/%20/g, " ");
  let lang = data.substring(data.lastIndexOf(" ") + 1);
  let name = data.substring(0, data.length - (lang.length + " ".length + 1));

  let requirments = {
    name: name,
    language: lang,
  };

  let movie = await model.leftColumn(requirments);

  res.render("MovieDataPage", { data: movie[0] });
});

module.exports = router;
