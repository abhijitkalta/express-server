"use strict";

const express = require('express');
const path = require('path');
const hbs = require('hbs');

//third-party middleware
const bodyParser = require('body-parser');

var app = express();
// app.set('env', 'production'); //set the environment  - process.env.NODE_ENV
// app.enable('trust proxy'); // incase proxy servers are used
// app.set('jsonp callback name', 'cb'); //setup for jsonp if callback name needs to be changed
// app.set('json replacer', (attr, val)=>{
//   if(attr === 'passwordHash'){
//     return undefined
//   } else {
//     return val.toUpperCase();
//   }
// });
// app.set('case sensitive routing'); /hello /HEllo wud be treated same, disabled by default
// app.set('strict routing'); /hello /hello/ wud be treated the same, enabled by default
// app.enable('view cache'); // use view cache to show views
// app.set('views', 'templates'); // to use different folder name for views - templates
// app.enable('x-powered-by'); // enabled by default - notifies that express server is being used

app.set('view engine', 'html'); // if set, no need to use extension for view files
app.engine('html', require('hbs').__express);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

//built in middleware
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, '/views/partials'));
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});


var names = [];
var log = (req, res, next) => {
  console.log(names);
  next();
}

app.param('name', (req, res, next, name) => {
  req.params.name = name[0].toUpperCase() + name.substring(1);
  next();
})

app.get('/about/:name', (req, res) => {
  console.log("Your name is: ", req.params.name);
})
app.get('/', log, (req, res) => {
  res.render('listForm.html', {
    name: names
  });
})

app.post('/', (req, res) => {
  names.push(req.body.name);
  res.redirect('/');
})

app.listen(3000, () => {
  console.log("Server running on port 3000!!");
})

// req.params.attr // params passed to url
// req.body.attr // using body - parser - for put, post
// req.query.attr // params in the form of ?name=
// app.param('attr', func) // order params body query
// req.route // useful router info
// req.get(headerName) // any header name
// req.originalUrl() // retruns the actual url
// req.cookies.attr // cookies related attr
// req.accepts('text/html') // return a boolean
// req.ip  // ip address
// req.secure // if https is used
// req.porotocol // http
//
// res.status();
// res.set(header, value);
// res.get(header);
// res.cookie(key,value);
// res.clearCookie(key);
// res.redirect(status, path);
// res.send(status, path);
// res.json(status, path);
// res.jsonp(status, path);
// res.download(file);
// res.render(file, props);

// res.format({
//   'text/html' : function(){},
//   'text/plain': function(){},
//   'application/json': function(){}
// })
