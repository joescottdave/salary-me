<template>
  <div class="c-paycheque">
    <h2>Let's look at your income and contributions</h2>
    <h3>According to our tax calculator:</h3>
    <ul class="c-paycheque__list">
      <li class="c-paycheque__list-item">
        On an annual salary of £{{ salaryString }}
      </li>
      <li class="c-paycheque__list-item">
        You will pay approximately
        <span class="highlight">£{{ incomeTaxString }}</span> in income tax
      </li>
      <li class="c-paycheque__list-item">
        and make national insurance contributions of
        <span class="highlight"> £{{ nationalInsuranceString }} </span>
      </li>
      <li class="c-paycheque__list-item">
        leaving you with
        <span class="highlight">
          <strong>£{{ takeHomeString }}</strong>
        </span>
        a month!
      </li>
    </ul>
    <!-- TODO Pieviz -->
    <h2>Your effective tax rate is {{ taxEffectString }}%</h2>
  </div>
</template>

<script>
import taxCalc from '../taxCalc'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['salary', 'salaryString']),

    incomeTax() {
      return taxCalc.incomeTax(this.salary)
    },

    incomeTaxString() {
      return taxCalc.incomeTax(this.salary).toFixed(0)
    },

    nationalInsurance() {
      return taxCalc.natIns(this.salary)
    },

    nationalInsuranceString() {
      return taxCalc.natIns(this.salary).toFixed(2)
    },

    takeHome() {
      return taxCalc.afterTax(this.salary)
    },

    takeHomeString() {
      return taxCalc.afterTax(this.salary).toFixed(2)
    },

    taxEffectString() {
      return (
        ((this.incomeTax + this.nationalInsurance) / this.salary) *
        100
      ).toFixed(0)
    }
  }
}
</script>

<style>
.c-paycheque {
  align-self: top;
}

ul.c-paycheque__List {
  list-style: none;
  text-align: center;
  margin: 20px;
}

li.c-paycheque__list-item {
  margin-bottom: 20px;
}

li.c-paycheque__list-item strong {
  font-size: 1.5em;
}
</style>
