import React from 'react'
import IncomesVis from './IncomesVis'
import Card from './Card'
import Explainer from './Explainer'
import Source from './Source'

class Incomes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      takehome: +props.takehome * 12,
      salary: props.salary,
      percentile: ''
    }
  }

  handleIncomeInfo(info) {
    var a = info % 10,
      b = info % 100
    if (a == 1 && b != 11) {
      return this.setState({ percentile: info + 'st' })
    }
    if (a == 2 && b != 12) {
      return this.setState({ percentile: info + 'nd' })
    }
    if (a == 3 && b != 13) {
      return this.setState({ percentile: info + 'rd' })
    }
    return this.setState({ percentile: info + 'th' })
  }

  render() {
    return (
      <div className="Incomes" ref="canvas">
        <Card>
          <div className="banner">
            <h3>
              <span className="highlight">
                Your salary of £
                {this.state.salary
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                places you in the{' '}
                {this.state.percentile > 3
                  ? this.state.percentile.toString() + 'th'
                  : this.state.percentile}{' '}
                percentile for income taxpayers
              </span>
            </h3>
            {this.state.percentile >= 25 && this.state.percentile < 50 ? (
              <p>
                You might be surprised to find that you earn more than a{' '}
                <strong>quarter</strong> of all income taxpayers.
                <br />
                That's 7.5 million workers.
              </p>
            ) : null}
            {this.state.percentile >= 50 ? (
              <p>
                You might be suprised to find that you earn more than{' '}
                <strong>half</strong> of all income taxpayers.
              </p>
            ) : null}
          </div>

          <IncomesVis
            salary={this.props.salary}
            handleIncomeInfo={this.handleIncomeInfo.bind(this)}
          />
          <Source href="https://www.gov.uk/government/statistics/percentile-points-from-1-to-99-for-total-income-before-and-after-tax" />
          <Explainer>
            <p>
              Your income projected onto percentile data for the tax year
              2014-15
            </p>
            <p>
              Figures given here are the current starting salaries for a newly
              qualified nurse and junior doctor. The Prime Minister's salary is
              subject to entitlement rules and personal choices on the part of
              the recipient. Theresa May will draw £150,402 in her first year as
              PM.
            </p>
            <p>
              The National Living Wage of £7.50 as of April 2017, will yield a
              salary of £13,650 for anyone working 35 hours a week.
            </p>
            <p>
              Basic Allowances have changed since this data was collected and
              people in the first six percentiles would no longer be eligible to
              pay any income tax
            </p>
            <p>
              The top 1% of income taxpayers have an essentially unbounded range
              of income. What we can say for sure is that they earn more
              £162,000. But the true upper limit is unknowable from official
              data.
            </p>
          </Explainer>
        </Card>
      </div>
    )
  }
}

export default Incomes
