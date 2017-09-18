var React = require('react');

var Redirect = require('react-router').Redirect;

var Router = require('react-router-dom').BrowserRouter;
var Route = require('react-router-dom').Route;
var Link = require('react-router-dom').Link;

var Header = require('./Header.js');
var Signup = require('./Signup.js');
var Todo = require('./Todo.js');

class Signin extends React.Component {

  constructor() {
    super();
    this.state={user:'', password:'', islog:''};
    this.handleChange=this.handleChange.bind(this);
    this.handleChange2=this.handleChange2.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
}

handleChange(event){
  this.setState({user:event.target.value});
}

handleChange2(event){
  this.setState({password:event.target.value});
}

handleSubmit(event){
  var myComponent = this;
  fetch(serverPath+'/signin?user='+this.state.user+'&password='+this.state.password, {
    method: 'get'
  }).then(function(response){
    return response.text();
  }).then(function(obj){
    if(obj == 'oui'){
      myComponent.setState({islog:true});
    } else {
      alert('Username or password incorrect. If you are not registered please click on "first connection"');
    }
  });
  this.props.onIncreaseClick(this.state.user);
  event.preventDefault();
  this.setState({user:'', password:''});
}

  render(){

    var redirection = '';
    if(this.state.islog == true){
      var redirection = <Redirect to='/todo'/>;
    }

    return(
    <div className='content'>
      {redirection}
      <Header />
        <br /><br /><br />
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="User name" value={this.state.user} onChange={this.handleChange}></input>
        <input type="password" placeholder="Password" value={this.state.password} onChange={this.handleChange2}></input>
        <button type="submit" className="btn btn-primary btn-block">Sign in</button>
      </form>
        <Link to='/signupRedux'>
          <button className="btn btn-block">First connexion</button>
        </Link>
    </div>
    );
  }
}

module.exports = Signin;
