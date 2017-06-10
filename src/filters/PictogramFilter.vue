<template>
    <div>
        <table style="width: 100%;">
            <tr>
                <td class="tab-header" colspan="2">Udogodnienia</td>
            </tr>
            <tr class="tab">
                <td>dla osób niewidomych 20</td>
                <td style="text-align: right;">dla osób niedowidzących 21</td>
            </tr>
            <tr class="tab">
                <td colspan="2">dla osób z niepełnosprawnościami intelektualnymi 18</td>
            </tr>
        </table>
        <table style="width: 100%;">
            <tr>
                <td class="tab-header" colspan="2">Dostępne dla</td>
            </tr>
            <tr class="tab">
                <td>osób na wózkach 1</td>
                <td style="text-align: right;">osób z psem asystującym 23</td>
            </tr>
            <tr class="tab">
                <td colspan="2">osób niesłyszących i niedosłyszących 19</td>
            </tr>
        </table>
        <table style="width: 100%;">
            <tr>
                <td class="tab-header" colspan="2">Wyposażenie</td>
            </tr>
            <tr class="tab">
                <td>przystosowana winda 5</td>
                <td style="text-align: right;">przystosowana toaleta 8</td>
            </tr>
            <tr class="tab">
                <td colspan="2">parking z wyznaczonymi miejscami 3</td>
            </tr>
        </table>
        <table style="width: 100%;">
            <tr>
                <td class="tab-header" colspan="2">Dodatkowa pomoc</td>
            </tr>
            <tr class="tab">
                <td>obsługa windy 6</td>
                <td style="text-align: right;">tłumacz języka migowego 26</td>
            </tr>
            <tr class="tab">
                <td colspan="2">parking z miejscami dla niepełnosprawnych 3</td>
            </tr>
            <tr class="tab">
                <td colspan="2">dla osób poruszających się na wózkach 2</td>
            </tr>
        </table>
        <table style="width: 100%;">
            <tr>
                <td class="tab-header" colspan="2">Inne</td>
            </tr>
            <tr class="tab">
                <td>parking 4</td>
                <td style="text-align: right;">ogólnodostępna toaleta 24</td>
            </tr>
            <tr class="tab">
                <td colspan="2">pomieszczenie dla opiekuna z dzieckiem 22</td>
            </tr>
        </table>
    </div>
    <!--<tr v-for="(name, id) in pictograms">
                <td class="left-tab"><label :for="id">{{ name }}</label></td>
                <td class="right-tab"><input type="checkbox" :id="id" v-model="selected" :value="id" v-on:change="updateParent" checked></td>
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
</style>