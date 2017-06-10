<template>
    <div>
    <hr/>
    <table style="width: 100%;">
        <tr v-for="obj in filters">
            <td style="text-align: left;"><label :for="obj.name">{{ obj.fullName }}</label></td>
            <td><input type="range" :max="obj.max" :min="obj.min" :name="obj.name" :id="obj.name" v-model="obj.value" v-on:change="updateParent"></td>
            <td style="padding-left: 5px; width: 80px;">{{ obj.value }} {{ obj.unit }}</td>
        </tr>
    </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            filters: [
                {
                    fullName: "Szerokość wózka",
                    name: "width",
                    max: 150,
                    min: 40,
                    unit: 'cm',
                    value: 0,
                    check: function (place) {
                        if (place.main_entrance && place.main_entrance.width && Number(this.value) !== 0) {
                            return place.main_entrance.width > Number(this.value);
                        }
                        return true;
                    }
                },
                {
                    fullName: "Maks. odległość od przystanku",
                    name: "width",
                    value: 0,
                    max: 1000,
                    min: 0,
                    unit: 'm',
                    check: function (place) {
                        if (this.value == 0) {
                            return true;
                        }
                        if (!place.access) {
                            return true;
                        }
                        let minDistance = Number.MAX_SAFE_INTEGER;
                        for (let access of place.access) {
                            if (access.distance && access.distance < minDistance) {
                                minDistance = access.distance;
                            }
                        }
                        console.log(minDistance)
                        if (minDistance > Number(this.value) && minDistance != Number.MAX_SAFE_INTEGER) {
                            return false
                        }
                        return true;
                    }
                }
            ]
        }
    },
    props: ['update'],
    methods: {
        updateParent: function () {
            this.update(this);
        },
        matches: function (place) {
            for (let filter of this.filters) {
                if (!filter.check(place)) {
                    return false;
                }
            }
            return true;
        },
    }
}
</script>
<style>
    label {
        font-weight: 300;
    }
</style>