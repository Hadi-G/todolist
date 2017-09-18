var React = require('react');
var Link = require('react-router-dom').Link;

class Bottom extends React.Component {

  constructor() {
    super();
}

  render(){

    return(
      <div className="bar bar-standard bar-footer">
        <Link to='/'>
          <button className="btn btn-primary btn-block">Sign out</button>
        </Link>
      </div>
    );
  }
}

module.exports = Bottom;
