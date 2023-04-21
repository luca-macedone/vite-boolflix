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
        mergedList() {
            if (this.state.movieList) {
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
                <section id="film-section">
                    <div class="col-12 d-flex justify-content-start align-items-baseline gap-4">
                        <h2>Film</h2>
                        <small id="resultCounter" class="w-75" v-if="mergedList">
                            Risultati: {{ state.movieList.length }}
                        </small>
                    </div>
                    <ResultList :list="state.movieList" />
                </section>
                <section class="mt-5" id="series-section">
                    <div class="col-12 d-flex justify-content-start align-items-baseline gap-4">
                        <h2>Serie TV</h2>
                        <small id="resultCounter" class="w-75" v-if="mergedList">
                            Risultati: {{ state.movieList.length }}
                        </small>
                    </div>
                    <ResultList :list="state.movieList" />
                    <ResultList :list="state.tvSeriesList" />
                </section>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
@use '../assets/sass/partials/appMain' as *;
</style>