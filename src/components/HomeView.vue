<template>
  <div>
    <div class="select-header">Wybierz miasto</div>
    <form>
      <select>
        <option v-for="city in cities">{{ city }}</option>
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
      cities: ['Gdańsk', 'Toruń']
    }
  },
  methods: {
    selectCity() {
      this.$router.push({ name: 'map' })
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