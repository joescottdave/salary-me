import React, { Component } from 'react'
import Card from './Card'
import './Welcome.css'

// import ScrollAnimation from 'react-animate-on-scroll';

class Welcome extends Component {
  render() {
    return (
      <Card>
        <div className="Welcome">
          <h2 className="splash">
            Welcome to your dashboard, {this.props.name}
          </h2>
          <p>
            This dashboard was inspired during the 2017 UK General Election,
            when the Shadow Chancellor John McDonnell brandishing the pay slip
            of a striking cleaner at a central London hospital, in an interview
            on 16 July 2017 with the BBC's Andrew Marr, challenged his incumbent
            rival, Chancellor Philip Hammond, with the question "Could you live
            on that?"
          </p>
          <p>
            According to his released tax return McDonnell earns £61,575 from
            his salary as an MP. This may have increased since MPs received a
            pay rise of more than 10% (although many refused it). Philip Hammond
            earns a reported £141,505 from his combined salary as an MP and as
            Chancellor. Of course from published details of pay the BBC earlier
            this year we know that Andrew Marr's salary of over £400,000 dwarfs
            both.
          </p>
          <p>
            And the cleaner..? Just £297 a week, roughly 40 hours on the
            National Living Wage.
          </p>
          <p>
            McDonnell decried that the median rent in London was £1500, more
            than a month's pay for the cleaner.
          </p>
          <p>So how does this work? And where do you fit in?</p>
          <p>
            Below we look at your income, your tax contributions, inflation, and
            housing costs in your area, and try to place them in a wider
            context.
          </p>
        </div>
      </Card>
    )
  }
}

export default Welcome
