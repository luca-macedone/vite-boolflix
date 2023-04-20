<script>
import { state } from '../state';
import CountryFlag from 'vue-country-flag-next'

export default {
    name: 'ResultList',
    data() {
        return {
            state,
        }
    },
    components: {
        CountryFlag,
    },
    props: ['list'],
    methods: {
        setMovieLanguage(language){
            switch(language){
                case 'en': return 'gb';
                case 'ja': return 'jp';
                case 'hi': return 'in';
                case 'zh': return 'cn';
                case 'uk': return 'ua';
                case 'ko': return 'kr';
                default: return language;
            }
        },
        setImgPath(obj){
            if(obj){
                if(obj.poster_path !== null){
                    return `${this.state.base_img_URL}w342${obj.poster_path}`;
                }else if(obj.backdrop_path !== null){
                    return `${this.state.base_img_URL}w342${obj.backdrop_path}`;
                }
            } 
            return null;
        },
        setVote(vote){
            if(vote){
                let normalizedVote = Math.ceil(vote/2);
                let stars = '';
                let counter = 0;
                for(let i=0; i<normalizedVote; i++){
                    stars += '★';
                    counter++
                }
                for(let i=5; i>counter; i--){
                    stars += '☆';
                }
                //console.log(stars)
                return stars;
            }
        },
    },
}
</script>

<template>
    <ul>
        <li class="my-2" v-for="movie in list">
            <ul class="list-unstyled" v-if="list">
                <li v-if="setImgPath(movie) !== null">
                    <img v-if="list" :src="setImgPath(movie)"
                        :alt="movie.title !== undefined ? movie.title : movie.name">
                </li>
                <li>
                    <span class="fw-bold">Titolo:</span>
                    <span v-if="movie.title">{{ movie.title }}</span>
                    <span v-else-if="movie.name">{{ movie.name }}</span>
                </li>
                <li>
                    <span class="fw-bold">Titolo originale:</span>
                    <span v-if="movie.original_title">{{ movie.original_title }}</span>
                    <span v-else-if="movie.original_name">{{ movie.original_name }}</span>
                </li>
                <li v-if="movie.original_language">
                    <span class="fw-bold">Lingua originale:</span>
                    <CountryFlag :country='setMovieLanguage(movie.original_language)' size='normal' :rounded="true"
                        :shadow="true" />
                </li>
                <li v-show="movie.vote_average !== 0">
                    <span class="fw-bold">Voto:</span>
                    {{ setVote(movie.vote_average) }}
                </li>
            </ul>
        </li>
    </ul>
</template>

<style lang="scss" scoped></style>