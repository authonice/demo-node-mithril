var m = require('mithril');
var authonice = require('authonice-mithril');

var Register = module.exports = {
  controller: function(){
    var ctrl = this;
    ctrl.error = m.prop('');
    ctrl.register = function(e){
      e.preventDefault();
      if (e.target.password.value !== e.target.password2.value){
        ctrl.error(m(".alert.alert-danger.animated.fadeInUp", 'Passwords must match.'));
        return;
      }
      authonice.register(e.target.email.value, e.target.password.value)
        .then(function(){
          ctrl.error(m(".alert.alert-success.animated.fadeInUp", 'Cool. Go check the console for your verify link.'));
          m.redraw();
        }, function(err){
          var message = 'An error occurred.';
          if (err.type === 'emailDupe'){
            message = 'There is already a user with that email address.';
          }
          ctrl.error(m(".alert.alert-danger.animated.fadeInUp", message));
          m.redraw();
        });
    };
  },

  view: function(ctrl){
    return [
      m("form.text-center.row.form-signin", {onsubmit:ctrl.register.bind(ctrl)},
        m('.col-sm-6.col-sm-offset-3', [
          m("h1", "register"),
          ctrl.error(),
          m('.form-group', [
            m("label[for='inputEmail']", "Email address"),
            m("input.form-control[name='email'][autofocus][id='inputEmail'][placeholder='Email address'][required][type='email']"),
          ]),
          m('.form-group', [
            m("label[for='inputPassword']", "Password"),
            m("input.form-control[name='password'][autocomplete='off'][id='inputPassword'][placeholder='Password'][required][type='password']"),
          ]),
          m('.form-group', [
            m("label[for='inputPassword2']", "Password (again)"),
            m("input.form-control[name='password2'][autocomplete='off'][id='inputPassword2'][placeholder='Password (again)'][required][type='password']"),
          ]),
          m('.form-group',
            m("button.btn.btn-lg.btn-primary.btn-block[type='submit']", "Sign up")
          )
        ])
      )
    ];
  }
};