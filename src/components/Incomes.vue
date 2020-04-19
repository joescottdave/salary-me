<template>
  <div class="incomes">
    <div class="c-content-card">
    <div class="banner">
      <h3>
        <span class="highlight">
          Your salary of £{{salaryString}} puts you in the
          {{percentile}} percentile for income taxpayers
        </span>
      </h3>
      <p v-if="percentile >= 25">
        You might be surprised to find that you earn more than a
        <strong>quarter</strong> of all income taxpayers.
        <br />
        That's 7.5 million workers.
      </p>
      <p v-else-if="percentile >=50 ">
        You might be suprised to find that you earn more than
        <strong>half</strong> of all income taxpayers.
      </p>
    </div>

    <!-- TODO <IncomesVis
      salary="{this.props.salary}"
      handleIncomeInfo="{this.handleIncomeInfo.bind(this)}"
    /> -->
    <!-- TODO <Source
      href="https://www.gov.uk/government/statistics/percentile-points-from-1-to-99-for-total-income-before-and-after-tax"
    /> -->
    <details>
      <summary> Explain this graphic... </summary>
      <p>
        Your income projected onto percentile data for the tax year 2014-15
      </p>
      <p>
        Figures given here are the current starting salaries for a newly
        qualified nurse and junior doctor. The Prime Minister's salary is
        subject to entitlement rules and personal choices on the part of the
        recipient. Theresa May will draw £150,402 in her first year as PM.
      </p>
      <p>
        The National Living Wage of £7.50 as of April 2017, will yield a salary
        of £13,650 for anyone working 35 hours a week.
      </p>
      <p>
        Basic Allowances have changed since this data was collected and people
        in the first six percentiles would no longer be eligible to pay any
        income tax
      </p>
      <p>
        The top 1% of income taxpayers have an essentially unbounded range of
        income. What we can say for sure is that they earn more £162,000. But
        the true upper limit is unknowable from official data.
      </p>
    </details>
  </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      // TODO Calculate percentiles
      percentile: 1
    }
  },

  computed: {
    ...mapGetters(['salaryString'])
  }
}
</script>