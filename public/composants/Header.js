var React = require('react');

class Header extends React.Component {

  constructor() {
    super();
}
  render(){
    return(
      <header className="bar bar-nav">
        <h1 className="title">TODOLIST</h1>
      </header>
    );
  }
}

module.exports = Header;
