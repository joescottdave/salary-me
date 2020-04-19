<template>
  <form
    class="c-user-form"
    autoComplete="off"
    onSubmit="{this.onSubmit.bind(this)}"
  >
    <label>
      Name
      <input type="text" v-model="username" placeholder="Name" />
    </label>
    <br />
    <label>
      Annual Income
      <input
        type="number"
        step="none"
        v-model="userSalary"
        placeholder="Annual Income"
      />
    </label>
    <br />
    <label>
      Postcode
      <input type="text" v-model="userPostcode" placeholder="UK Postcode" />
    </label>
    <br />
    <button @click.prevent="submitForm">Submit</button>
    <button @click.prevent="skipForm">Skip</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      userSalary: '',
      userPostcode: ''
    }
  },

  methods: {
    submitForm() {
      console.log('Submit Form')
      this.$store.dispatch('defineUser', {
        username: this.username,
        salary: this.userSalary,
        postcode: this.userPostcode
      })
    },

    skipForm() {
      console.log('Skip Form')
    }
  }
}
</script>

<style></style>
