const dal = require("../dals/moviesDal");

exports.getMovie = async function (search) {
  let result = await dal.getMovies();
  let data = result.data;

  let movie = data.filter(
    (x) => x.name == search.name && x.language == search.language
  );
  if (typeof movie !== "undefined") return movie;
  else return "not found!!";
};

/*This function receives an array of genres and returns all movies 
that match at least one of the genres*/
exports.getMovieByGenre = async function (arrayOfGenres) {
  if (typeof arrayOfGenres === "undefined") return "not found!!";
  else {
    let result = await dal.getMovies();
    let movie = result.data.filter((x) => x);

    let found = [];
    for (var t = 0; t < arrayOfGenres.length; t++) {
      for (var i = 0; i < movie.length; i++) {
        for (var j = 0; j < movie[i].genres.length; j++) {
          if (movie[i].genres[j] == arrayOfGenres[t]) found.push(movie[i]);
        }
      }
    }
    return found;
  }
};
