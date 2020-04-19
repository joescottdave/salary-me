<template>
  <main class="">
    <div className="Infograph">
      <section>
        <Welcome name="{this.props.userInfo.userName}" />
      </section>

      <section id="income-and-taxes">
        <div class="c-content-card">
          <h2>Paycheques</h2>
          <!-- TODO Paycheques component -->
          <p>
            A person on the national living wage will incur income tax on
            anything they work over 30 hours.
          </p>
          <p>
            The London Living Wage according to the independent Living Wage
            Foundation is currently £9.45. At this level of the striking cleaner
            could have expected an extra £77 at the end of each week.
          </p>
          <p>
            And through a combination of tax and national insurance a full-time
            worker on minimum wage will pay an effective tax rate of 11%
          </p>
          <p>
            An MP like John McDonnell will pay more in income tax than a person
            on the minimum wage will have to live on.
          </p>
          <p>
            Tax on an income the size of Andrew Marr’s will be greater than
            Philip Hammond's combined salary of roughly £140,000. His effective
            tax rate would be 43%.
          </p>
          <p>
            Calculations of marginal tax rates often account for benefits paid
            and this is where household composition affects the calculation.
          </p>
          <p>
            Married couples can claim a small additional tax-free allowance. A
            piece of “nudge” politics intended to incentivise marriage, which
            has a number of reported benefits to the couple and children in the
            household.
          </p>
          <p>
            An MP’s effective tax rate is 31% - that is if they do not work a
            second job or have other sources of income.
          </p>
          <p>
            In 2015 one in five MPs had a second job and almost a third were
            receiving income from letting properties.
          </p>
          <a className="highlight" href="./article-1.html" target="_blank">
            Read more about incomes in the UK...
          </a>
        </div>
        <!-- TODO Incomes Component -->
        <!-- TODO Taxes Component -->
        <div class="c-content-card">
          <h2>Tax Burden</h2>
          <p>
            The largest tax bills are paid by the 300,000 people who pay the
            highest rate of income tax. These taxpayers paid on average £142,000
            in 2014/15.
          </p>
          <p>
            This is the income tax that would be incurred on an income of
            £346000. If this was the average pay for this group they would have
            had a combined income of £108 billion that year.
          </p>
          <p>
            A similar calculation for basic rate taxpayers – 25 million people –
            who paid an average tax bill of £2,250 shows that together they
            earned £550 billion
          </p>
          <p>
            This means that basic rate taxpayers a group 85x larger than
            additional rate taxpayers has a combined income only 5x larger.
          </p>
          <p>
            The largest share of income tax revenue comes from those 4.3 million
            people paying the “higher” rate of tax (actually the middle rate).
            The 37% share paid by these workers just pips the 35% paid by basic
            rate taxpayers.
          </p>
        </div>
      </section>

      <section id="inflation-and-spending">
        <!-- TODO Inflation component -->
        <!-- TODO Basket component -->
      </section>

      <section id="rent-and-housing">
        <!-- TODO Households component -->
        <!-- TODO LocalArea Component -->
        <div class="c-content-card">
          <h2>Housing</h2>
          <p>
            Average house prices in the UK returned to their pre-crisis peak
            much faster than wages which are still lagging by some measures.
          </p>
          <p>
            Private rents did not skip a beat showing YoY growth throughout the
            entire crisis period. They are now 15% higher than they were in
            2011.
          </p>
          <p>
            Average council tax in the UK for a Band D property is £1591. This
            is more than one month's pay for anyone working for minimum wage.
          </p>
          <p>
            Other bands are calculated relative to the charge for a Band D
            property, either as a smaller or larger fraction of this amount.
          </p>
          <p>
            The lowest council tax in the country is in Westminster where MPs
            can expect to have their rent paid for by their second home
            allowance, to the tune of £3513 on average.
          </p>
          <p>
            The area with the highest council tax is Weymouth and Portland where
            the £1208 charge for even the cheapest property will increase the
            tax burden for the lowest paid and the striking cleaner by another
            8%
          </p>
          <p>
            There are no exemptions from council tax for the lowest paid. They
            must instead circuitously claim council tax benefit from their local
            council which is used to pay the bill. Claimants never actually
            receive this money.
          </p>
          <p>
            Average house prices in Westminster are currently £1million plus.
            Even the highest council tax charge for this area is only 0.1% of
            this value.
          </p>
          <a href="./article-3.html" className="highlight" target="_blank">
            See average rents for your area and across the UK...
          </a>
        </div>
      </section>

      <control-centre />
    </div>
  </main>
</template>

<script>
import ControlCentre from '@/components/ControlCentre.vue'
export default {
  components: {
    ControlCentre
  }
}
</script>

<style lang="scss">
.c-content-card {
  position: relative;
  background-color: rgba(255, 250, 250, 0.9);
  border: 1px solid rgba(255, 250, 250, 1);
  border-radius: 8px;
  box-shadow: 4px 4px 4px 2px rgba(0, 0, 0, 0.2),
    1px 1px 2px 0 rgba(0, 0, 0, 0.4);
  padding: 5%;
  margin: 10vh auto;
  width: 95%;
  max-width: 780px;

  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;

  @media screen and (max-width: 480px) {
    min-height: 90vh;
  }
}
</style>
