var express = require("express");
var router = express.Router();
const userModel = require("../models/usersMODEL");
const moviesModel = require("../models/resultsPageMODEL");
let obj;

router.get("/", async function (req, res, next) {
  let date = new Date();
  let user = await userModel.getOneUser(req.session.Username);
  if (req.session.adminAuthenticated) {
    res.render("SearchMoviesPage", {});
  } else if (req.session.authenticated) {
    if (
      user.LastLogin !==
      date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate()
    ) {
      userModel.resetTransaction(user.Username);

      res.render("SearchMoviesPage", {});
    } else if (parseInt(user.DailyOperations) > 0) {
      res.render("SearchMoviesPage", {});
    } else res.redirect("/Login");
  } else {
    res.redirect("/Login");
  }
});

router.post("/searchMovie", function (req, res, next) {
  obj = {
    name: req.body.name,
    language: req.body.language,
    genres: [req.body.genres],
  };

  res.redirect("/SearchMoviesPage/ResultsPage");
  if (req.session.Username != "Admin")
    userModel.updateTransaction(req.session.Username);
});

router.get("/ResultsPage", async function (req, res, next) {
  let requirments = obj;
  let rightColumn;
  let leftColumn = [];
  if (requirments.name.length == 0) {
    rightColumn = await moviesModel.rightColumn(requirments.genres);
    leftColumn = [{ name: "not found" }];
    res.render("ResultsPage", { dataL: leftColumn, dataR: rightColumn });
  } else if (requirments.name.length != 0) {
    leftColumn = await moviesModel.leftColumn(requirments);

    if (typeof leftColumn[0] === "undefined")
      res.render("SearchMoviesPage", {});
    else {
      console.log(leftColumn[0].genres);
      rightColumn = await moviesModel.rightColumn(leftColumn[0].genres);
      res.render("ResultsPage", { dataL: leftColumn, dataR: rightColumn });
    }
  } else res.render("ResultsPage", { dataL: leftColumn, dataR: rightColumn });
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

  let movie = await moviesModel.leftColumn(requirments);

  res.render("MovieDataPage", { data: movie[0] });
  if (req.session.Username != "Admin")
    userModel.updateTransaction(req.session.Username);
});

module.exports = router;
