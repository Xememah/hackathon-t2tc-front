<template>
  <div class="background">
    <div id="map"></div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        points: [
          {lat: 53.01455, lng: 18.569830799999977},
          {lat: 53.0112008, lng: 18.608547199999975}
        ]
      }
    },
    mounted: function() {
      this.initMap();
      this.populateMarkers();
    },
    methods: {
      initMap: function() {
        this.map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 53.0200, lng: 18.6090},
        scrollwheel: false,
        zoom: 10
        })
      },
      populateMarkers: function() {
        for (var i = 0; i < this.points.length; i++) {
          var latLng = new google.maps.LatLng(this.points[i].lat, this.points[i].lng);
          var marker = new google.maps.Marker({
            position: latLng,
            map: this.map
          });
        }
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