import React, { Component } from 'react';
import Explainer from './Explainer.js';
import BasketVis from './BasketVis.js';

class Basket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            monthly: props.takeHomePay
        }
    }

    render() {
        let payCheque = this.state.monthly
        const cpih_weight = {
            food: 8.1,
            alcohol: 3.4,
            clothing: 5.8,
            housing: 29.4,
            furniture: 4.9,
            health: 2.1,
            transport: 12.6,
            comms: 2.1,
            recreation: 12.1,
            education: 1.7,
            restaurants: 10.1,
            misc: 7.7
        }

        return (
            <div className="Basket">
                <h2>Basket of Goods</h2>
                <h3>How much you have to spend... (CPIH Weighting)</h3>
                <ol>
                    <li>Food: £{((payCheque/100) * cpih_weight.food).toFixed(2)}</li>
                    <li>Alcohol: £{((payCheque/100) * cpih_weight.alcohol).toFixed(2)}</li>
                    <li>Clothing: £{((payCheque/100) * cpih_weight.clothing).toFixed(2)}</li>
                    <li>Housing: £{((payCheque/100) * cpih_weight.housing).toFixed(2)}</li>
                    <li>Furniture: £{((payCheque/100) * cpih_weight.furniture).toFixed(2)}</li>
                    <li>Health: £{((payCheque/100) * cpih_weight.health).toFixed(2)}</li>
                    <li>Transport: £{((payCheque/100) * cpih_weight.transport).toFixed(2)}</li>
                    <li>Communication: £{((payCheque/100) * cpih_weight.comms).toFixed(2)}</li>
                    <li>Recreation: £{((payCheque/100) * cpih_weight.recreation).toFixed(2)}</li>
                    <li>Education: £{((payCheque/100) * cpih_weight.education).toFixed(2)}</li>
                    <li>Restaurants: £{((payCheque/100) * cpih_weight.restaurants).toFixed(2)}</li>
                    <li>Misc: £{((payCheque/100) * cpih_weight.misc).toFixed(2)}</li>
                </ol>
                <BasketVis />
                <Explainer>
                    <p>CPIH is a measure of consumer inflation not yet recognised as a national statistic, but unlike CPI it takes into account the costs associated with owning and occupying your home.</p>
                    <p>Purchases are categorised into one of twelve categories and their significance is weighted according to the proportion of consumer spending that falls into the corresponding category.</p>
                </Explainer>
            </div>
        )
    }
}

export default Basket;