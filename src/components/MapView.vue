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
      var tooltip;
      var pict = this.pictograms;
      for (var i = 0; i < this.markers.length; i++) {
        var data = this.markers[i];
        var latLng = new google.maps.LatLng(data.latitude, data.longitude);

        var marker = new google.maps.Marker({
          position: latLng,
          map: this.map,
          clickable: true,
          title: data.name,
          data: data,
          icon: '/static/marker.png'
        });
        this.markers[i].marker = marker;

        var map = this.map
        google.maps.event.addListener(marker, 'click', function () {
          map.panTo(this.position);
          if (tooltip) {
            tooltip.close();
          }
          let content = '<h2>' + this.data.name + '</h2><div class="tooltip-wrapper"><ul class="tooltip-list">';
          for (let pictogram of this.data.pictograms) {
            content += '<li>' + pict[pictogram] + '</li>'
          }
          content += '</ul><ul class="tooltip-list tooltip-list-contact"><li><strong>' + this.data.basics.street + '</strong></li>';
          if (this.data.basics.phones && this.data.basics.phones[0]) {
            content += '<li><a href="tel:' + this.data.basics.phones[0] + '">' + this.data.basics.phones[0] + '</a></li>'
          }
          if (this.data.basics.website) {
            content += '<li><a href="' + this.data.basics.website + '">' + this.data.basics.website + '</a></li>'
          }
          if (this.data.basics.email) {
            content += '<li><a href="mailto:' + this.data.basics.email + '">' + this.data.basics.email + '</a></li>'
          }
          if (this.data.basics.opening_hours) {
            content += '<li>' + this.data.basics.opening_hours + '</li>'
          }
          content += '</ul><p>Dodatkowe informacje: '
          if (this.data.main_entrance) {
            if (this.data.main_entrance.bell) {
              content += 'dzwonek, '
            }
            if (this.data.main_entrance.handrail) {
              content += 'poręcz, '
            }
            if (this.data.main_entrance.width) {
              content += 'szerokość drzwi: ' + this.data.main_entrance.width + 'cm, '
            }
          }
          if (this.data.access && this.data.access[0]) {
            let min = this.data.access[0].distance
            for (let access of this.data.access) {
              if (access.distance < min) {
                min = access.distance
              }
            }
            if (min) {
              content += min + 'm od najbliższego przystanku, ';
            }
          }

          //remove , 
          if (content.endsWith(", ")) {
            content = content.substr(0, content.length - 2);
          }

          content += '</p><a target="_blank" href="http://www.niepelnosprawnik.pl/' + this.data.id + '" class="button">Zapoznaj się z audytem</a></div>';
          tooltip = new google.maps.InfoWindow({
            content: content
          });
          tooltip.open(map, this);
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
<style lang="scss">
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
</style>