const jsonModel = require("./newMoviesMODEL");
const apiModel = require("./movis");

exports.leftColumn = async function (requirments) {
  let dataApiL = await apiModel.getMovie(requirments);
  let dataJsonL = await jsonModel.getMovie(requirments);

  if (dataApiL == "not found!!") {
    dataApiL = [];
  } else if (dataJsonL == "not found!!") dataJsonL = [];
  else if (dataJsonL == "not found!!" && dataApiL == "not found!!")
    return "not found";
  dataApiL.forEach((x) => {
    dataJsonL.push(x);
  });
  return dataJsonL;
};

exports.rightColumn = async function (requirments) {
  let dataApiR = await apiModel.getMovieByGenre(requirments);

  let dataJsonR = await jsonModel.getMovieByGenre(requirments);

  if (dataApiR == "not found!!") {
    dataApiR = [];
  } else if (dataJsonR == "not found!!") dataJsonR = [];
  else if (dataJsonR == "not found!!" && dataApiR == "not found!!")
    return "not found";
  dataApiR.forEach((x) => {
    dataJsonR.push(x);
  });
  return dataJsonR;
};

// leftColumn({
//   id: 22,
//   name: "yaniv arad",
//   language: "Hindi",
//   genres: ["Documentary"],
// }).then((x) => console.log(x));

// rightColumn().then((x) => console.log(x));
