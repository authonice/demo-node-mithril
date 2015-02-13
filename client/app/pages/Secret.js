var m = require('mithril');
var authonice = require('authonice-mithril');

var Secret = module.exports = {
  controller: function(){
  	if (!authonice.loggedIn()){
      authonice.originalRoute = m.route();
      m.route(authonice.loginRoute);
    }
  },
  
  view: function(ctrl){
    return [
      m('h1', 'secret stuff'),
      m('p', "This page is to demo authentication. You can't easily see it if you are not logged in."),
      m('p', 'For security, make sure all actually secret content comes from locked-down REST endpoints, as the source of this file is client-readable.')
    ];
  }
};