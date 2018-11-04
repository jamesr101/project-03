const fs = require('fs');
const data = new Buffer(process.env.GOOGLE_CREDENTIALS_BASE64, 'base64');

fs.writeFile('google-credentials.json', data, (err) => {
  if(err) throw err;
  console.log('google credentials created...');
});
