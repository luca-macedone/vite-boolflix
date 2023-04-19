<script>
import { state } from '../state';
export default {
    name: 'AppHeader',
    data() {
        return {
            state,
        }
    }
}
</script>

<template>
    <header>
        <input type="text" v-model="state.query" @keyup.enter="state.filteredSearch()">
        <button @click="state.filteredSearch()">Cerca</button>
    </header>
</template>

<style lang="scss" scoped></style>