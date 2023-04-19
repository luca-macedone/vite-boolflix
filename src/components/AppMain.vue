<script>
import { state } from '../state';
export default {
    name: 'AppMain',
    data() {
        return {
            state,
        }
    },
    methods: {
        setMovieLanguage(language){
            return language;
        }   
    },
}
</script>

<template>
    <main>
        <small class="d-inline-block fw-bold mb-3" v-if="state.movieList">Risultati: {{ state.movieList.length }}</small>
        <ul class="">
            <li class="my-2" v-for="movie in state.movieList">
                <ul class="list-unstyled">
                    <li><span class="fw-bold">Titolo:</span> {{ movie.title }}</li>
                    <li><span class="fw-bold">Titolo originale:</span> {{ movie.original_title }}</li>
                    <li><span class="fw-bold">Lingua originale:</span> {{ setMovieLanguage(movie.original_language) }}</li>
                    <li><span class="fw-bold">Voto:</span> {{ movie.vote_average }}</li>
                </ul>
            </li>
        </ul>
    </main>
</template>

<style lang="scss" scoped></style>