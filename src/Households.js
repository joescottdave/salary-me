import React, { Component } from 'react'
import Card from './Card'
import Source from './Source'

class Households extends Component {
  compareRent(amount) {
    if (amount > 1509) {
      return '10%'
    } else if (amount > 1197) {
      return '20%'
    } else if (amount > 1012) {
      return '30%'
    } else if (amount > 877) {
      return '40%'
    } else if (amount > 762) {
      return '50%'
    } else if (amount > 690) {
      return '60%'
    } else if (amount > 613) {
      return '70%'
    } else if (amount > 546) {
      return '80%'
    } else if (amount > 490) {
      return '90%'
    } else {
      return '100%'
    }
  }

  render() {
    return (
      <Card>
        <h2>
          40% of your monthly income is £
          {(this.props.takeHomePay * 0.4).toFixed(2)}
        </h2>

        <h3>
          This is lower than the average rent in{' '}
          {this.compareRent((this.props.takeHomePay * 0.4).toFixed(0))} of
          postcode districts we analysed.
        </h3>
        <h2>
          Average household income is considerably higher than for individuals.
          Living with others might make your bills more affordable.
        </h2>
        <table className="indiv-house-comparison">
          <tbody>
            <tr>
              <td>
                <span className="highlight">£21,136</span>
                <br />
                for individuals
              </td>
              <td>
                <span className="highlight">£32,247</span>
                <br />
                for households
              </td>
            </tr>
          </tbody>
        </table>
        <Source href="https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/articles/averageweeklyearningsbonuspaymentsingreatbritain/2015-08-26" />
        <Source href="https://www.ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/incomeandwealth/datasets/nowcastinghouseholdincomeintheuk" />
      </Card>
    )
  }
}

export default Households
