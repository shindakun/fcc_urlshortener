'use strict';

const express = require('express');
const validUrl = require('valid-url');
let app = express();

// Switch over to mongo later.
let test = {
  0: "https://www.google.com"
};

app.get('/', function (req, res) {
  let url = req.protocol + '://' + req.hostname + req.originalUrl;
  res.send(`<pre>
    Example creation usage:
      ${url}new/https://www.google.com

    Example creation output
      { "original_url":"https://www.google.com", "short_url":"${url}0" }
    
    Usage:
      ${url}0
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

let findByVal = function (urlIn) {
  for (let prop in test) {
    if (test.hasOwnProperty(prop)) {
      if (test[prop] === urlIn)
        return prop;
    }
  }
  return false;
}

app.get('/new/*', function (req, res) {
  if (!validUrl.isUri(req.params[0])) {
    res.json({
      error_bad_url: req.params[0]
    });
  } else {
    let urlIn = req.params[0];
    let url = req.protocol + '://' + req.hostname;
    let slot = findByVal(urlIn) || Object.keys(test).length;
    let shortUrl = `${url}/${slot}`;
    
    test[slot] = req.params[0];
    res.json({
      original_url: req.params[0],
      short_url: shortUrl
    });
  }
});

app.listen(process.env.PORT || 3000);
