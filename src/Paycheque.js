import React, { Component } from 'react';

class Paycheque extends Component {
    render() {
        return (
            <div className="Paycheque">
                <ul>
                <li>Your monthly take home pay is £{this.props.takeHomePay}</li>
                <li>Your annual income tax total is £{this.props.tax}</li>
                <li>Your National Insurance contributions for the year total £{this.props.contribution.toFixed(2)}</li>
                </ul>
            </div>
        )
    }
}

export default Paycheque;