<template>
  <div class="background">
    <div class="filtering">
      <form v-on:submit.prevent>
        <input type="text" v-model="target" v-on:keyup.enter="changeTarget()" placeholder="Wpisz ulicę aby zawężyć wyszukiwanie w mieście Toruń" class="filter-input"/>
      </form>
    </div>
    <div id="map"></div>
  </div>
</template>
<script>
  export default {
    data() {
      var API_PATH = 'https://t2tc.maciekmm.net/';

      var request = new XMLHttpRequest();
      request.open("GET", API_PATH, false);
      request.send(null)
      var markers = JSON.parse(request.responseText);
      console.log(markers);

      return {
        target: 'Toruń',
        markers: markers
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
          zoom: 13
        })
      },
      populateMarkers: function() {
        for (var i = 0; i < this.markers.length; i++) {
          var data = this.markers[i];
          console.log(data)
          var latLng = new google.maps.LatLng(data.latitude, data.longitude);
          var marker = new google.maps.Marker({
            position: latLng,
            map: this.map
          });
        }
      },
      changeTarget: function() {
        var t = 'Toruń, ' + this.target + ', Polska'; 
        var geocoder = new google.maps.Geocoder();
        var b = this.map;
        geocoder.geocode({'address': t}, function(results, status) {
          if (status === 'OK') {
            b.panTo(results[0].geometry.location);
            b.setZoom(15)  
          }
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
  .filtering {
    margin-top: 0.7em;
    margin-left: 10em;
    margin-right: 2em;
    z-index: 2;
    width: calc(100% - 12em);
    position: fixed;
    border-radius: 5px;
    padding: 0.5em;
    background-color: #fff;
  }
  .filter-input {
    width: 100%;
    border-radius: 5px;
    background-color: #efefef;
    border: none;
    padding: 0.8em;
    outline: none;
  }
</style>