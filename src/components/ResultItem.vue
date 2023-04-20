<script>
import { state } from '../state';
import CountryFlag from 'vue-country-flag-next'
export default {
    name: 'ResultItem',
    data() {
        return {
            state,
        }
    },
    components: { CountryFlag, },
    props: ['item', 'list'],
    methods: {
        setMovieLanguage(language) {
            switch (language) {
                case 'en': return 'gb';
                case 'ja': return 'jp';
                case 'hi': return 'in';
                case 'zh': return 'cn';
                case 'uk': return 'ua';
                case 'ko': return 'kr';
                default: return language;
            }
        },
        setImgPath(obj) {
            if (obj) {
                if (obj.poster_path !== null) {
                    return `${this.state.base_img_URL}w342${obj.poster_path}`;
                } else if (obj.backdrop_path !== null) {
                    return `${this.state.base_img_URL}w342${obj.backdrop_path}`;
                }
            }
            return null;
        },
        setVote(vote) {
            if (vote) {
                let normalizedVote = Math.ceil(vote / 2);
                let stars = '';
                let counter = 0;
                for (let i = 0; i < normalizedVote; i++) {
                    stars += '★';
                    counter++
                }
                for (let i = 5; i > counter; i--) {
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
    <div class="col-12 col-md-6 col-lg-4" v-if="list">
        <div class="card h-100 rounded-0">
            <div class="card-img" v-if="setImgPath(item) !== null">
                <img class="img-fluid" v-if="list" :src="setImgPath(item)"
                    :alt="item.title !== undefined ? item.title : item.name">
            </div>
            <div class="card-img-overlay rounded-0 bg-dark bg-opacity-75">
                <div id="item-name">
                    <span class="fw-bold">Titolo:</span>
                    <span v-if="item.title">{{ item.title }}</span>
                    <span v-else-if="item.name">{{ item.name }}</span>
                </div>
                <div id="item-original-name">
                    <span class="fw-bold">Titolo originale:</span>
                    <span v-if="item.original_title">{{ item.original_title }}</span>
                    <span v-else-if="item.original_name">{{ item.original_name }}</span>
                </div>
                <div id="item-original-language" v-if="item.original_language">
                    <span class="fw-bold">Lingua originale:</span>
                    <CountryFlag :country='setMovieLanguage(item.original_language)' 
                        size='normal' 
                        :rounded="true"
                        :shadow="true" />
                </div>
                <div id="item-vote" v-show="item.vote_average !== 0">
                    <span class="fw-bold">Voto:</span>
                    {{ setVote(item.vote_average) }}
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/sass/partials/resultItem.scss' as *;
</style>