<template>
  <div class="background">
    <div class="search">
      <form v-on:submit.prevent>
        <input type="text" v-model="target" v-on:keyup.enter="changeTarget()" placeholder="Wpisz ulicę aby zawężyć wyszukiwanie w mieście Toruń" class="filter-input" />
      </form>
  
      <div class="filter-view">
        <pictogram-filter :update="updateFilters"></pictogram-filter>
        <minor-filters :update="updateFilters"></minor-filters>
      </div>
    </div>
    <div id="map"></div>
  </div>
</template>
<script>


import PictogramFilter from '../filters/PictogramFilter.vue'
import MinorFilters from '../filters/MinorFilters.vue'

export default {
  components: {
    pictogramFilter: PictogramFilter,
    minorFilters: MinorFilters
  },
  data() {
    var API_PATH = 'https://t2tc.maciekmm.net/';

    var request = new XMLHttpRequest();
    request.open("GET", API_PATH, false);
    request.send(null)
    var markers = JSON.parse(request.responseText);
    // pictograms
    request.open("GET", API_PATH + 'pictograms', false);
    request.send(null);
    var pictograms = JSON.parse(request.responseText);
    console.log(pictograms)
    return {
      target: 'Toruń',
      pictograms: pictograms,
      markers: markers
    }
  },
  mounted: function () {
    this.initMap();
    this.populateMarkers();
  },
  methods: {
    updateFilters: function (filter) {
      for (let marker of this.markers) {
        let visible = true
        for (let filter of this.$children) {
          if (!filter.matches(marker)) {
            visible = false
            break;
          }
        }
        if (visible) {
          marker.marker.setMap(this.map);
        } else {
          marker.marker.setMap(null);
        }
      }
    },
    initMap: function () {
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 53.0200, lng: 18.6090 },
        scrollwheel: false,
        zoom: 13
      })
    },
    populateMarkers: function () {
      var infowindow;
      var pict = this.pictograms;
      for (var i = 0; i < this.markers.length; i++) {
        var data = this.markers[i];
        var latLng = new google.maps.LatLng(data.latitude, data.longitude);

        var marker = new google.maps.Marker({
          position: latLng,
          map: this.map,
          clickable: true,
          title: data.name,
          data: data
        });
        this.markers[i].marker = marker;

        var b = this.map
        google.maps.event.addListener(marker, 'click', function () {
          var info = this
          b.panTo(this.position);
          if (infowindow)
            infowindow.close();

          var contentString = "<strong>" + info.title + "</strong><br/><table><tr><td class=''>Wejście do budynku</td><td class=''>Transport</td></tr>";
          console.log(info.data)
          contentString = "</table>";
          for (var i = 0; i < Object.keys(info.data.pictograms).length; i++) { // never do dis
            //if(pict[i] != undefined)
            console.log(info.data.pictograms[i])
            contentString += "<i>" + pict[info.data.pictograms[i]] + "</i><br/>";
          }

          infowindow = new google.maps.InfoWindow({
            content: contentString
          });
          infowindow.open(b, this);
        })
      }
    },
    changeTarget: function () {
      var t = 'Toruń, ' + this.target + ', Polska';
      var geocoder = new google.maps.Geocoder();
      var b = this.map;
      geocoder.geocode({ 'address': t }, function (results, status) {
        if (status === 'OK') {
          b.panTo(results[0].geometry.location);
          b.setZoom(15)
        }
      })
    }
  },
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

.search {
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

.filter-view {
  height: 100%;
  width: auto;
  display: block;
  background: #fff;
}
</style>