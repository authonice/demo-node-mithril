/**
 * Site navigation component
 */

var m = require('mithril');

var Navbar = module.exports = {
  controller: function(name) {
    var ctrl = this;
    ctrl.iconDirection = m.prop('down');

    ctrl.name = m.prop(name);
    ctrl.links = m.prop([]);

    ctrl.toggle = function(){
      ctrl.iconDirection( ctrl.iconDirection()=='up' ? 'down':'up' );
    };

    // like m.route, but close nav.
    ctrl.handle = function(element, isInit, context){
      if (!isInit){
        element.onclick = function(e){
          e.preventDefault();
          ctrl.iconDirection('down');
          m.route(e.target.attributes.href.value);
          m.redraw();
        };
      }
    };
  },

  view: function(ctrl) {
    return m('nav.navbar.navbar-inverse.navbar-fixed-top', [
      m('.container', [
        m('.navbar-header',
          m('button.navbar-toggle', {onclick: ctrl.toggle}, m('.glyphicon.glyphicon-chevron-' + ctrl.iconDirection())),
          m('a.navbar-brand', {href:'/', config: m.route}, ctrl.name())
        ),
        m('.navbar-collapse.' + ctrl.iconDirection(), 
          m('ul.nav.navbar-nav.navbar-right', ctrl.links().map(function(l){
            var r = (m.route().substr(1).split('/'));
            return m('li' + (r[0] === l.href.substr(1) ? '.active': ''), m('a', {href:l.href , config: ctrl.handle}, l.label));
          }))
        )
      ])
    ]);
  }
};