import React, { Component } from 'react';
import './Sidebar.css';
import logo from './../images/logo.png';

class Sidebar extends Component {

  constructor(props) {
    super(props);

    this.escFunction = this.escFunction.bind(this);
  }

  componentDidMount(){
    document.addEventListener("keydown", this.escFunction, false);
  }

  escFunction(event){
    if(event.keyCode === 27) {
      this.props.closeMobileMenu();
    }
  }

  render() {
    return (
      <div className={'sidebar ' + this.props.mobileMenu}>
        <div className="sidebar-logo-wrapper">
          <img src={logo} className="sidebar-logo" alt="Todo App" />
        </div>
        {this.props.children}
      </div>
    );
  }

}

export default Sidebar;
