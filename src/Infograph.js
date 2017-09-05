import React, { Component } from 'react';
import Welcome from './Welcome';
import Paycheque from './Paycheque';
import ControlCenter from './ControlCenter';
import Basket from './Basket';
import LocalArea from './LocalArea';
import Incomes from './Incomes';


class Infograph extends Component {
    constructor(props){
        super(props);
        this.state = {
            takeHomePay: 0,
            tax: 0,
            contribution: 0
        },
        this.handleReset = this.handleReset.bind(this);
    }

    _takeHomePay() {
        var tc = require('./taxCalc');
        let salary = this.props.userInfo.userSalary;
        let monthly = (tc.afterTax(salary)/12).toFixed(2);
        let tax = tc.incomeTax(salary)
        let contribution = tc.natIns(salary)
        this.setState({ takeHomePay: monthly, tax: tax, contribution: contribution });
    }

    componentWillMount() {
        this._takeHomePay();
    }

    handleReset() {
        this.props.handleReset();
    }

    render() {
        return (
            <div className="Infograph">
                <Welcome name={this.props.userInfo.userName} />
                <Paycheque takeHomePay={this.state.takeHomePay}
                tax={this.state.tax}
                contribution = {this.state.contribution}
                />
                <Incomes monthly={this.state.takeHomePay}/>
                <Basket takeHomePay = {this.state.takeHomePay} />
                <LocalArea postcode={this.props.userInfo.userPostcode} />
                <ControlCenter handleReset={this.handleReset}/>
            </div>
        )
    }
}

export default Infograph;