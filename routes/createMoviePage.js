var express = require("express");
var router = express.Router();
const model = require("../models/newMoviesMODEL");
const userModel = require("../models/usersMODEL");

router.get("/", async function (req, res, next) {
  let date = new Date();
  let user = await userModel.getOneUser(req.session.Username);
  if (req.session.adminAuthenticated) {
    res.render("CreateMoviePage", {});
  } else if (req.session.authenticated) {
    if (
      user.LastLogin !==
      date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate()
    ) {
      userModel.resetTransaction(user.Username);

      res.render("CreateMoviePage", {});
    } else if (parseInt(user.DailyOperations) > 0) {
      res.render("CreateMoviePage", {});
    } else res.redirect("/Login");
  } else {
    res.redirect("/Login");
  }
});

router.post("/storeMovie", function (req, res, next) {
  //   let gen = [
  //     "War",
  //     "Crime",
  //     "Drama",
  //     "Action",
  //     "Sports",
  //     "Comedy",
  //     "Western",
  //     "Animated",
  //     "Adventure",
  //     "Documentary",
  //   ];
  console.log(req.body.language);
  let movie = {
    name: req.body.name,
    language: req.body.language,
    genres: [],
  };

  if (req.body.War) movie.genres.push("war");
  if (req.body.Crime) movie.genres.push("Crime");
  if (req.body.Drama) movie.genres.push("Drama");
  if (req.body.Action) movie.genres.push("Action");
  if (req.body.Sports) movie.genres.push("Sports");
  if (req.body.Comedy) movie.genres.push("Comedy");
  if (req.body.Western) movie.genres.push("Western");
  if (req.body.Animated) movie.genres.push("Animated");
  if (req.body.Adventure) movie.genres.push("Adventure");
  if (req.body.Documentary) movie.genres.push("Documentary");

  model.createMovie(movie);
  if (req.session.Username != "Admin")
    userModel.updateTransaction(req.session.Username);
  if (req.session.authenticated) res.redirect("/MenuPage");
  else if (req.session.adminAuthenticated) res.redirect("/MenuPage");

  //   res.redirect("MenuPage");
});

module.exports = router;
