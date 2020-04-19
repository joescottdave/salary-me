<template>
  <div class="c-content-card">
    <h2>
      <span class="highlight">
        In 2014-15 <br />
        the&nbsp;
        <span v-if="additionalRate">
          {{ peoplePercents.additional }}
        </span>
        <span v-else-if="higherRate">
          {{ peoplePercents.higher }}
        </span>
        <span v-else>
          {{ peoplePercents.basic }}
        </span>
        &nbsp;of income taxpayers in your bracket took home&nbsp;
        <span v-if="additionalRate">
          {{ incomePercents.additional }}
        </span>
        <span v-else-if="higherRate">
          {{ incomePercents.higher }}
        </span>
        <span v-else>
          {{ incomePercents.basic }}
        </span>
        &nbsp;of all income
      </span>
    </h2>
    <h3>
      That's roughly £
      <span v-if="additionalRate">
        {{ incomeTotals.additional }}
      </span>
      <span v-else-if="higherRate">
        {{ incomeTotals.higher }}
      </span>
      <span v-else>
        {{ incomeTotals.basic }}
      </span>
      &nbsp;billion
    </h3>
    <h2 class="highlight">
      And paid&nbsp;
      <span v-if="additionalRate">
        {{ taxpercents.additional }}
      </span>
      <span v-else-if="higherRate">
        {{ taxpercents.higher }}
      </span>
      <span v-else>
        {{ taxpercents.basic }}
      </span>
      &nbsp;of all income tax
    </h2>
    <h3>
      Which is&nbsp;£
      <span v-if="additionalRate">
        {{ taxtotals.additional }}
      </span>
      <span v-else-if="higherRate">
        {{ taxtotals.higher }}
      </span>
      <span v-else>
        {{ taxtotals.basic }}
      </span>
      &nbsp;billion
    </h3>
    <!-- TODO <h3>
      Your income tax liability of £
      {this.state.tax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} is{' '}
      {this.state.tax < this.state.compaverage ? (
      <span class="highlight">lower</span>
      ) : (
      <span class="highlight">higher</span>
      )}{' '} than the average payment of £ {this.state.compaverage .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '} for this bracket.
    </h3> -->
    <!-- TODO <Source
      href="https://www.gov.uk/government/uploads/system/uploads/attachment_data/file/616447/Table_2.6.pdf"
    />
    <Source
      href="https://www.gov.uk/government/statistics/number-of-individual-income-taxpayers-by-marginal-rate-gender-and-age"
    />
    <Source
      href="https://www.gov.uk/government/uploads/system/uploads/attachment_data/file/616447/Table_2.6.pdf"
    /> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      peoplePercents: { basic: '85%', higher: '14%', additional: '1%' },
      incomePercents: { basic: '59%', higher: '30%', additional: '12%' },
      incomeTotals: { basic: 533, higher: 269, additional: 108 },
      taxpercents: { basic: '35%', higher: '37%', additional: '28%' },
      taxtotals: { basic: 55.7, higher: 58.3, additional: 43.85 },
      taxaverages: { basic: 2250, higher: 14600, additional: 142000 }
    }
  },

  computed: {
    additionalRate() {
      return this.$store.getters.salary > 150000
    },

    higherRate() {
      return this.$store.getters.salary > 45000
    },

    basicRate() {
      return this.$store.getters.salary > 11500
    }
  }
}
</script>

<style></style>
