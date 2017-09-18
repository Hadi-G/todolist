var connect   = require('react-redux').connect;
var Todo = require('./Todo.js');

function mapStateToProps(state) {
  return { value: state.user }
}

var TodoRedux = connect(
    mapStateToProps  
)(Todo);

module.exports = TodoRedux;
