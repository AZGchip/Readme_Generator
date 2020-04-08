
function buildReadme(data) {
  let filler;
  let key;
  const tableOfContents = []
  let firstString = ""
  let SecondString = ""
  const tempObj = {
    title: `# ${filler}`,
    description: `
  ${filler}
  `,
    table: tableOfContents,
    section: `<a name ="${key}">## ${key}</a
  ${filler}
  `
  }
  for (key of Object.keys(data)) {
    filler = data[key];
    if (key === title) {
      firstString += tempObj.title;
    }
    if (key === description) {
      firstString += tempObj.description;
    }
    if (data[key] !== '' && key !== title && key !== description) {
      tableOfContents.push(`*[${key}](#${key})`)
      SecondString += tempObj.section;
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
