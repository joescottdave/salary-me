import React from 'react';
import Card from './Card';
import Source from './Source';

class Taxes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            salary: props.salary,
            tax: props.tax,
            contribution: props.contribution,
            basicRate: false,
            higherRate: false,
            additionalRate: false,
            incomePercents: {basic: "59%", higher: "30%", additional: "12%"},
            incomeTotals: {basic: 533, higher: 269, additional: 108},
            taxpercents: {basic: "35%", higher: "37%", additional: "28%"},
            taxtotals: {basic: 55.7, higher: 58.3, additional: 43.85 },
            taxaverages: {basic: 2250, higher: 14600, additional: 142000},
            compaverage: undefined
            // https://www.gov.uk/government/uploads/system/uploads/attachment_data/file/616447/Table_2.6.pdf
        }
    }

    componentWillMount() {
        if (this.state.salary > 150000) {
            this.setState({ additionalRate: true, compaverage: this.state.taxaverages.additional})
        } else if (this.state.salary > 45000) {
            this.setState({higherRate: true, compaverage: this.state.taxaverages.higher})
        } else {
            this.setState({basicRate: true, compaverage: this.state.taxaverages.basic})
        }
    }
    render() {
        return (
            <Card>
                <h2><span className="highlight">In 2014-15 income taxpayers in your bracket took home&nbsp; 
                {this.state.additionalRate ? this.state.incomePercents.additional : null} 
                    {this.state.higherRate ? this.state.incomePercents.higher : null}
                    {this.state.basicRate ? this.state.incomePercents.basic : null} 
                    &nbsp;of all income</span></h2>
                <h3>That's roughly £
                {this.state.additionalRate ? this.state.incomeTotals.additional : null} 
                    {this.state.higherRate ? this.state.incomeTotals.higher : null}
                    {this.state.basicRate ? this.state.incomeTotals.basic : null} 
                    &nbsp;billion</h3>
                <h2><span className="highlight">And paid&nbsp; 
                {this.state.additionalRate ? this.state.taxpercents.additional : null} 
                    {this.state.higherRate ? this.state.taxpercents.higher : null}
                    {this.state.basicRate ? this.state.taxpercents.basic : null} 
                    &nbsp;of all income tax</span></h2>
                <h3>Which is&nbsp;£
                    {this.state.additionalRate ? this.state.taxtotals.additional : null} 
                    {this.state.higherRate ? this.state.taxtotals.higher : null}
                    {this.state.basicRate ? this.state.taxtotals.basic : null}
                    &nbsp;billion</h3>
                <h3>Your income tax liability of £{this.state.tax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} is {(this.state.tax < this.state.compaverage) ? <span className="highlight">lower</span> : <span className="highlight">higher</span>} than the average payment of £{this.state.compaverage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} for this bracket.</h3>
                    <Source href="https://www.gov.uk/government/uploads/system/uploads/attachment_data/file/616447/Table_2.6.pdf" />
                    <Source href="https://www.gov.uk/government/statistics/number-of-individual-income-taxpayers-by-marginal-rate-gender-and-age" />
                    <Source href="https://www.gov.uk/government/uploads/system/uploads/attachment_data/file/616447/Table_2.6.pdf" />
            </Card>
        )
    }
} 

export default Taxes;