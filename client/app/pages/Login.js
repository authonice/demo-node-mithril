var m = require('mithril');
var authonice = require('authonice-mithril');

var Login = module.exports = {
  controller: function(){
    var ctrl = this;
    ctrl.error = m.prop('');
    this.login = function(e){
      e.preventDefault();
      authonice.login(e.target.email.value, e.target.password.value)
        .then(function(){
          m.route(authonice.originalRoute || '/');
        }, function(err){
          message = (err && err.message) ? err.message : 'Login error.';
          ctrl.error(m(".alert.alert-danger.animated.fadeInUp", message));
          m.redraw();
        });
    };
  },

  view: function(ctrl){
    return [
      m("form.text-center.row.form-signin", {onsubmit:ctrl.login.bind(ctrl)},
        m('.col-sm-6.col-sm-offset-3', [
          m("h1", "login"),
          ctrl.error(),
          m('.form-group', [
            m("label[for='inputEmail']", "Email address"),
            m("input.form-control[name='email'][autofocus][id='inputEmail'][placeholder='Email address'][required][type='email']"),
          ]),
          m('.form-group', [
            m("label[for='inputPassword']", "Password"),
            m("input.form-control[name='password'][autocomplete='off'][id='inputPassword'][placeholder='Password'][required][type='password']"),
          ]),
          m('.form-group',
            m("button.btn.btn-lg.btn-primary.btn-block[type='submit']", "Sign in")
          )
        ])
      )
    ];
  }
};