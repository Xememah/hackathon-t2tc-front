<template>
  <div class="background">
    <div class="search">
      <form v-on:submit.prevent>
        <input type="text" v-model="target" v-on:keyup.enter="changeTarget()" placeholder="Wyszukaj ulicę lub obiekt" class="filter-input" />
      </form>
    </div>
    <div class="filter-button" v-on:click="sidebar = !sidebar">Filtry</div>
    <transition name="fade">
      <div class="filter-view" v-if="sidebar">
        <pictogram-filter :update="updateFilters"></pictogram-filter>
        <minor-filters :update="updateFilters"></minor-filters>
      </div>
    </transition>
    <div id="map"></div>
  </div>
</template>
<script>


import PictogramFilter from '../filters/PictogramFilter.vue'
import MinorFilters from '../filters/MinorFilters.vue'
import createTooltip from '../tooltip.js'

export default {
  components: {
    pictogramFilter: PictogramFilter,
    minorFilters: MinorFilters
  },
  data() {
    let city = this.$router.currentRoute.params.city.toLocaleLowerCase();
    var API_PATH = 'https://t2tc.maciekmm.net/?city=' + city;

    var request = new XMLHttpRequest();
    request.open("GET", API_PATH, false);
    request.send(null)
    var markers = JSON.parse(request.responseText);
    // pictograms
    request.open("GET", 'https://t2tc.maciekmm.net/pictograms', false);
    request.send(null);
    var pictograms = JSON.parse(request.responseText);
    return {
      city: city,
      target: city,
      pictograms: pictograms,
      markers: markers,
      sidebar: true
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
        //antiflicker
        if (visible && !marker.marker.map) {
          marker.marker.setMap(this.map);
        } else if (!visible) {
          marker.marker.setMap(null);
        }
      }
    },
    initMap: function () {
      this.map = new google.maps.Map(document.getElementById('map'), {
        scrollwheel: false,
        zoom: 13
      })
      this.changeTarget();
    },
    populateMarkers: function () {
      var tooltip;
      var pict = this.pictograms;
      var map = this.map
      for (let i in this.markers) {
        let data = this.markers[i];
        let latLng = new google.maps.LatLng(data.latitude, data.longitude);

        let marker = new google.maps.Marker({
          position: latLng,
          map: this.map,
          clickable: true,
          title: data.name,
          data: data,
          icon: '/static/marker.png'
        });
        this.markers[i].marker = marker;

        google.maps.event.addListener(marker, 'click', function () {
          // smoothly transition to coordinates
          map.panTo(this.position);
          // if a tooltip is present, dispose it
          if (tooltip) {
            tooltip.close();
          }
          tooltip = new google.maps.InfoWindow({
            content: createTooltip(this.data, pict)
          });
          tooltip.open(map, this);
        })
      }
    },
    //focus map on the search target
    changeTarget: function () {
      var t = this.city + ', ' + this.target + ', Polska';
      var geocoder = new google.maps.Geocoder();
      var b = this.map;
      geocoder.geocode({ 'address': t }, (results, status) => {
        if (status === 'OK') {
          b.panTo(results[0].geometry.location);
          b.setZoom(15);
          if (this.marker) {
            this.marker.setMap(null);
          }
          // this.marker is never null on the first run
          if (this.marker === null) {
            var marker = new google.maps.Marker({
              position: results[0].geometry.location,
              title: "Tu jesteś!"
            });
            this.marker = marker;
            marker.setMap(this.map);
          }
          this.marker = null

        }
      })
    }
  },
}
</script>
<style lang="scss">
.tooltip-list {
  text-align: left;
  width: 55%;
  display: inline-block;
  vertical-align: top;
}

.tooltip-list-contact {
  list-style: none;
  width: 45%;
  line-height: 1.5;
}

.button {
  display: inline-block;
  padding: 5px;
  background: #efefef;
  border: 1px solid #eee;
  border-radius: 5px;
  text-align: right;
}

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
  padding: 0.6em;
  outline: none;
  font-size: 1.5em;
  transition: all 0.3s ease;
}

.filter-input:focus {
  background-color: #fff;
}

.filter-button {
  position: fixed;
  z-index: 2;
  margin-left: 0.8em;
  margin-top: 3.5em;
  width: 107px;
  height: 30px;
  background-color: #fff;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-button:hover,
.filter-button:focus {
  background-color: #eee;
  color: #333;
  box-shadow: 0 0 2px #888;
}

.filter-view {
  background-color: #fff;
  border-radius: 5px;
  position: fixed;
  z-index: 1;
  max-width: 373px;
  margin-top: 6em;
  margin-left: 0.8em;
  padding: 1em;
}
</style>