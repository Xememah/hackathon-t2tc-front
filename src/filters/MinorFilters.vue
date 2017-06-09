<template>
    <ul>
        <li v-for="obj in filters">
            <label :for="obj.name">{{ obj.fullName }}</label>
            <input type="number" :name="obj.name" :id="obj.name" v-model="obj.value" v-on:change="updateParent">
        </li>
    </ul>
</template>

<script>
export default {
    data() {
        return {
            filters: [
                {
                    fullName: "Szerokość wózka",
                    name: "width",
                    value: 0,
                    check: function (place) {
                        if (place.main_entrance && place.main_entrance.width && Number(this.value) !== 0) {
                            return place.main_entrance.width > Number(this.value);
                        }
                        return true;
                    }
                },
                {
                    fullName: "Odległość od przystanku",
                    name: "width",
                    value: 0,
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