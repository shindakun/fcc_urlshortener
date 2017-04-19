'use strict';

const express = require('express');
let app = express();

app.get('/', function (req, res) {
  res.send('Hello world!');
});
app.listen(process.env.PORT || 3000);
