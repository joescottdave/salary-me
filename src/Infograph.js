import React, { Component } from 'react';
import Welcome from './Welcome';
import Paycheque from './Paycheque';
import ControlCenter from './ControlCenter';
import Inflation from './Inflation';
import Households from './Households';
import LocalArea from './LocalArea';
import Incomes from './Incomes';
import Taxes from './Taxes';
import './Infograph.css';

import ScrollAnimation from 'react-animate-on-scroll';

class Infograph extends Component {
    constructor(props){
        super(props);
        this.state = {
            salary: props.userInfo.userSalary,
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

                <section>
                        <Welcome name={this.props.userInfo.userName} />
                </section>

                <section id="income-and-taxes">
                    <ScrollAnimation animateIn="slideInUp" animateOnce={true}>
                        <Paycheque salary={this.state.salary}
                        takeHomePay={this.state.takeHomePay}
                        tax={this.state.tax}
                        contribution = {this.state.contribution}
                        />
                    </ScrollAnimation>
                    <ScrollAnimation animateIn="fadeIn" animateOut="fadeOut">
                        <Incomes salary={this.state.salary} takehome={this.state.takehome}/>
                    </ScrollAnimation>
                    <ScrollAnimation animateIn="fadeIn" animateOut="fadeOut">
                        <Taxes salary={this.state.salary} tax={this.state.tax} contribution={this.state.contribution}/>
                    </ScrollAnimation>
                </section>

                <section id="inflation-and-spending">
                        <Inflation salary={this.state.salary} takeHomePay = {this.state.takeHomePay} />
                        {/* <Basket monthly = {this.state.takeHomePay} />
                        <BasketVis /> */}
                </section>

                <section id="rent-and-housing">
                <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
                        <Households takeHomePay = {this.state.takeHomePay}/>
                </ScrollAnimation>
                <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
                        <LocalArea takeHomePay={this.state.takeHomePay} postcode={this.props.userInfo.userPostcode} />
                </ScrollAnimation>
                </section>

                <ControlCenter handleReset={this.handleReset}/>
            </div>
        )
    }
}

export default Infograph;