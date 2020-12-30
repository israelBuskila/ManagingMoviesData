const { json } = require("express");
const dal = require("../dals/usersDAL");
const model = require("./usersMODEL");

exports.addUser = async function (newUser) {
  let data = await dal.readFile();
  let users = data.users;
  users.push(newUser);
  dal.wraiteFile({ users: users });
  console.log("add user: succeeded!");
};

exports.getUsers = async function () {
  let users = await dal.readFile();
  return users.users.map((x) => x);
};

exports.deleteUser = async function (username) {
  let users = await dal.readFile();
  let newUsers = users.users.filter((x) => x.Username !== username);
  dal.wraiteFile({ users: newUsers });
  console.log("delete user: succeeded");
};

exports.getOneUser = async function (username) {
  let users = await dal.readFile();
  let user = users.users.filter((x) => x.Username === username);
  return user[0];
};

exports.checkLogin = async function (userLogin) {
  let getUser = await model.getOneUser(userLogin.Username);
  if (getUser.Username == "Admin" && getUser.Password == userLogin.Password)
    return "Admin";
  else if (getUser && getUser.Password == userLogin.Password) {
    return true;
  } else return false;
};

exports.updateUser = async (user) => {
  let users = await dal.readFile();
  let newUsers = users.users.filter((x) => x.Username !== user.Username);
  newUsers.push(user);
  dal.wraiteFile({ users: newUsers });
};

exports.resetTransaction = async function (username) {
  let date = new Date();
  let user = await model.getOneUser(username);
  user.LastLogin =
    date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate();
  user.DailyOperations = user.NumOfTransactions;
  model.updateUser(user);
};

exports.updateTransaction = async function (username) {
  let date = new Date();
  let user = await model.getOneUser(username);
  user.LastLogin =
    date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate();
  user.DailyOperations = (parseInt(user.DailyOperations) - 1).toString();
  return model.updateUser(user);
};

// model.getUsers().then((x) => console.log(x));

// exports.resetTransaction = async function (user) {
//   let date = new Date();
//   let obj = {
//     Username: user.Username,
//     Password: user.Password,
//     CreatedData: user.CreatedData,
//     NumOfTransaction: user.NumOfTransaction,
//     LastLogin:
//       date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate(),
//     DailyOperations: user.NumOfTransaction,
//   };

//   console.log(obj);
//   let del = await model.deleteUser(obj);
//   let add = await model.addUser(obj);
//   console.log("reset user: Succeeded!");
//   return true;
// };

// if (
//   getUser.Lastlogin !=
//   date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate()
// ) {
//   let res = await model.resetTransaction(getUser);
//   return true;
// } else {
//   if (getUser.DailyOperations > 0) return true;
// }

// tests:

// model.resetTransaction({
//   Username: "einav",
//   Password: "1234",
//   CreatedData: "25 / 12 / 2020",
//   NumOfTransaction: 0,
//   Lastlogin: "0/0/0",
//   DailyOperations: 0,
// });
// model
//   .checkLogin({
//     Username: "einav",
//     Password: "1234",
//     CreatedData: "25 / 12 / 2020",
//     NumOfTransaction: 0,
//     LastLogin: "0/0/0",
//     DailyOperations: 0,
//   })
//   .then((x) => console.log(x));
// let data = model.getUsers().then((x) => x);
// console.log(data);
// data.push({
//   Username: "einav",
//   Password: "1234",
//   CreatedData: "25 / 12 / 2020",
//   NumOfTransaction: 0,
//   LastLogin: "0/0/0",
//   DailyOperations: 5,
// });
// dal.wraiteFile({ users: data });
// model.addUser({
//   Username: "israel",
//   Password: "1234",
//   CreatedData: "25 / 12 / 2020",
//   NumOfTransaction: 0,
//   LastLogin: "0/0/0",
//   DailyOperations: 5,
// });

// model.getOneUser("Admin").then((x) => console.log(x));
// checkLogin({ Username: "Admin", Password: "12345" }).then((x) =>
//   console.log(x)
// );
