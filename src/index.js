var newStudentArray = {
    _id: "",
    name: "",
    group: "",
    mark: 0,
    isDonePr: false,
}

import { createApp, ref, computed, onMounted } from 'vue';
import axios from 'axios';
createApp({
    setup() {
        const students = ref([]);
        const searchValue = ref("");
        const searchName = ref("");
        const studentForm = ref(newStudentArray);
        const studentNumber = computed(() => {
            return students.value.length;
        });

        const currency = ref([
            // {"currencyCodeA":840,"currencyCodeB":980,"date":1697689806,"rateBuy":36.58,"rateCross":0,"rateSell":37.4406},{"currencyCodeA":978,"currencyCodeB":980,"date":1697704806,"rateBuy":38.55,"rateCross":0,"rateSell":39.8502},{"currencyCodeA":978,"currencyCodeB":840,"date":1697689806,"rateBuy":1.049,"rateCross":0,"rateSell":1.06},
        ]);
        const currencyCodes = ref([
            { code: 'UAH', number: 980, name: 'Hryvnia' },
            { code: 'USD', number: 840, name: 'US Dollar' },
            { code: 'EUR', number: 978, name: 'Euro' },
        ]);
        const convertForm = ref({
            amount: 0,
            from: currencyCodes.value[0].code,
            to: currencyCodes.value[currencyCodes.value.length - 1].code,
        });
        const convertedAmount = computed(() => {
            let fromNum = currencyCodes.value.find(element => element.code == convertForm.value.from).number;
            let toNum = currencyCodes.value.find(element => element.code == convertForm.value.to).number;
            let resultAmount = convertForm.value.amount;
            currency.value.forEach(element => {
                if (element.currencyCodeA == fromNum && element.currencyCodeB == toNum){
                    return resultAmount = convertForm.value.amount * element.rateSell;
                }
                else if (element.currencyCodeA == toNum && element.currencyCodeB == fromNum){
                    return resultAmount = convertForm.value.amount / element.rateSell;
                }
            });
            return resultAmount;
        });

        function delStudent (_id) {
            students.value = students.value.filter(element => {
                return element._id != _id;
            })
        };
        function addStudent () {
            studentNumber.value = students.value.push({ "_id": students.value[students.value.length - 1]._id + 1, "name": studentForm.value.name, "group": studentForm.value.group, "mark": studentForm.value.mark, "isDonePr": studentForm.value.isDonePr });
        };

        onMounted(() => {
            axios.get('http://34.82.81.113:3000/students').then((response) => {
                console.log(response.data);
                students.value = response.data;
            })
            axios.get('https://api.monobank.ua/bank/currency').then((response) => {
                console.log(response.data);
                currency.value = response.data;
            })
        });

        return { students, searchValue, searchName, studentForm, studentNumber, currency, currencyCodes, convertForm, convertedAmount, delStudent, addStudent };
    }
}).mount('#app')