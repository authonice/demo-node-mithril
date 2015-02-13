var m = require('mithril');
var authonice = require('authonice-mithril');

var Logout = module.exports = {
  controller: function(){
    authonice.logout();
    m.route('/');
  },

  view: function(ctrl){}
};