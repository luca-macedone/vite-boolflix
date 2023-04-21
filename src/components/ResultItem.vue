<script>
import { state } from '../state';
import CountryFlag from 'vue-country-flag-next'
export default {
    name: 'ResultItem',
    data() {
        return {
            state,
            index: this.itemIndex,
        }
    },
    components: { CountryFlag, },
    props: ['item', 'list',],
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
                let stars = [];
                let counter = 0;
                // for (let i = 0; i < normalizedVote; i++) {
                //     stars += '★';
                //     counter++
                // }
                // for (let i = 5; i > counter; i--) {
                //     stars += '☆';
                // }
                for(let i=0; i<5; i++){
                    if(counter < normalizedVote){
                        stars.push('fa-solid fa-star');
                    }else {
                        stars.push('fa-regular fa-star');
                    }
                    counter++
                }
                //console.log(normalizedVote)
                return stars;
            }
        },
    },
}
</script>

<template>
    <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-if="list">
        <div class="card h-100 rounded-0" v-if="item">
            <div class="card-img" v-if="setImgPath(item) !== null">
                <img class="" v-if="list" :src="setImgPath(item)" :alt="item.title ? item.title : item.name">
            </div>
            <div :class="!setImgPath(item)? 'd-block': ''" class="card-img-overlay rounded-0 bg-dark bg-opacity-75">
                <div class="pb-1" id="item-name">
                    <!-- <span class="fw-bold">Titolo:</span> -->
                    <span v-if="item.title">
                        <p>{{ item.title }}</p>
                    </span>
                    <span v-else>
                        <p>{{ item.name }}</p>
                    </span>
                </div>
                <div class="mt-1 d-flex align-items-top gap-3">
                    <div id="item-original-language" v-if="item.original_language">
                        <!-- <span class="fw-bold">Lingua originale:</span> -->
                        <CountryFlag :country='setMovieLanguage(item.original_language)' size='normal' :rounded="true"
                            :shadow="true" />
                    </div>
                    <div id="item-original-name">
                        <!-- <span class="fw-bold">Titolo originale:</span> -->
                        <span v-if="item.original_title">
                            <p>{{ item.original_title }}</p>
                        </span>
                        <span v-else>
                            <p>{{ item.original_name }}</p>
                        </span>
                    </div>
                </div>
                <div id="item-vote" v-show="item.vote_average !== 0">
                    <span class="fw-bold">Media voti:</span>
                    <!-- <p>{{ setVote(item.vote_average).forEach(vote => {

                    }) }}</p> -->
                    <span class="star" v-for="star in setVote(item.vote_average)"> <font-awesome-icon :icon="star" /> </span>
                </div>
                <div id="item-overview" v-if="item.overview !== ''">
                    <span class="fw-bold">Sinossi:</span>
                    <p>{{ item.overview }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/sass/partials/resultItem.scss' as *;
</style>