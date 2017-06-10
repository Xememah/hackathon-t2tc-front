<template>
    <div>
        <table style="width: 100%;">
            <tr>
                <td class="tab-header" colspan="2">Udogodnienia</td>
            </tr>
            <tr class="tab">
                <td><label><input type="checkbox" value="20" v-model="selected" name="pictograms" v-on:change="updateParent">dla osób niewidomych</label></td>
                <td style="text-align: right;"><label><input type="checkbox" value="21" v-model="selected" name="pictograms" v-on:change="updateParent">dla osób niedowidzących</label></td>
            </tr>
            <tr class="tab">
                <td colspan="2"><label><input type="checkbox" value="18" v-model="selected" name="pictograms" v-on:change="updateParent">dla osób z niepełnosprawnościami intelektualnymi</label></td>
            </tr>
        </table>
        <table style="width: 100%;">
            <tr>
                <td class="tab-header" colspan="2">Dostępne dla</td>
            </tr>
            <tr class="tab">
                <td><label><input type="checkbox" value="1" v-model="selected" name="pictograms" v-on:change="updateParent">osób na wózkach</label></td>
                <td style="text-align: right;"><label><input type="checkbox" value="23" v-model="selected" name="pictograms" v-on:change="updateParent">osób z psem asystującym</label></td>
            </tr>
            <tr class="tab">
                <td colspan="2"><label><input type="checkbox" value="19" v-model="selected" name="pictograms" v-on:change="updateParent">osób niesłyszących i niedosłyszących</label></td>
            </tr>
        </table>
        <table style="width: 100%;">
            <tr>
                <td class="tab-header" colspan="2">Wyposażenie</td>
            </tr>
            <tr class="tab">
                <td><label><input type="checkbox" value="5" v-model="selected" name="pictograms" v-on:change="updateParent">przystosowana winda</label></td>
                <td style="text-align: right;"><label><input type="checkbox" value="8" v-model="selected" name="pictograms" v-on:change="updateParent">przystosowana toaleta</label></td>
            </tr>
            <tr class="tab">
                <td colspan="2"><label><input type="checkbox" value="3" v-model="selected" name="pictograms" v-on:change="updateParent">parking z wyznaczonymi miejscami</label></td>
            </tr>
        </table>
        <table style="width: 100%;">
            <tr>
                <td class="tab-header" colspan="2">Dodatkowa pomoc</td>
            </tr>
            <tr class="tab">
                <td><label><input type="checkbox" value="6" v-model="selected" name="pictograms" v-on:change="updateParent">obsługa windy</label></td>
                <td style="text-align: right;"><label><input type="checkbox" value="26" v-model="selected" name="pictograms" v-on:change="updateParent">tłumacz języka migowego</label></td>
            </tr>
            <tr class="tab">
                <td colspan="2"><label><input type="checkbox" value="2" v-model="selected" name="pictograms" v-on:change="updateParent">dla osób poruszających się na wózkach</label></td>
            </tr>
        </table>
        <table style="width: 100%;">
            <tr>
                <td class="tab-header" colspan="2">Inne</td>
            </tr>
            <tr class="tab">
                <td><label><input type="checkbox" value="4" v-model="selected" name="pictograms" v-on:change="updateParent">parking</label></td>
                <td style="text-align: right;"><label><input type="checkbox" value="24" v-model="selected" name="pictograms" v-on:change="updateParent">ogólnodostępna toaleta</label></td>
            </tr>
            <tr class="tab">
               <td colspan="2"><label><input type="checkbox" value="22" v-model="selected" name="pictograms" v-on:change="updateParent"> pomieszczenie dla opiekuna z dzieckiem</label></td>
            </tr>
        </table>
    </div>
    <!--<tr v-for="(name, id) in pictograms">
                <td class="left-tab"><label :for="id">{{ name }}</label></td>
                <td class="right-tab"><label><input type="checkbox" :id="id" v-model="selected" :value="id" v-on:change="updateParent" checked></td>
            </tr>-->
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
            for (let val of this.selected) {
                if (val == 2 && obj.pictograms.indexOf(1) !== -1) {
                    return true
                }
                if (obj.pictograms.indexOf(Number(val)) == -1) {
                    return false;
                }
            }
            return true;
        }
    }
}
</script>
<style>
.tab-header {
    font-weight: 700;
    text-align: left;
}

.tab {
    font-weight: 300;
    text-align: left;
}
label {
    cursor: pointer;
}
</style>