import React, { Component } from 'react'
import Basket from './Basket'
import BasketVis from './BasketVis'
import Card from './Card'
import Explainer from './Explainer'
import Source from './Source'

import ScrollAnimation from 'react-animate-on-scroll'

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
      return 'iPhone-X'
    } else if (this.state.raise > 799) {
      return 'iPhone-8-Plus'
    } else if (this.state.raise > 699) {
      return 'iPhone-8'
    } else if (this.state.raise > 669) {
      return 'iPhone-7-Plus'
    } else if (this.state.raise > 549) {
      return 'iPhone-7'
    } else if (this.state.raise > 449) {
      return 'iPhone-6S'
    } else if (this.state.raise > 349) {
      return 'iPhone-SE'
    } else {
      return null
    }
  }

  calculateRaise() {
    var raise = (this.state.salary * (this.state.inflation / 100)).toFixed(2)
    if (raise >= 999) {
      this.setState({ iPhoneX: true })
    }
    return raise
  }

  componentWillMount() {
    this.setState({ raise: this.calculateRaise() })
  }

  render() {
    return (
      <div>
        <Card>
          <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
            <h2>Current rate of inflation in the UK:</h2>
          </ScrollAnimation>
          <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
            <h2>
              <strong className="highlight">{this.state.inflation}%</strong>
            </h2>
          </ScrollAnimation>
          <Source href="https://www.ons.gov.uk/economy/inflationandpriceindices/bulletins/consumerpriceinflation/aug2017" />
          <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
            <h2>
              At this rate you will need a pay rise of{' '}
              <span className="highlight">£{this.state.raise}</span> this year
            </h2>
          </ScrollAnimation>
          {this.calculateiPhone() === null ? null : (
            <div>
              <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
                <h3>
                  Enough to buy you an{' '}
                  {this.calculateiPhone().replace('-', ' ')}
                </h3>
              </ScrollAnimation>
              <div>
                <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
                  <img
                    src={'./img/' + this.calculateiPhone() + '.png'}
                    height="288px"
                    className="iphone"
                  />
                </ScrollAnimation>
                <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
                  {this.state.iPhoneX ? (
                    <h3>Wouldn't that be nice?</h3>
                  ) : (
                    <h3>Sorry, no iPhone X for you.</h3>
                  )}
                </ScrollAnimation>
                <ScrollAnimation animateIn="bounceIn">
                  {this.state.iPhoneX ? null : (
                    <img
                      src="./img/No-iPhone-X.jpg"
                      height="288px"
                      className="iphone"
                    />
                  )}
                </ScrollAnimation>
              </div>
            </div>
          )}
          <Source href="https://www.apple.com/uk/iphone/" />
        </Card>
        <Card>
          <h2>Inflation</h2>
          <p>
            Inflation in the UK has had a tumultuous period following the
            2007/08 financial crisis. At times running over 4%, others it has
            flirted with falling below zero, and despite steadying more
            recently, the falling price of the pound since the EU referendum has
            sent prices climbing again.
          </p>
          <p>
            The UK’s trade deficit with the rest of the world is very high and
            this makes our consumption vulnerable to drops in our currency.
          </p>
          <p>
            Exporters have according to the Office for National Statistics
            hoarded the benefits of a weaker pound and by increasing prices and
            not output, prospectively insuring themselves against future shocks
          </p>
          <p>
            Low income workers have been shown to pay a higher proportion of
            their income in tax than their fellow citizens at the top end of the
            pay scale.
          </p>
          <p>
            This is because of the effect of flat taxes like VAT and Council
            Tax. Council Tax can be as high as an additional 10% tax for the
            lowest paid.
          </p>
          <p>
            Because low income people must spend more of their income to live,
            as opposed to saving and investing, they also see more of their
            income taken in the form of VAT.
          </p>
          <p>
            Although there are VAT exemptions for many necessities, some items
            such as tampons have been controversially overlooked by our
            predominantly male legislators.
          </p>
          <p>
            CPIH is not yet an official statistic and attempts to account for
            the effect of housing on inflation, including rising council tax
            charges, energy bills, and building insurance.
          </p>
          <p>
            Nevertheless the current CPIH rate of 2.7% is lower than its sibling
            CPI of 2.9%
          </p>
          <p>
            The older and increasing deprecated RPI measure reports inflation of
            3.9%, this figure is currently preferred by those negotiating for
            pay increases.
          </p>
          <p>
            Public sector workers and their union representatives looking for
            back pay have preferred the higher RPI measure.
          </p>
          <a className="highlight" href="./article-2.html" target="_blank">
            Read more about price rises and the iPhone...
          </a>
        </Card>
        <Card>
          <Basket monthly={this.state.monthly} />
          <BasketVis />
          <Explainer>
            <p>
              CPIH is a measure of consumer inflation not yet recognised as a
              national statistic, but unlike CPI it takes into account the costs
              associated with owning and occupying your home.
            </p>
            <p>
              Purchases are categorised into one of twelve categories and their
              significance is weighted according to the proportion of consumer
              spending that falls into the corresponding category.
            </p>
          </Explainer>
        </Card>
      </div>
    )
  }
}

export default Inflation
