var connect   = require('react-redux').connect;
var Signin = require('./Signin.js');

function mapStateToProps(state) {
  return { value: null }
}
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: function(userName) {
        dispatch( {type: 'increase', user: userName} );
    }
  }
}

var SigninRedux = connect(
    mapStateToProps,
    mapDispatchToProps
)(Signin);

module.exports = SigninRedux;
