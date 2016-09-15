module.exports = function databaseRecordToHtml(databaseModel, databaseRecord) {
  let html = '<p>';

  const fields = databaseModel.fields;
  for (const fieldName of Object.keys(fields)) {
    const label = fields[fieldName].label;
    const content = label === 'Name'
      ? databaseRecord[fieldName].full
      : databaseRecord[fieldName];
    html += `<b>${label}</b>: ${content}<br>`;
  }

  html += '</p>';
  return html;
};
