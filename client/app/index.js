var m = require('mithril');
var authonice = require('authonice-mithril');

var Page = require('./components/Page.js');

var linksIn = [
  {label:'secret', href:'/secret'},
  {label:'logout', href:'/logout'}
];

var linksOut = [
  {label:'login', href:'/login'},
  {label:'register', href:'/register'}
];

m.route(document.body, "/", {
  "/": new Page(require('./pages/Home.js'), linksIn, linksOut),
  "/login": new Page(require('./pages/Login.js'), linksIn, linksOut),
  "/logout": new Page(require('./pages/Logout.js'), linksIn, linksOut),
  "/register": new Page(require('./pages/Register.js'), linksIn, linksOut),
  "/verify/:code": new Page(require('./pages/Verify.js'), linksIn, linksOut),
  "/secret": new Page(require('./pages/Secret.js'), linksIn, linksOut)
});