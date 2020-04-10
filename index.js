const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
const md = require("./generateMarkdown");
// questions 
const questions = [
  {
    type:"confirm",
    message:"Is this project Open Source?",
    name:"opensrc",
  },
  {
    type: "input",
    message: "Enter Project Title",
    name: "title"
  },
  {
    type: "input",
    message: "Enter Project Description",
    name: "description"
  },
  {
    type: "input",
    message: "Enter Project Installation Info",
    name: "Installation"
  },
  {
    type: "input",
    message: "Enter Usage Information",
    name: "Usage"
  },
  {
    type: "input",
    message: "Enter License Information",
    name: "License"
  },
  {
    type: "input",
    message: "Enter Contributing Information",
    name: "Contributing"
  },
  {
    type: "input",
    message: "Enter Testing Information",
    name: "Tests"
  },
]


const userAnswer = {};
getInfo()
//asks user for github username. searches github with input
function getInfo() {
  inquirer
    .prompt({
      message: "Enter your GitHub username",
      name: "username"
    })
    .then(function ({ username }) {
      const queryUrl = `https://api.github.com/users/${username}`;
      axios.get(queryUrl)
        .then(function (res) {

          console.log(res)
          promptUser(res,username)
        });
    });
}

async function promptUser(res, username) {
  for (let i = 0; i < questions.length; i++) {
    await inquirer.prompt(questions[i])
      .then(function (answer) {
        let key = Object.keys(answer)[0]
        console.log(answer)
        console.log(key)
        userAnswer[key] = answer[key];

      })

  }
  userAnswer["image"] = res.data.avatar_url;
  userAnswer["email"] = res.data.email;
  userAnswer["username"]= username
  let masterstring = md.buildReadme(userAnswer)
  console.log(masterstring)
  fs.writeFile("test.md", masterstring, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("File saved successfully!");
  });
}

