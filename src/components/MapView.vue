<template>
  <div class="background">
    <div id="map"></div>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    mounted: function() {
      this.initMap();
    },
    methods: {
      initMap: function() {
        this.map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 53.0200, lng: 18.6090},
        scrollwheel: false,
        zoom: 10
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .background {
    background-color: pink;
    height: calc(100% - 100px);
  }
  #map {
    width: 100%;
    height: 100%;
  }
</style>