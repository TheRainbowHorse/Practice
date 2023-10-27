<template>
    <div class="main">
        <h1>Students</h1>
        <div class="content">
            <button @click="changeTheme()">Change Theme</button>
            <p>Current theme: {{styleTheme}}</p>
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex'

const store = useStore();
const styleTheme = computed(() => {
    return store.getters.getTheme;
});

onMounted(() => {
    let style = document.createElement('link');
    style.type = "text/css";
    style.rel = "stylesheet";
    style.href = './components/'+store.getters.getTheme+'.css';
    style.id = 'theme';
    document.head.appendChild(style);
})

function changeTheme(){
    if (store.getters.getTheme == 'dark'){
        store.commit('setTheme', 'light');
        let style = document.getElementById('theme');
        style.href = './components/'+store.getters.getTheme+'.css';
        document.head.appendChild(style);
    }
    else{
        store.commit('setTheme', 'dark');
        let style = document.getElementById('theme');
        style.href = './components/'+store.getters.getTheme+'.css';
        document.head.appendChild(style);
    }
}
</script>