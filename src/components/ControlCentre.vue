<template>
  <div class="c-control-centre">
    <button name="startAgain" @click="reset">
      Start Again
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    reset() {
      this.$store.dispatch('defineUser', {
        username: 'Alex',
        salary: 15600,
        postcode: 'CF243AA'
      })
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.c-control-centre {
  margin: 20px;
  padding: 20px;
  text-align: center;
}

.c-control-centre button {
  border: 0.5px rgba(250, 250, 250, 1) solid;
  border-radius: 2px;
  box-shadow: 2px 4px 4px 2px rgba(0, 0, 0, 0.1);
  padding: 5px;
  background: rgba(250, 250, 250, 0.6);
  font-size: 16px;
}
</style>
