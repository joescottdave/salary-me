import React, { Component } from 'react';
import Basket from './Basket';
import BasketVis from './BasketVis';
import Card from './Card';
import Explainer from './Explainer';
import Source from './Source';

import ScrollAnimation from 'react-animate-on-scroll';

class Inflation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            salary: props.salary,
            monthly: props.takeHomePay,
            inflation: 2.9,
            raise: 0,
            iPhoneX: false
        }
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

    calculateRaise() {
        var raise = (this.state.salary * (this.state.inflation/100)).toFixed(2)
        if (raise >= 999) {
            this.setState({ iPhoneX: true})
        }
        return raise;
    }

    componentWillMount() {
        this.setState({raise: this.calculateRaise()})
    }

    render() {
        return (
            <div>
                <Card>
                    <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
                        <h2>Current rate of inflation in the UK:</h2>
                    </ScrollAnimation>
                    <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
                        <h2><strong className="highlight">{this.state.inflation}%</strong></h2>
                    </ScrollAnimation>
                    <Source href="https://www.ons.gov.uk/economy/inflationandpriceindices/bulletins/consumerpriceinflation/aug2017" />
                    <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
                        <h2>At this rate you will need a pay rise of <span className="highlight">£{this.state.raise}</span> this year</h2>
                    </ScrollAnimation>
                    {(this.calculateiPhone() === null) ? null :
                    <div>
                    <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
                        <h3>Enough to buy you an {this.calculateiPhone().replace('-',' ')}</h3>
                    </ScrollAnimation> 
                        <div>                
                            <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
                                <img src={"./img/" + this.calculateiPhone() + '.png'} height="288px" className="iphone" />
                            </ScrollAnimation>
                            <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
                                { this.state.iPhoneX ? 
                                    <h3>Wouldn't that be nice?</h3>
                                    :
                                    <h3>Sorry, no iPhone X for you.</h3>
                                    }
                            </ScrollAnimation>
                            <ScrollAnimation animateIn="bounceIn">
                            {this.state.iPhoneX ? null : <img src="./img/No-iPhone-X.jpg" height="288px" className="iphone"/>}
                            </ScrollAnimation>
                        </div>
                        </div>}
                    <Source href="https://www.apple.com/uk/iphone/" />
                </Card>
                <Card>
                    <Basket monthly={this.state.monthly} />
                    <BasketVis />
                    <Explainer>
                        <p>CPIH is a measure of consumer inflation not yet recognised as a national statistic, but unlike CPI it takes into account the costs associated with owning and occupying your home.</p>
                        <p>Purchases are categorised into one of twelve categories and their significance is weighted according to the proportion of consumer spending that falls into the corresponding category.</p>
                    </Explainer>
                </Card>
            </div>
        )
    }
}

export default Inflation;