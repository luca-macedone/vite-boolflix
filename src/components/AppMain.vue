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
    <main class="py-4">
        <div class="container">
            <div class="row">
                <small id="resultCounter" class="col-12 ms-auto mb-3" v-if="mergedList">
                    Risultati: {{ mergedList.length }}
                </small>
                <ResultList :list="mergedList"/>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
@use '../assets/sass/partials/appMain' as *;
</style>