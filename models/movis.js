const dal = require("../dals/moviesDal");

exports.getMovie = async function (search) {
  let result = await dal.getMovies();
  let data = result.data;

  let movie = data.filter(
    (x) => x.name == search.name && x.language == search.language
  );
  if (movie.length > 0) return movie;
  else return "not found!!";
  // for (var i = 0; i < search.genres.length; i++) {
  //   return movie.filter((x) => {
  //     return x.genres.some((y) => y == search.genres[i]);
  //   });
  // }
};

/*This function receives an array of genres and returns all movies 
that match at least one of the genres*/
exports.getMovieByGenre = async function (arrayOfGenres) {
  console.log(arrayOfGenres);
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
  if (found.length > 0) return found;
  else return "not found!!";
};

// getMovie({
//   name: "Boardwalk Empire",

//   language: "English",
//   genres: ["Drama", "Crime"],
// }).then((x) => console.log(x));
// getMovieByGenre(["War"]).then((x) => console.log(x));