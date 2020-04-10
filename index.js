//dependencies
const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
const md = require("./generateMarkdown");
//questions is an array of objects used by inquirer to prompt the user with questions
//!IMPORTANT! Capitalized name keys are used directly to make section titles and anchor/link pairs in the table of contents.
//Lowercase name keys are ignored by the template maker but can be used by directly calling them. 
//name:"title" and name:"description" are called on differenty because they do not need a section title or table of contents bookmark
const questions = [
  {
    type: "input",
    message: "Enter Github Project Title",
    name: "title"
  },
  {
    type: "confirm",
    message: "Is This Project Maintained?",
    name: "maintained"
  },
  {
    type: "confirm",
    message: "Is This Project Open Source?",
    name: "opnsrc"
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

//object to contain the data passed into buildReadme
const readmeData = {};
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
          //Sends returned github data and username to promptUser()
          promptUser(res, username);
        });
    });
}
//Prompts the user for each question in the QUESTIONS object. 
async function promptUser(res, username) {
  for (let i = 0; i < questions.length; i++) {
    await inquirer.prompt(questions[i])
      .then(function (answer) {
        console.log(answer)
        //adds the user's answer for each question to readmeData
        let key = Object.keys(answer)[0]
        readmeData[key] = answer[key];
      })
  }
  //removes spaces from username
  username = username.replace(/\s+/g, '');
  //adds github data to readmeData
  readmeData["image"] = res.data.avatar_url;
  readmeData["email"] = res.data.email;
  readmeData["username"] = username
  //creates readme template string useing readmeData plugged into inported md.buildreadme
  let masterstring = md.buildReadme(readmeData)
  //saves file
  fs.writeFile("test.md", masterstring, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("File saved successfully!");
  });
}

