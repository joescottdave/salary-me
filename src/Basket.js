import React, { Component } from 'react';

class Basket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            monthly: props.takeHomePay
        }
    }

    render() {
        let payCheque = this.state.monthly
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
            <div className="Basket">
                <h3>Basket of Goods</h3>
                <h4>How much you have to spend... (CPI Weighting)</h4>
                <ul>
                    <li>Food: £{((payCheque/100) * cpi_weight.food).toFixed(2)}</li>
                    <li>Alcohol: £{((payCheque/100) * cpi_weight.alcohol).toFixed(2)}</li>
                    <li>Clothing: £{((payCheque/100) * cpi_weight.clothing).toFixed(2)}</li>
                    <li>Housing: £{((payCheque/100) * cpi_weight.housing).toFixed(2)}</li>
                    <li>Furniture: £{((payCheque/100) * cpi_weight.furniture).toFixed(2)}</li>
                    <li>Health: £{((payCheque/100) * cpi_weight.health).toFixed(2)}</li>
                    <li>Transport: £{((payCheque/100) * cpi_weight.transport).toFixed(2)}</li>
                    <li>Communication: £{((payCheque/100) * cpi_weight.comms).toFixed(2)}</li>
                    <li>Recreation: £{((payCheque/100) * cpi_weight.recreation).toFixed(2)}</li>
                    <li>Education: £{((payCheque/100) * cpi_weight.education).toFixed(2)}</li>
                    <li>Restaurants: £{((payCheque/100) * cpi_weight.restaurants).toFixed(2)}</li>
                    <li>Misc: £{((payCheque/100) * cpi_weight.misc).toFixed(2)}</li>
                </ul>
            </div>
        )
    }
}

export default Basket;