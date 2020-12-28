const jsonfile = require("jsonfile");

exports.readFile = function () {
  return new Promise((resolve) => {
    jsonfile.readFile(__dirname + "/NewMovies.json", function (err, data) {
      if (err) {
        throw err;
      } else {
        resolve(data);
      }
    });
  });
};

exports.wraiteFile = async function (newMovie) {
  let movie = await newMovie;
  jsonfile.writeFile(__dirname + "/NewMovies.json", movie, function (err) {
    if (err) throw err;
    else console.log("wraiteFile -- NewMovies --> ok");
  });
};
