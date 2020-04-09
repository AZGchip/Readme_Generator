
function buildReadme(data) {
  let filler;
  let key;
  let tableOfContents = `## Table Of Contents`
  let firstString = ""
  let SecondString = ""
  for (key of Object.keys(data)) {
    filler = data[key];
    if (key == "Image" && data[key] !== undefined && key !== null) {
      if (data["Email"] === null) {
        data["Email"] = ` [github.com/${data["username"]}](https://github.com/${data["username"]}). `
      }
      SecondString +=
        `
      
## <a name ="contact"></a> Contact me
<img src="${data["Image"]}" alt="profile" width="100"/>

If you have any questions, please contact me at: ${data["Email"]}`
      tableOfContents +=
        `
* [Contact](#contact)`;
    }
    if (key == "Title") {
      firstString += `# ${filler}`;
    }
    if (key == "Description") {
      firstString +=
        `
      
${filler}
`;
    }
    if (data[key] !== '' && key !== "Title" && key !== "Description" && key !== "Image" && key !== "Email" && key !== "username") {
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
