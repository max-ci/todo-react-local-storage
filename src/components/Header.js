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
        <img src={logo} class="img-fluid mobile-logo d-lg-none" alt="Todo app" />
        <button class="mobile-menu d-lg-none" type="button" onClick={this.onClick.bind(this)}>
          <span class="mobile-menu-box">
            <span class="mobile-menu-inner"></span>
          </span>
        </button>
      </div>
    );
  }

}

export default Sidebar;
