const inquirer = require("inquirer");
const axios = require("axios");

inquirer
  .prompt({
    message: "Enter your GitHub username",
    name: "username"
  })
  .then(function ({ username }) {
    const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
    axios.get(queryUrl)
      .then(function (res) {
        
        const reponame = res.data.map(function(repo){
          return repo.name
        })
        console.log(reponame)
      });
  });