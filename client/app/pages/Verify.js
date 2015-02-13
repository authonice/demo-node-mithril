var m = require('mithril');
var authonice = require('authonice-mithril');

var Verify = module.exports = {
  controller: function(){
    var ctrl = this;
    ctrl.message = m.prop();
    authonice.verify(m.route.param("code")).then(function(){
      ctrl.message(['Sweet. Now, you can ', m('a', {href:'/login', config: m.route}, 'login'), '.']);
      m.redraw();
    }, function(){
      ctrl.message('Hmm, there was something wrong with that code. Check your email again.');
      m.redraw();
    });
  },
  
  view: function(ctrl){
    return [
      m('h1', 'verify'),
      ctrl.message()
    ];
  }
};