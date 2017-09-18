var React = require('react');
var Link = require('react-router-dom').Link;

class Bottom2 extends React.Component {

  constructor() {
    super();
  }

  render(){

    return(
      <Link to='/'>
        <button className="btn btn-block">Return to sign in</button>
      </Link>
    );
  }
}

module.exports = Bottom2;
