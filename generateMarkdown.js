
function buildReadme(data) {
  let filler;
  let key;
  let tableOfContents = `## Table Of Contents`
  let firstString = ""
  let SecondString = ""
  for (key of Object.keys(data)) {
    filler = data[key];
    if (key == "image" && data[key] !== undefined && key !== null) {
      if (data["email"] === null) {
        data["email"] = ` [github.com/${data["username"]}](https://github.com/${data["username"]}). `
      }
      SecondString +=
        `
      
## <a name ="contact"></a> Contact me
${data["username"]}  
[![GitHub followers](https://img.shields.io/github/followers/${data["username"]}.svg?style=social&label=Follow&maxAge=2592000)](https://github.com/${data["username"]}?tab=followers)


<img src="${data["image"]}" alt="profile" width="100"/>

If you have any questions, please contact me at: ${data["email"]}`
      tableOfContents +=
        `
* [Contact](#contact)`;
    }
    if (key == "title") {
      firstString += `# ${filler}`;
    }
    if (key == "description") {
      firstString +=
        `
      
${filler}
`;
    }
    if (data[key] !== '' && key[0] === key[0].toUpperCase()) {
      tableOfContents +=
        `
* [${key}](#${key})`;
      SecondString +=
        `
      
## <a name ="${key}"></a> ${key}
${filler}
`;
    }
  }
  return `
${firstString}
${tableOfContents}
${SecondString}
`;
}

module.exports = {
  buildReadme: buildReadme,
}
