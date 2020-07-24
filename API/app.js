const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.text());

app.get('/', (req, res) => res.send('Hello world!'))

app.listen(port, () => console.log(`Express now departing from http://localhost:${port}!`));
