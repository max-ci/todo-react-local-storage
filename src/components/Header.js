import React, { Component } from 'react';
import './Header.css';
import logo from './../images/logo-dark.png';

class Sidebar extends Component {

  onClick() {
    this.props.onClick();
  }

  render() {
    return (
      <div>
        <img src={logo} className="img-fluid mobile-logo d-lg-none" alt="Todo app" />
        <button className="mobile-menu d-lg-none" type="button" onClick={this.onClick.bind(this)}>
          <span className="mobile-menu-box">
            <span className="mobile-menu-inner"></span>
          </span>
        </button>
      </div>
    );
  }

}

export default Sidebar;
