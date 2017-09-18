var React = require('react');

var Redirect = require('react-router').Redirect;

var Router = require('react-router-dom').BrowserRouter;
var Route = require('react-router-dom').Route;
var Link = require('react-router-dom').Link;

var Header = require('./Header.js');
var Todo = require('./Todo.js');
var Bottom2 = require('./Bottom2.js');

class Signup extends React.Component {

  constructor() {
    super();
    this.state={user:'', password:'', confirmPassword:'', islog:''};
    this.handleChange=this.handleChange.bind(this);
    this.handleChange2=this.handleChange2.bind(this);
    this.handleChange3=this.handleChange3.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
}

handleChange(event){
  this.setState({user:event.target.value});
  this.props.onIncreaseClick(event.target.value);
}

handleChange2(event){
  this.setState({password:event.target.value});
}

handleChange3(event){
  this.setState({confirmPassword:event.target.value});
}

handleSubmit(event){
  var myComponent=this;
  if(myComponent.state.user != '' && myComponent.state.password != '' && myComponent.state.password == myComponent.state.confirmPassword){
    fetch(serverPath+'/signup?user='+myComponent.state.user
    +'&password='+myComponent.state.password+'&confirmPassword='+myComponent.state.confirmPassword, {
      method: 'get'
    }).then(function(response){
      return response.text();
    }).then(function(obj){
      console.log(obj);
      if(obj == 'oui'){
        myComponent.setState({islog:true});
      } else {
        alert('please choose another username');
    }
    });
  } else {
    alert('please complete all fields or enter a valid username or password');
  }

  this.props.onIncreaseClick(this.state.user);
  event.preventDefault();
  this.setState({user:'', password:'', confirmPassword:''});
}

  render(){

    var redirection = '';
    if(this.state.islog == true){
      var redirection = <Redirect to='/todo' />;
    }

    return(
    <div className='content'>
      {redirection}
      <Header />
        <br /><br /><br />
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="User name" value={this.state.user} onChange={this.handleChange}></input>
        <input type="password" placeholder="Password" value={this.state.password} onChange={this.handleChange2}></input>
        <input type="password" placeholder="Confirm the password" value={this.state.confirmPassword} onChange={this.handleChange3}></input>
        <button type="submit" className="btn btn-negative btn-block">Sign up</button>
      </form>
      <Bottom2 />
    </div>
    );
  }
}

module.exports = Signup;
