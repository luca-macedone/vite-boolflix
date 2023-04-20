<script>
import { state } from '../state';
import ResultList from './ResultList.vue';

export default {
    name: 'AppMain',
    data() {
        return {
            state,
        }
    },
    components: {
        ResultList,
    },
    computed: {
        mergedList(){
            if(this.state.movieList){
                return this.state.movieList.concat(this.state.tvSeriesList) // TODO randomize the merge
            }
        }
    }
}
</script>

<template>
    <main>
        <small class="d-inline-block fw-bold mb-3" v-if="mergedList">Risultati: {{ mergedList.length }}</small>
        <ResultList :list="mergedList"/>
    </main>
</template>

<style lang="scss" scoped></style>