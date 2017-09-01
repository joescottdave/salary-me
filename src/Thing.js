import React, { Component } from 'react';
import './Thing.css';
import Basket from './Basket';

class Thing extends Component {
    constructor() {
        super();
        this.state = {
            county: '',
            takeHomePay: 0,
            contribution: 0,
            tax: 0
        };
    }

    componentWillMount(){
        this._takeHomePay();
        this._fetchLocalArea();        
    }

    _fetchLocalArea() {
        const main = this;
        fetch("https://api.postcodes.io/postcodes/"+ this.props.userInfo.userPostcode)
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                main.setState({county: data.result.admin_district})
            })
    }

    _takeHomePay() {
        var tc = require('./taxCalc');
        let salary = this.props.userInfo.userSalary;
        let monthly = (tc.afterTax(salary)/12).toFixed(2);
        let tax = tc.incomeTax(salary)
        let contribution = tc.natIns(salary)
        this.setState({ takeHomePay: monthly, tax: tax, contribution: contribution });
    }

    render() {
        return (
            <div className="Thing">
                <ul>
                    <li>Hello {this.props.userInfo.userName}!</li>

                    <li>Let's learn some things about you</li>
                    
                    <li>Your monthly take home pay is £{this.state.takeHomePay}</li>
                    
                    <li>Your annual income tax bill is £{this.state.tax}</li>
                    
                    <li>Your National Insurance contributions total £{this.state.contribution.toFixed(2)}</li>
                    
                    <li>You live in {this.state.county}</li>
                </ul>
            </div>
        )
    }
}

export default Thing;