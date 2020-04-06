const inquirer = require("inquirer");
const axios = require("axios");
getInfo()
function getInfo(){
inquirer
  .prompt({
    message: "Enter your GitHub username",
    name: "username"
  })
  .then(function ({ username }) {
    const queryUrl = `https://api.github.com/users/${username}`;
    axios.get(queryUrl)
      .then(function (res) {
        console.log(res.data.avatar_url);
        console.log(res.data.email);
      });
  });
}