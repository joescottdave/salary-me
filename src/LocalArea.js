import React, { Component } from 'react'
import { extent } from 'd3-array'
import { json } from 'd3-request'
import Vis from './Vis'
import Households from './Households'
import Card from './Card'
import Source from './Source.js'
import './LocalArea.css'

class LocalArea extends Component {
  constructor() {
    super()
    this.state = {
      area_name: undefined,
      area_code: undefined,
      house_prices: undefined,
      higher: false,
      lower: false,
      average_rent: undefined,
      average_rent_uk: 936.05,
      average_house_price: undefined,
      average_house_price_string: undefined
    }
  }

  async componentWillMount() {
    const main = this
    const req = await fetch(
      'https://api.postcodes.io/postcodes/' + this.props.postcode
    )
    const response = await req.json()
    this.setState({
      area_name: response.result.admin_district,
      area_code: response.result.codes.admin_district
    })
  }

  getHousePrice(houseprice) {
    this.setState({
      average_house_price: houseprice,
      average_house_price_string: houseprice
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    })
  }

  calculateMortgage() {
    var P =
      this.state.average_house_price - this.state.average_house_price * 0.15
    var n = 25 * 12
    var i = 39 / 12000
    var M = ((P * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1)).toFixed(2)
    return M
  }

  higherOrLower(val1, val2) {
    val1 > val2
      ? this.setState({ higher: true })
      : this.setState({ lower: true })
  }

  getAvgRent(avg_rent) {
    this.setState({ average_rent: avg_rent.toFixed(2) })
  }

  render() {
    return (
      <Card>
        {this.state.area_code === undefined ? (
          <div className="LocalArea">
            <p>&nbsp;</p>
          </div>
        ) : (
          <div className="LocalArea">
            <div className="banner">
              <h4>
                You live in{' '}
                <span className="highlight">{this.state.area_name}</span>.
              </h4>
              <h3>
                House prices in your area are{' '}
                <span className="highlight">
                  {this.state.higher == true ? 'higher' : 'lower'}
                </span>{' '}
                than the national average
              </h3>
            </div>
            <Vis
              area_code={this.state.area_code}
              postcode={this.props.postcode}
              higherOrLower={this.higherOrLower.bind(this)}
              getHousePrice={this.getHousePrice.bind(this)}
              getAvgRent={this.getAvgRent.bind(this)}
            />

            <h3>
              Average house price of £{this.state.average_house_price_string}
            </h3>
            <p>
              Typical mortgage repayment of £{this.calculateMortgage()} based on
              a loan of 85% and interest of 3.9% over 25 years
            </p>
            <p>
              Compared to an average rent of £{this.state.average_rent} in{' '}
              {this.state.area_name}
            </p>
            <p>
              {this.state.average_rent < this.state.average_rent_uk
                ? 'Lower'
                : 'Higher'}{' '}
              than the UK average of £{this.state.average_rent_uk}
            </p>
            <Source href="https://www.gov.uk/government/statistical-data-sets/uk-house-price-index-data-downloads-july-2017?utm_medium=ONS&utm_source=report_page&utm_campaign=data_downloads&utm_term=9.30_12_09_17&utm_content=download_the_data" />
          </div>
        )}
      </Card>
    )
  }
}

export default LocalArea
