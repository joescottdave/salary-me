import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Infograph from './Infograph';
import UserForm from './UserForm';

class App extends Component {
  constructor(){
    super()
    this.state = {
      userName: '',
      userSalary: '',
      userPostcode: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleSubmit(newUserName, newUserSalary, newUserPostcode) {
    this.setState({ userName: newUserName, userSalary: newUserSalary, userPostcode: newUserPostcode });
  }

  handleReset() {
    this.setState( {
      userName: '',
      userSalary: '',
      userPostcode: '',
    } )
  }

  render() {
    return (
      <div className="App">
        <Header />
        {this.state.userName === '' | this.state.userSalary === '' ? 
        <UserForm onSubmit={this.handleSubmit}/>
        :
        <Infograph userInfo={this.state} handleReset={this.handleReset}/>
        }
      </div>
    );
  }
}

export default App;
