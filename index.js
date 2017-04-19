'use strict';

const express = require('express');
let app = express();

// Switch over to mongo later.
let test = {
  0: "https://www.google.com"
};

app.get('/', function (req, res) {
  res.send(`<pre>
    Example creation usage:
      https://domain/new/https://www.google.com

    Example creation output
      { "original_url":"https://www.google.com", "short_url":"https://domain/0" }
    
    Usage:
      https://domain/0
    Will redirect to:
      https://www.google.com/
    </pre>`);
});

app.get('/showObject', function (req, res) {
  res.json(test);
});

app.get('/:in', function (req, res) {
  if (test[req.params.in]) {
    res.redirect(test[req.params.in]);
  } else {
    res.redirect('/');
  }
});

app.get('/new/*', function (req, res) {
  console.log(Object.keys(test)[Object.keys(test).length-1]);
  let slot = Object.keys(test).length;
  let shortUrl = 'http://domain/' + slot;
  test[slot] = req.params[0];
  res.json({
    original_url: req.params[0],
    short_url: shortUrl
  });
});

app.listen(process.env.PORT || 3000);
