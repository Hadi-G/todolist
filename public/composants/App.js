var React = require('react');
var ReactDOM = require('react-dom');
var Redirect = require('react-router').Redirect;

var Router = require('react-router-dom').BrowserRouter;
var Route = require('react-router-dom').Route;
var Link = require('react-router-dom').Link;

var createStore =  require('redux').createStore;
var Provider    =  require('react-redux').Provider;

var Todo = require('./Todo.js');
var TodoRedux = require('./TodoRedux.js');
var Signin = require('./Signin.js');
var SigninRedux = require('./SigninRedux.js');
var Signup = require('./Signup.js');
var SignupRedux = require('./SignupRedux.js');

class App extends React.Component {

  constructor() {
    super();
}
  render(){
    return(
        <SigninRedux />
    );
  }
}

function counterReducer(state, action) {
  if(action.type == 'increase'){
    return { user: action.user}
  }
}

const store = createStore(counterReducer);

ReactDOM.render(
<Provider store={store}>
  <Router>
    <div>
      <Route exact path='/' component={App} />
      <Route path='/signupRedux' component={SignupRedux} />
      <Route path='/todo' component={TodoRedux} />
    </div>
  </Router>
</Provider>
,
document.getElementById('container')
);
