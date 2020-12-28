const { json } = require("express");
const dal = require("../dals/usersDAL");
const model = require("./usersMODEL");

exports.addUser = async function (newUser) {
  let users = await dal.readFile();
  let allUsers = users.users;

  let obj = {
    Username: newUser.Username,
    Password: newUser.Password,
    CreatedData: newUser.CreatedData,
    NumOfTransaction: newUser.NumOfTransaction,
    Year: newUser.Year,
    Month: newUser.Month,
    Day: newUser.Day,
    numForToday: newUser.numForToday,
  };

  allUsers.push(obj);
  let storUsers = {
    users: allUsers,
  };
  dal.wraiteFile(storUsers);
};
exports.getUsers = async function () {
  let users = await dal.readFile();
  return users.users;
};

exports.deleteUser = async function (user) {
  let users = await dal.readFile();
  let allUsers = users.users.filter((x) => x.Username != user.Username);
  let storUsers = {
    users: allUsers,
  };
  dal.wraiteFile(storUsers);
};

let getOneUser = async function (username) {
  let users = await dal.readFile();
  let user = users.users.filter((x) => x.Username == username);
  if (user.length > 0) return user[0];
  else return false;
};

exports.getOneUser = async function (username) {
  let users = await dal.readFile();
  let user = users.users.filter((x) => x.Username == username);
  if (user.length > 0) return user[0];
  else return false;
};

exports.checkLogin = async function (userLogin) {
  let getUser = await getOneUser(userLogin.Username);
  if (getUser.Username == "Admin" && getUser.Password == userLogin.Password)
    return "Admin";
  else if (
    getUser &&
    getUser.Password == userLogin.Password &&
    model.checkTransaction(getUser.Username)
  ) {
    return true;
  } else return false;
};

exports.reset = async function (name) {
  let users = await dal.readFile();
  let username = users.users.filter((x) => x.Username == name);
  let time = new Date();
  user = username[0];
  console.log(user);

  user.Year = time.getFullYear();
  user.Month = time.getMonth() + 1;
  user.Day = time.getDate();
  user.numForToday = 0;
  console.log(user);

  let del = await model.deleteUser(user);
  let store = await model.addUser(user);
};

exports.checkTransaction = async function (name) {
  if (name == "Admin") return true;
  else {
    let time = new Date();
    let users = await dal.readFile();
    let username = users.users.filter((x) => x.Username == name);
    let user = username[0];

    if (time.getFullYear() > user.Year) model.reset(name);
    else if (
      time.getFullYear() >= user.Year &&
      time.getMonth() + 1 > user.Month
    )
      model.reset(name);
    else if (
      time.getFullYear() >= user.Year &&
      time.getMonth() + 1 >= user.Month &&
      time.getDate() > user.Day
    )
      model.reset(nane);
    else if (
      time.getFullYear() >= user.Year &&
      time.getMonth() + 1 >= user.Month &&
      time.getDate() >= user.Day &&
      user.numForToday < user.NumOfTransaction
    )
      return true;
    else return false;
  }
};
// model.checkTransaction("israel").then((x) => console.log(x));

// tests:

// addUser({
//   Username: "israel",
//   Password: 1234,
//   CreatedData: 25 / 12 / 2020,
//   NumOfTransaction: 3,
// });

// deleteUser({ Username: "einav", Password: 9876 }).then((x) => console.log(x));

// getOneUser("Admin").then((x) => console.log(x));
// checkLogin({ Username: "Admin", Password: "12345" }).then((x) =>
//   console.log(x)
// );
