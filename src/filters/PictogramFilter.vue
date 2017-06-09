<template>
    <ul>
        <li v-for="(name, id) in pictograms">
            <input type="checkbox" :id="id" v-model="selected" :value="id" v-on:change="updateParent" checked>
            <label :for="id">{{ name }}</label>
        </li>
    </ul>
</template>
<script>
export default {
    name: 'PictogramFilter',
    data() {
        var API_PATH = 'https://t2tc.maciekmm.net/pictograms';
        var request = new XMLHttpRequest();
        request.open("GET", API_PATH, false);
        request.send(null)
        var pictograms = JSON.parse(request.responseText);
        return {
            pictograms: pictograms,
            selected: []
        }
    },
    props: ['update'],
    methods: {
        updateParent: function () {
            this.update(this);
        },
        matches: function (obj) {
            for (let key in this.selected) {
                if (obj.pictograms.indexOf(Number(this.selected[key])) == -1) {
                    return false;
                }
            }
            return true;
        }
    }
}
</script>
<style>
ul {
    list-style: none;
}

li {
    display: inline-block;
    margin: 3px;
    font-size: 8pt;
}
</style>