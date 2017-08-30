import React, { Component } from 'react';
import './UserForm.css'

class UserForm extends Component {
    onSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.refs.userName.value, this.refs.userSalary.value, this.refs.userPostcode.value)
    }

    render() {
        return (
            <form className="UserForm" onSubmit={this.onSubmit.bind(this)} >
                <input 
                    type="text"
                    ref="userName"
                    placeholder="Name"
                />
                {/* <br /> */}
                <input 
                    type="number"
                    step="100"
                    ref="userSalary"
                    placeholder="Salary"
                />
                {/* <br /> */}
                <input 
                    type="text"
                    ref="userPostcode"
                    placeholder="UK Postcode"
                />
                {/* <br /> */}
                <button type="submit">Submit</button>
            </form>
        )
    }
}

export default UserForm;