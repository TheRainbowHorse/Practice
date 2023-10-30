<template>
   <div>
       <input v-model="input" type="text" placeholder="ім'я студента" required />
       <button @click="login">Ввійти</button>
   </div>
</template>

<script setup>
import axios from 'axios';
import { useStore } from 'vuex';
import { ref } from 'vue';
import { useRouter } from 'vue-router'

const input = ref('');
const store = useStore();
const router = useRouter()
function login() {
    axios.get("http://34.82.81.113:3000/students/name/" + input.value).then((response) => {
        if((response.data === null) || (response.data.name == "CastError")) {
            return
        }
        store.commit('setUser', response.data);
        router.push('/');
    })
};
</script>

<style module>
</style>