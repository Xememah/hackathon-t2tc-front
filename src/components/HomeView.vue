<template>
  <div>
    <div class="select-header">Wybierz miasto</div>
    <form>
      <select v-model="city">
        <option v-for="city in cities" :value="city">{{ city }}</option>
      </select>
      <div class="confirmation">
        <button @click.prevent="selectCity()">Wyszukaj</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      city: "Wrocław",
      cities: ["Toruń", "Wrocław"]
    }
  },
  methods: {
    selectCity() {
      this.$router.push({ name: 'map', params: {city: this.city, test:"test"} })
    }
  }
}
</script>
<style lang="scss" scoped>
  .select-header {
    font-size: 1.3em;
    margin: 1em;
  }
  select {
    border: none;
    font-size: 2em;
  }
</style>