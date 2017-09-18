var React = require('react');
var Header = require('./Header.js');
var Bottom = require('./Bottom.js');

var Router = require('react-router-dom').BrowserRouter;
var Route = require('react-router-dom').Route;
var Link = require('react-router-dom').Link;

class Todo extends React.Component {

  constructor() {
    super();
    this.state = {value:'', task:[]};
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleClick=this.handleClick.bind(this);
  }

    componentDidMount(){
      var myComponent = this;
      fetch(serverPath+'/affichage?user='+myComponent.props.value,{
        method:'get'
      }).then(function(response){
        return response.json();
      }).then(function(obj){
        myComponent.setState({task:obj});
      });
    }

    handleChange(event){
      this.setState({value:event.target.value});
    }

    handleSubmit(event){
      var myComponent = this;
      if(myComponent.state.value != ''){
        fetch(serverPath+'/dataBase?user='+myComponent.props.value+'&task='+myComponent.state.value,{
          method: 'get'
        }).then(function(response){
          return response.json();
        }).then(function(obj){
          myComponent.setState({task:obj});
            });
      } else {
        alert('please fill the field');
      }
      event.preventDefault();
      myComponent.setState({value:''});
    }

    handleClick(event){
      var myComponent = this;
      fetch(serverPath+'/delete?task='+event.target.value+'&user='+myComponent.props.value, {
        method:'get'
      }).then(function(response){
        return response.json();
      }).then(function(obj2){
        console.log(obj2);
        myComponent.setState({task:obj2});
      });
    }

  render() {

var taskList = [];
for(var i = 0; i<this.state.task.length; i++){
  taskList.push(<li className="table-view-cell" key={'number:'+i}>{this.state.task[i].task}
  <button id={i} className="btn btn-negative" value={this.state.task[i].task} onClick={this.handleClick}>Delete</button></li>);
}

     return (
      <div className='content'>
        <Header />
<br /><br /><br />
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="enter the task to save" value={this.state.value} onChange={this.handleChange}></input>
          <button className="btn btn-positive btn-block" type='submit' value='Submit'>save task</button>
        </form>

        <div className="card">
          <ul className="table-view">
            {taskList}
          </ul>
        </div>
<br /><br /><br />
        <Bottom />
      </div>
     );
   }
}

module.exports = Todo;
