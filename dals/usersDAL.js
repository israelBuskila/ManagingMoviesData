const jsonfile = require("jsonfile");

exports.readFile = function () {
  return new Promise((resolve) => {
    jsonfile.readFile(__dirname + "/../data/Users.json", function (err, data) {
      if (err) throw err;
      else resolve(data);
    });
  });
};

exports.wraiteFile = async function (newUser) {
  let user = await newUser;
  jsonfile.writeFile(__dirname + "/../data/Users.json", user, function (err) {
    if (err) throw err;
    else console.log("wraiteFile -- Users -- > ok");
  });
};
