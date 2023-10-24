<template>
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

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Modal from './Modal.vue';

export default {
    components: { Modal },
    props: {
        id: ''
    },
    setup(props) {
        const student = ref({});
        const isOpen = ref(false);

        onMounted(() => {
            axios.get('http://34.82.81.113:3000/students/'+props.id).then((response) => {
                console.log(response.data)
                student.value = response.data;
            })
        });

        return { student, isOpen };
    },
}
</script>