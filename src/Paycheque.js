import React, { Component } from 'react';

class Paycheque extends Component {
    render() {
        return (
            <div className="Paycheque">
                <h2>Let's look at your income and contributions</h2>
                <ul>
                <li>On an annual salary of £{this.props.salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</li>
                <li>You pay £{this.props.tax} in income tax</li>
                <li>and make national insurance contributions of £{this.props.contribution.toFixed(2)}</li>
                <li>leaving you with £{this.props.takeHomePay} a month!</li>
                </ul>
            </div>
        )
    }
}

export default Paycheque;