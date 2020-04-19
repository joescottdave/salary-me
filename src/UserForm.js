import React, { Component } from "react";
import "./UserForm.css";

class UserForm extends Component {
  onSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(
      this.refs.userName.value,
      this.refs.userSalary.value,
      this.refs.userPostcode.value
    );
  }

  _skip(event) {
    event.preventDefault();
    this.props.onSubmit("Alex", 15600, "CF243AA");
  }

  render() {
    return (
      <form
        className="UserForm"
        autoComplete="off"
        onSubmit={this.onSubmit.bind(this)}
      >
        <input type="text" ref="userName" placeholder="Name" />
        <br />
        <input
          type="number"
          step="none"
          ref="userSalary"
          placeholder="Annual Income"
        />
        <br />
        <input type="text" ref="userPostcode" placeholder="UK Postcode" />
        <br />
        <button type="submit">Submit</button>
        <button onClick={this._skip.bind(this)}>Skip</button>
      </form>
    );
  }
}

export default UserForm;
