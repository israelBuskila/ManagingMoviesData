const { json } = require("express");
const dal = require("../dals/newMoviesDAL");

exports.createMovie = async function (newMovie) {
  let newMovies = await dal.readFile();
  let allNewMovies = newMovies.movies;
  let id = allNewMovies[allNewMovies.length - 1].id + 1;

  let movie = await newMovie;
  let obj = {
    id: id,
    name: movie.name,
    language: movie.language,
    genres: movie.genres,
  };

  allNewMovies.push(obj);
  let storMovies = {
    movies: allNewMovies,
  };
  dal.wraiteFile(storMovies);
};

/*This function receives an object of search requirements and
 returns movies according to these requirements*/
exports.getMovie = async function (search) {
  let result = await dal.readFile();

  let movie = result.movies.filter(
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
  let result = await dal.readFile();
  let movie = result.movies;

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
//   name: "karate",
//   language: "English",
//   genres: ["Crim"],
// }).then((x) => console.log(x));

// getMovieByGenre(["Drama"]).then((x) => console.log(x));
