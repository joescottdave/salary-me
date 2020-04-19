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
      this.$store.dispatch('defineUser', {
        username: this.username,
        salary: this.userSalary,
        postcode: this.userPostcode
      })

      this.$router.push('/main')
    },

    skipForm() {
      this.$router.push('/main')
    }
  }
}
</script>

<style>
.c-user-form input,
.c-user-form button {
  padding: 1rem;
  margin: 0.5rem;
  font-size: 20px;
  box-sizing: border-box;
  border: 0.5px silver solid;
  background: rgba(255, 255, 255, 0.2);
}

.c-user-form input:focus {
  border: 0.5px slategray solid;
}
</style>
