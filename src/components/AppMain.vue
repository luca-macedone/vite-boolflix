<script>
import { state } from '../state';
import CountryFlag from 'vue-country-flag-next'
export default {
    name: 'AppMain',
    data() {
        return {
            state,
        }
    },
    methods: {
        setMovieLanguage(language){
            //TODO: switch-case
            if(language === 'en'){ 
                return 'gb';
            } else if(language === 'ja'){
                return 'jp'
            } else if(language === 'hi'){
                return 'in'
            } else if(language === 'zh'){
                return 'cn'
            } else if(language === 'uk'){
                return 'ua'
            } else if(language === 'ko'){
                return 'kr'
            }else{
                return language;
            }
        }   
    },
    components: {
        CountryFlag,
    }
}
</script>

<template>
    <main>
        <small class="d-inline-block fw-bold mb-3" v-if="state.movieList">Risultati: {{ state.movieList.length }}</small>
        <ul class="">
            <li class="my-2" v-for="movie in state.movieList">
                <ul class="list-unstyled">
                    <li>
                        <span class="fw-bold">Titolo:</span> 
                        {{ movie.title }}
                    </li>
                    <li>
                        <span class="fw-bold">Titolo originale:</span> 
                        {{ movie.original_title }}
                    </li>
                    <li v-if="movie.original_language">
                        <span class="fw-bold">Lingua originale:</span>
                        <CountryFlag :country='setMovieLanguage(movie.original_language)' size='normal' :rounded="true" :shadow="true"/>
                    </li>
                    <li>
                        <span class="fw-bold">Voto:</span> 
                        {{ movie.vote_average }}
                    </li>
                </ul>
            </li>
        </ul>
    </main>
</template>

<style lang="scss" scoped></style>