<template>
    <div>
        <h2>Пошук</h2>
        <input type="text" v-model="searchName">
        <div>Кількість студентів: {{studentNumber}}</div>
        <table class="table-students">
            <thead>
                <th>ПІБ</th>
                <th>Група</th>
                <th>Оцінка</th>
                <th>Здав ПР</th>
            </thead>
            <tr v-for="st in students" v-bind:key="st._id" :class="st.name.toLowerCase().includes(searchName.toLowerCase()) && searchName != '' ? 'red' : ''">
                <td><router-link :to="'/student-info/'+st._id">{{st.name}}</router-link></td>
                <td>{{st.group}}</td>
                <td>{{st.mark}}</td>
                <td><input type="checkbox" v-model="st.isDonePr"></td>
                <td><button @click="delStudent(st._id)">Вилалити</button></td>
                <td><button @click="setStudentToUpdate(st._id)">Олівець</button></td>
            </tr>
        </table>
        <div>
            <label> ПІБ: </label><input type="text" v-model="studentForm.name">
            <label> Група: </label>
            <select v-model="studentForm.group">
                <option>RPZ 20 1/9</option>
                <option>RPZ 20 2/9</option>
            </select>
            <label> Оцінка: </label><input type="text" v-model="studentForm.mark">
            <label> Здав ПР: </label><input type="checkbox" v-model="studentForm.isDonePr">
            <button @click="addStudent()">Додати</button>
            <button @click="updateStudent()">Змінити</button>
        </div>
        <div class="gray">
            <h3>Currency Converter</h3>

            <label>Enter Amount:</label><input type="number" v-model="convertForm.amount"><br>
            <label>Convert From:</label>
            <select v-model="convertForm.from">
                <option v-for="curCode in currencyCodes" v-bind:key="curCode.number" :value="curCode.code">{{curCode.name}}</option>
            </select>
            <label>Convert To:</label>
            <select v-model="convertForm.to">
                <option v-for="curCode in currencyCodes" v-bind:key="curCode.number" :value="curCode.code">{{curCode.name}}</option>
            </select>
            <div>{{convertForm.amount}} {{convertForm.from}} equals {{convertedAmount}} {{convertForm.to}}</div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default{
    setup() {
        const students = ref([]);
        const searchValue = ref("");
        const searchName = ref("");
        const studentForm = ref({
            _id: "",
            name: "",
            group: "",
            mark: 0,
            isDonePr: false,
        });
        const store = useStore();
        const studentNumber = computed(() => {
            return store.getters.getCount;
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

        function delStudent (id) {
            axios.delete("http://34.82.81.113:3000/students/" + id)
            .then(data => {
                console.log(data);
                students.value = students.value.filter(element => {
                    return element._id != id;
                })
                store.commit('setCount', students.value.length);
            })
        };
        function addStudent () {
            axios.post("http://34.82.81.113:3000/students", {
                'name': studentForm.value.name,
                'group': studentForm.value.group,
                'mark': studentForm.value.mark,
                'isDonePr': studentForm.value.isDonePr,
            })
            .then(data => {
                console.log(data);
                students.value.push(data.data);
                store.commit('setCount', students.value.length);
            })
        };
        function setStudentToUpdate (id) {
            studentForm.value = {...students.value.find(element => element._id == id)};
        };
        function updateStudent () {
            const changedStudent = students.value.find(element => element._id == studentForm.value._id);
            axios.put("http://34.82.81.113:3000/students/" + changedStudent._id, studentForm.value)
            .then(data => {
                console.log(data);
                changedStudent.name = data.data.name;
                changedStudent.group = data.data.group;
                changedStudent.mark = data.data.mark;
                changedStudent.isDonePr = data.data.isDonePr;
            })
            studentForm.value._id = 0;
        };

        onMounted(() => {
            axios.get('http://34.82.81.113:3000/students').then((response) => {
                console.log(response.data);
                students.value = response.data;
                store.commit('setCount', students.value.length);
            })
            // axios.get('https://api.monobank.ua/bank/currency').then((response) => {
            //     console.log(response.data);
            //     currency.value = response.data;
            // })
        });

        return { students, searchValue, searchName, studentForm, studentNumber, currency, currencyCodes, convertForm, convertedAmount, delStudent, addStudent, setStudentToUpdate, updateStudent };
    }
}
</script>