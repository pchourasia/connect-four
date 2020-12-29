import React from "react";
import "./Navbar.css";

class Navbar extends React.Component {
  constructor(props){
    super(props);
  }
  goBack() {
    debugger
    this.props.history.goBack();
  }
  render() {
    return (
      <div>
        <div className="navbar">
          <span className="back" onClick={this.goBack.bind(this)}>Back</span>
          <span className="page-header">Two Players Game</span>
        </div>
        {this.props.children}
      </div>
    )
  }
}

export default Navbar;