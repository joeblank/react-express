import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      infoFromServer: 'no info from server'
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    axios.get('/auth/me')
    .then( res => {
      console.log('res', res);
      this.setState({
        infoFromServer: res.data
      })
    })
  }




  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <button 
          className='btn btn-default' 
          onClick={ this.handleClick }
          >Who is logged in?</button>
        <p className="App-intro">
          { JSON.stringify(this.state.infoFromServer, null, 2) }
        </p>
        <a href='http://localhost:3535/auth'>
          <button 
            className='btn btn-default'>Log in</button>
        </a>
      </div>
    );
  }
}

export default App;
