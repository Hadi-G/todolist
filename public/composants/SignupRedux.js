var connect   = require('react-redux').connect;
var Signup = require('./Signup.js');

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
var SignupRedux = connect(
    mapStateToProps,
    mapDispatchToProps
)(Signup);

module.exports = SignupRedux;
