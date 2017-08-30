import React, { Component } from 'react';

class CPI extends Component {
    render() {
        const monthly = this.props.takeHomePay;
        const cpi_weight = {
            food: 8.3,
            alcohol: 3.3,
            clothing: 6.2,
            housing: 27.6,
            furniture: 5.1,
            health: 2.2,
            transport: 13,
            comms: 2.1,
            recreation: 12.3,
            education: 1.7,
            restaurants: 10.4,
            misc: 7.8
        }

        return (
            <div className="cpi">
                <h2>How much you have to spend... (CPI Weighting)</h2>
                <ul>
                    <li>Food: £{((monthly/100) * cpi_weight.food).toFixed(2)}</li>
                    <li>Housing: £{((monthly/100) * cpi_weight.housing).toFixed(2)}</li>
                    <li>Transport: £{((monthly/100) * cpi_weight.transport).toFixed(2)}</li>
                </ul>
            </div>
        )
    }
}

export default CPI;