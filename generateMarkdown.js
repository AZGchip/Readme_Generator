
function buildReadme(data) {
  let filler;
  let key;
  let tableOfContents = `## Table Of Contents`
  let firstString = ""
  let SecondString = ""
  for (key of Object.keys(data)) {
    filler = data[key];
    // console.log(`filler is ${filler}
    // data and key is ${data[key]}
    // `)
    if (key == "title") {
      firstString += `# ${filler}`;
    }
    if (key == "description") {
      firstString += `
      ${filler}
      `;
    }
    if (data[key] !== '' && key !== "title" && key !== "description") {
      tableOfContents += `
      *[${key}](#${key})`
      SecondString += `<a name ="${key}">## ${key}</a
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
