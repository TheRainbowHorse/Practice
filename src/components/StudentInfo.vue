<template>
<p>
    Кількість студентів: {{studentsNumber}}
</p>
<table>
    <tr>
        <td><img :src="student.photo" @click="isOpen = true"></td>
    </tr>
    <tr>
        <td><h1>{{student.name}}</h1></td>
        <td>{{student.group}}</td>
        <td>{{student.mark}}</td>
        <td>{{student.isDonePr}}</td>
    </tr>
</table>

<Modal :open="isOpen" @close="isOpen = !isOpen">
    <p><img :src="student.photo"></p>
</Modal>
</template>

<script setup>
import { ref, onMounted, defineComponent, computed } from 'vue';
import axios from 'axios';
import Modal from './Modal.vue';
import { useStore } from 'vuex'

const store = useStore();
const studentsNumber = computed(() => {
    return store.getters.getCount;
});

const student = ref({});
const components = defineComponent({
    Modal
})
const props = defineProps({
    id: ''
})

const isOpen = ref(false);

onMounted(() => {
    axios.get('http://34.82.81.113:3000/students/'+props.id).then((response) => {
        console.log(response.data)
        student.value = response.data;
    })
});
</script>