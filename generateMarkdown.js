//creates a readme template string using an object
function buildReadme(data) {
  let filler;
  let key;
  let tableOfContents = `## Table Of Contents`;
  let firstString = "";
  let secondString = "";
  let oS;
  if (data["opnsrc"] !== undefined && data["opnsrc"] === true) {
    oS = "[![Open Source Love svg1](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)"
  }
  else { oS = "" }
  //runs through each key in the data object
  for (key of Object.keys(data)) {
    //filler's value is set to the current key's attribute
    filler = data[key];
    //if current key is image, creates contact me section. if given email is null used github account link instead
    if (key == "image" && data[key] !== undefined && key !== null) {
      if (data["email"] === null) {
        data["email"] = ` [github.com/${data["username"]}](https://github.com/${data["username"]}). `
      }
      //contact me template
      secondString +=
        `
      
## <a name ="contact"></a> Contact me
${data["username"]}  
[![GitHub followers](https://img.shields.io/github/followers/${data["username"]}.svg?style=social&label=Follow&maxAge=2592000)](https://github.com/${data["username"]}?tab=followers)


<img src="${data["image"]}" alt="profile" width="100"/>

If you have any questions, please contact me at: ${data["email"]}`
      //adds link to contact me to table of contents
      tableOfContents +=
        `
* [Contact](#contact)`;
    }
    //handles building the title and adds it to firstString
    if (key == "title") {
      if (data["maintained"] !== undefined && data["maintained"] !== null) {
        if (data["maintained"]) {
          firstString += `# ${filler}
          
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/${data["username"]}/${data["title"]}/graphs/commit-activity)
${oS}
          `;
        }
        else {
          firstString += `# ${filler}
          
[![Maintenance](https://img.shields.io/badge/Maintained%3F-no-red.svg)](https://GitHub.com/${data["username"]}/${data["title"]}/graphs/commit-activity)
${oS}
      `;
        }
      }
      else {
        firstString += `# ${filler}
${oS}`;
      }
    }
    //handles building the description and adds it to firstString
    if (key == "description") {
      firstString +=
        `
      
${filler}
`;
    }
    //if if the current key's attribute is not null, AND is capitalized, uses key as the section header and the attribute as the main text below it. 
    if (data[key] !== '' && key[0] === key[0].toUpperCase()) {
      //uses key to add to link to table of contents
      tableOfContents +=
        `
* [${key}](#${key})`;
      //adds table of contents anchor, section title and filler content to secondString
      secondString +=
        `
      
## <a name ="${key}"></a> ${key}
${filler}
`;
    }
  }
  //returns template with the now complete table of contents in between the title and description (firstString) and content sections (secondString)
  return `
${firstString}
${tableOfContents}
${secondString}
`;
}
//exports function
module.exports = {
  buildReadme: buildReadme,
}
