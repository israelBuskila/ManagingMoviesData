var express = require("express");
var router = express.Router();
const model = require("../models/resultsPageMODEL");

router.get("/", async function (req, res, next) {
  if (req.session.authenticated || req.session.adminAuthenticated) {
    let requirments = req.session.obj;
    let rightColumn;
    let leftColumn = [];
    if (requirments.name.length == 0) {
      rightColumn = await model.rightColumn(requirments.genres);
      leftColumn = [{ name: "not found" }];
    } else {
      leftColumn = await model.leftColumn(requirments);

      rightColumn = await model.rightColumn(leftColumn[0].genres);
    }

    // console.log(rightColumn);
    res.render("ResultsPage", { dataL: leftColumn, dataR: rightColumn });
  } else {
    res.redirect("/Login");
  }
});
module.exports = router;
