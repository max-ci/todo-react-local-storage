import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Sidebar from './components/Sidebar';
import InputError from './components/InputError';

class App extends Component {

  constructor(props) {
    super(props);

    let categories = JSON.parse(localStorage.getItem('categories'));
    if(categories === null) {
      categories = [];
    }
    let tasks = JSON.parse(localStorage.getItem('categories'));
    if(tasks === null) {
      tasks = [];
    }

    this.state = {
      czesc: 'czesfsdfsdafsdafc',
      categories: categories,
      tasks: tasks,
      error: {
        active: false,
        content: ''
      }
    }

    this.handleShowError = this.handleShowError.bind(this);
    this.handleCloseError = this.handleCloseError.bind(this);
  }

  handleShowError(content) {
    if(!this.state.error.active) {
      setTimeout(() => {
        this.handleCloseError();
      }, 3000);
    }

    this.setState({
      error: {
        active: true,
        content: content
      }
    });
  }

  handleCloseError() {
    this.setState(prevState => ({
      error: {
        active: false,
        content: prevState.error.content
      }
    }));
  }

  render() {
    return(
      <div>
        <Sidebar categories={this.state.categories} showError={this.handleShowError} />
        <InputError error={this.state.error} closeError={this.handleCloseError} />
      </div>
    );
  }

}

export default App;
