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
    mounted(){
        state.fetchGenres();
    },
    // computed: {
    //     // mergedList() {
    //     //     if (this.state.movieList) {
    //     //         return this.state.movieList.concat(this.state.tvSeriesList) // TODO randomize the merge
    //     //     }
    //     // }
    // }
}
</script>

<template>
    <main class="py-4">
        <div class="container">
            <div class="row">
                <section id="film-section" v-show="state.movieList">
                    <div class="col-12">
                        <div class="row">
                            <div class="col-12 col-md-6 d-flex justify-content-start align-items-baseline gap-4">
                                <h2>Film</h2>
                                <small id="resultCounter" class="" v-if="state.movieList">
                                    Risultati: {{ state.movieList.length }}
                                </small>
                            </div>
                            <div class="col-12 col-md-6 d-flex justify-content-start align-items-center gap-2" id="category-filter">
                                <label for="category-select">Categoria:</label>
                                <select class="form-select" v-model="state.category" id="category-select">
                                    <option :value="-1" selected>Scegli..</option>
                                    <option :value="genre.id" v-for="genre in state.genresList">{{ genre.name }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <ResultList :list="state.movieList" />
                </section>
                <section class="mt-5" id="series-section" v-show="state.tvSeriesList">
                    <div class="col-12 d-flex justify-content-start align-items-baseline gap-4">
                        <h2>Serie TV</h2>
                        <small id="resultCounter" class="w-75" v-if="state.tvSeriesList">
                            Risultati: {{ state.tvSeriesList.length }}
                        </small>
                    </div>
                    <ResultList :list="state.tvSeriesList"/>
                </section>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
@use '../assets/sass/partials/appMain' as *;
</style>