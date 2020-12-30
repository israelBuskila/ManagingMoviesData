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
