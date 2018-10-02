const express = require('express');
const app = express();

const { port } = require('./config/environment');

app.use(express.static(`${__dirname}/public`));

// add routes here
// don't forget to prefix routes with `/api`

app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

// error handler goes here...

app.listen(port, () => console.log(`Express is listening on port ${port}`));
