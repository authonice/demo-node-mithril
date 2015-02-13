var m = require('mithril');
var authonice = require('authonice-mithril');

var Navbar = require('./Navbar.js');
var navCtrl = new Navbar.controller('demo');

// compose a page with nav & .container
var Page = module.exports = function(page, linksIn, linksOut){
  this.controller = function(){
    navCtrl.links(authonice.loggedIn() ? linksIn : linksOut);
    return new page.controller();
  };
  
  this.view = function(ctrl){
    return [
      Navbar.view(navCtrl),
      m('section.container', page.view(ctrl)),
    ];
  };
};