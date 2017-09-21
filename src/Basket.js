import React, { Component } from 'react';
import Card from './Card.js';
import BasketVis from './BasketVis.js';
import './Basket.css';
import Explainer from './Explainer';

import ScrollAnimation from 'react-animate-on-scroll';

class Basket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            salary: props.salary,
            monthly: props.takeHomePay,
            inflation: 2.9,
            raise: 0,
            iPhoneX: false
        }
    }

    calculateRaise() {
        var raise = (this.state.salary * (this.state.inflation/100)).toFixed(2)
        if (raise >= 999) {
            this.setState({ iPhoneX: true})
        }
        return raise;
    }

    calculateiPhone() {
        if (this.state.raise > 999) {
            return "iPhone-X";
        } else if (this.state.raise > 799) {
            return "iPhone-8-Plus"
        } else if (this.state.raise > 699) {
            return "iPhone-8"
        } else if (this.state.raise > 669) {
            return "iPhone-7-Plus"
        } else if (this.state.raise > 549) {
            return "iPhone-7"
        } else if (this.state.raise > 449) {
            return "iPhone-6S"
        } else if (this.state.raise > 349) {
            return "iPhone-SE"
        } else {
            return null;
        }
    }

    componentWillMount() {
        this.setState({raise: this.calculateRaise()})
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
                <div>
                    <Card>
                        <h2>Current rate of inflation in the UK:</h2>
                        <h2><strong className="highlight">{this.state.inflation}%</strong></h2>
                        <h2>You will need a pay rise of <span className="highlight">£{this.state.raise}</span></h2>
                        <h3>Enough to buy you an {this.calculateiPhone().replace('-',' ')}</h3>
                        <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
                            <img src={"./img/" + this.calculateiPhone() + '.png'} height="360px" className="iphone" />
                        </ScrollAnimation>
                        <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
                        { this.state.iPhoneX ? 
                        <h3>Wouldn't that be nice?</h3>
                        :
                        <h3>Sorry, no iPhone X for you.</h3>
                        }
                        </ScrollAnimation>
                        <ScrollAnimation animateIn="bounceIn">
                        {this.state.iPhoneX ? null : <img src="./img/No-iPhone-X.jpg" height="360px" className="iphone"/>}
                        </ScrollAnimation>
                    </Card>
                    <a className="source" href="https://www.ons.gov.uk/economy/inflationandpriceindices/bulletins/consumerpriceinflation/aug2017"><p>Source 1: Inflation</p></a>
                    <a className="source" href="https://www.apple.com/uk/iphone/" target="_blank"><p>Source 2: Prices</p></a>  
                </div>
                <Card>
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
                <a href="https://www.ons.gov.uk/economy/inflationandpriceindices/datasets/w1tow3tablesannexa" target="_blank"><p>Source</p></a>
                    <Explainer>
                    <p>CPIH is a measure of consumer inflation not yet recognised as a national statistic, but unlike CPI it takes into account the costs associated with owning and occupying your home.</p>
                    <p>Purchases are categorised into one of twelve categories and their significance is weighted according to the proportion of consumer spending that falls into the corresponding category.</p>
                    </Explainer>
                    <a href="./inflation-article.html" className="highlight" target="_blank">Read more about inflation in the UK...</a>
                </Card>
            </div>
        )
    }
}

export default Basket;