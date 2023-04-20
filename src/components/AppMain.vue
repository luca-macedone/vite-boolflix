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
        },
        setImgPath(obj){
            if(obj){
                if(obj.poster_path !== null){
                    return `${this.state.base_img_URL}w200${obj.poster_path}`;
                }else if(obj.backdrop_path !== null){
                    return `${this.state.base_img_URL}w200${obj.backdrop_path}`;
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
        }   
    },
    components: {
        CountryFlag,
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
        <ul class="">
            <li class="my-2" v-for="movie in mergedList">
                <ul class="list-unstyled" v-if="mergedList">
                    <li v-if="setImgPath(movie) !== null">
                        <img v-if="mergedList" :src="setImgPath(movie)" :alt="movie.title !== undefined? movie.title : movie.name">
                    </li>
                    <li>
                        <span class="fw-bold">Titolo:</span> 
                        <span v-if="movie.title">{{movie.title}}</span>
                        <span v-else-if="movie.name">{{movie.name}}</span>
                        <!-- {{ movie.title !== undefined? movie.title : movie.name }} -->
                    </li>
                    <li></li>
                        <span class="fw-bold">Titolo originale:</span> 
                        <span v-if="movie.original_title">{{movie.original_title}}</span>
                        <span v-else-if="movie.original_name">{{movie.original_name}}</span>
                        <!-- {{ movie.original_title !== undefined? movie.original_title : movie.original_name }} -->
                    </li>
                    <li v-if="movie.original_language">
                        <span class="fw-bold">Lingua originale:</span>
                        <CountryFlag :country='setMovieLanguage(movie.original_language)' size='normal' :rounded="true" :shadow="true"/>
                    </li>
                    <li v-show="movie.vote_average !== 0">
                        <span class="fw-bold">Voto:</span> 
                        {{ setVote(movie.vote_average) }}
                    </li>
                </ul>
            </li>
        </ul>
    </main>
</template>

<style lang="scss" scoped></style>