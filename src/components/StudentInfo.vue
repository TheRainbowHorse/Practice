<template>
<table>
    <tr>
        <td><img :src="student.photo"></td>
    </tr>
    <tr>
        <td>{{student.name}}</td>
        <td>{{student.group}}</td>
        <td>{{student.mark}}</td>
        <td>{{student.isDonePr}}</td>
    </tr>
</table>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
    props: {
        id: ''
    },
    setup(props) {
        const student = ref({});

        onMounted(() => {
            axios.get('http://34.82.81.113:3000/students/'+props.id).then((response) => {
                console.log(response.data)
                student.value = response.data;
            })
        });

        return { student };
    },
}
</script>