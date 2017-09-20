import React, {Component} from 'react';
import { extent } from 'd3-array';
import { json } from 'd3-request';
import Vis from './Vis';
import Explainer from './Explainer'

class LocalArea extends Component {
    constructor() {
        super()
        this.state = {
            area_name: undefined,
            area_code: undefined,
            house_prices: undefined,
            higher: false,
            lower: false,
            average_house_price: undefined,
            average_house_price_string: undefined
        }
    }

    async componentWillMount() {
        const main = this;
        const req = await fetch("https://api.postcodes.io/postcodes/"+ this.props.postcode);
        const response = await req.json();
        this.setState({area_name: response.result.admin_district, area_code: response.result.codes.admin_district });

    }

    getHousePrice(houseprice) {
        this.setState({average_house_price: houseprice, average_house_price_string: houseprice.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")})
    }

    calculateMortgage() {
        
        var P = this.state.average_house_price - (this.state.average_house_price*0.15);
        var n = 25 * 12;
        var i = 39/12000;
        var M = (P * i * (Math.pow(1+i, n)) / (Math.pow(1 + i, n) - 1)).toFixed(2);
        return M;
    }

    higherOrLower(val1, val2) {
        val1 > val2 ? this.setState({higher: true}) : this.setState({lower: true})
    }

    render() {
        return (
            <div className="LocalArea">
                <div>
                    <h2>40% of your monthly income is £{(this.props.takeHomePay * 0.4).toFixed(2)}</h2>
                    <p>Making average rents in xx postodes unaffordable</p>
                    <h3>Without the help of others</h3>
                    <h3>Average household income is considerably higher than for individuals</h3>
                    <table>
                        <tbody>
                        <tr>
                            <td>£21,136<br/>for individuals</td>
                            <td>£32,247<br/>for households</td>
                        </tr>
                        </tbody>
                    </table>
                    <p>based on data from the ONS showing average weekly earnings of £505 (minus income tax and national insurance), and ONS figures for disposable household income.</p>
                    <a href="https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/articles/averageweeklyearningsbonuspaymentsingreatbritain/2015-08-26" target="_blank"><p>Source 1</p></a>
                    <a href="https://www.ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/incomeandwealth/datasets/nowcastinghouseholdincomeintheuk" target="_blank"><p>Source 2</p></a>
                </div>
                <div>
                {(this.state.area_code === undefined) ?
                    null 
                    :
                    <div>
                        <div className="banner">
                            <h4>You live in <span className="highlight">{this.state.area_name}</span>.</h4>
                            <h3>House prices in your area are <span className="highlight">{this.state.higher == true ? 'higher' : 'lower' }</span> than the national average</h3>
                        </div>
                        <Vis area_code={this.state.area_code} higherOrLower ={this.higherOrLower.bind(this)} getHousePrice={this.getHousePrice.bind(this)}/>
                        <h3>Average house price of £{this.state.average_house_price_string}</h3>
                        <p>Typical mortgage repayment of £{this.calculateMortgage()} based on a loan of 85% and interest of 3.9% over 25 years</p>
                        <a href="https://www.gov.uk/government/statistical-data-sets/uk-house-price-index-data-downloads-july-2017?utm_medium=ONS&utm_source=report_page&utm_campaign=data_downloads&utm_term=9.30_12_09_17&utm_content=download_the_data" target="_blank"><p>Source</p></a>
                    </div>
                }
                </div>
                <Explainer>
                    <a href="rents-map.html" className="highlight" target="_blank">See average rents for your area and across the UK...</a>
                </Explainer>

            </div>
        )
    }
}

export default LocalArea;