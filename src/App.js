import React, { Component } from 'react'
import Header from './Header'
import Infograph from './Infograph'
import UserForm from './UserForm'
import Container from './Container'

class App extends Component {
  constructor() {
    super()
    this.state = {
      userName: '',
      userSalary: '',
      userPostcode: '',
      area_name: '',
      area_code: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  handleSubmit(newUserName, newUserSalary, newUserPostcode) {
    this.setState({
      userName: newUserName,
      userSalary: newUserSalary,
      userPostcode: newUserPostcode
    })
  }

  handleReset() {
    this.setState({
      userName: '',
      userSalary: '',
      userPostcode: '',
      userTax: '',
      userNi: ''
    })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Container>
          {(this.state.userName === '') | (this.state.userSalary === '') ? (
            <UserForm onSubmit={this.handleSubmit} />
          ) : (
            <Infograph userInfo={this.state} handleReset={this.handleReset} />
          )}
        </Container>
      </div>
    )
  }
}

export default App
