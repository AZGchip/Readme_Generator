const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
const md = require("./generateMarkdown");
// questions 
const questions = [
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
    name: "install"
  },
  {
    type: "input",
    message: "Enter Usage Information",
    name: "usage"
  },
  {
    type: "input",
    message: "Enter License info",
    name: "license"
  },
]


const userAnswer = {};
// getInfo()
// //asks user for github username. searches github with input
// function getInfo() {
//   inquirer
//     .prompt({
//       message: "Enter your GitHub username",
//       name: "username"
//     })
//     .then(function ({ username }) {
//       const queryUrl = `https://api.github.com/users/${username}`;
//       axios.get(queryUrl)
//         .then(function (res) {
//           console.log(res.data.avatar_url);
//           console.log(res.data.email);

//           promptUser()
//         });
//     });
// }
promptUser()
async function promptUser() {
  for (let i = 0; i < questions.length; i++) {
    await inquirer.prompt(questions[i])
      .then(function (answer) {
       let key = Object.keys(answer)[0]
       console.log(answer)
       console.log(key)
          userAnswer[key] = answer[key];
          
        })
  }
 let masterstring = md.buildReadme(userAnswer)
 console.log(masterstring)
 
}
// function buildReadme(){
//   userAnswer.forEach(x => {
//    let key = Object.keys(answer)[0];
//    if(userAnswer[x].key){}
//   });
// }

