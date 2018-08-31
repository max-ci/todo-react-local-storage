import React, { Component } from 'react';
import './Todos.css';
import logo from './../images/logo.png';

class Sidebar extends Component {

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
