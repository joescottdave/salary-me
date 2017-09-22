import React, { Component } from 'react';
import Card from './Card';
import Source from './Source';

class Households extends Component {
    render() {
        return (
            <Card>
                    <h2>40% of your monthly income is £{(this.props.takeHomePay * 0.4).toFixed(2)}</h2>
                    
                    <h3>Making average rents in xx postodes unaffordable
                    <br/>Without the help of others</h3>
                    <h2>Average household income is considerably higher than for individuals</h2>
                    <table className="indiv-house-comparison">
                        <tbody>
                        <tr>
                            <td><span className="highlight">£21,136</span><br/>for individuals</td>
                            <td><span className="highlight">£32,247</span><br/>for households</td>
                        </tr>
                        </tbody>
                    </table>
                    <Source href="https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/articles/averageweeklyearningsbonuspaymentsingreatbritain/2015-08-26" />
                    <Source href="https://www.ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/incomeandwealth/datasets/nowcastinghouseholdincomeintheuk" />
            </Card>
        )
    }
}

export default Households;