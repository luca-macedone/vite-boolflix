<script>
import { state } from '../state';
import CountryFlag from 'vue-country-flag-next'
export default {
    name: 'ResultItem',
    data() {
        return {
            state,
            showMore: false,
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
                for (let i = 0; i < 5; i++) {
                    if (counter < normalizedVote) {
                        stars.push('fa-solid fa-star');
                    } else {
                        stars.push('fa-regular fa-star');
                    }
                    counter++
                }
                //console.log(normalizedVote)
                return stars;
            }
        },

        printGenres(arrayOfGenres) {
            let itemGenres = '';
            if (arrayOfGenres) {
                arrayOfGenres.forEach(id => {
                    for (let i = 0; i < state.genresList.length; i++) {
                        if (id === state.genresList[i].id) {
                            itemGenres += state.genresList[i].name + ', ';
                        }
                    }
                });
            }
            // console.log(itemGenres)
            return itemGenres;
        },

        printCast(id) {
            this.state.fetchCredits(id);
            //console.log('sono nella print')
            return this.searchActors(this.state.resultCredits);
        },

        searchActors(arrayOfCast) {
            let actors = '';
            if (arrayOfCast) {
                let counter = 0;
                //console.log(arrayOfCast);
                actors = arrayOfCast.filter(member => {
                    if (member.known_for_department === 'Acting') {
                        //console.log(member.name)
                        if (counter < 5) {
                            counter++;
                            return member.name;
                        }
                    }
                })
            }
            //console.log(actors)
            this.state.singleResultCast = actors;
        },

        activeDescription(castItem) {
            this.printCast(castItem.id);
            if(this.state.singleResultCast){
                this.showMore = true;
            }
        }
    },
}
</script>

<template>
    <div :class="showMore ? 'col-12 h-100' : 'col-12 col-sm-6 col-md-4 col-lg-3'" class="" v-if="list">
        <div class="p-3" :class="showMore? '' : 'd-none'" id="more-info-panel">
            <div class="d-flex justify-content-between align-items-center">
                <div class="pb-1" id="item-name">
                    <!-- <span class="fw-bold">Titolo:</span> -->
                    <span v-if="item.title">
                        <p>{{ item.title }}</p>
                    </span>
                    <span v-else>
                        <p>{{ item.name }}</p>
                    </span>
                </div>
                <button class="btn rounded-0" id="exit-button" @click="showMore = false">
                    Esci
                </button>
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
            <div id="item-genres" class=" d-flex align-items-baseline">
                <span class="fw-bold">Genere:</span>
                <p>
                    {{ printGenres(item.genre_ids) }}
                </p>
            </div>
            <div id="item-vote" v-show="item.vote_average !== 0">
                <span class="fw-bold">Media voti:</span>
                <span class="star" v-for="star in setVote(item.vote_average)">
                    <font-awesome-icon :icon="star" />
                </span>
            </div>
            <div id="item-overview" v-if="item.overview !== ''">
                <span class="fw-bold">Sinossi:</span>
                <p>{{ item.overview }}</p>
            </div>
            <div class="" id="items-cast">
                <span class="fw-bold">Cast:</span>
                <p>
                    <span class="" v-for="actor in state.singleResultCast">{{ actor.name }}, </span>
                </p>
            </div>
        </div>
        <div :class="showMore ? 'd-none' : ''" class="card h-100 rounded-0" :id="`item-card-${item.id}`" v-if="item">
            <div class="card-img rounded-0" v-if="setImgPath(item) !== null">
                <img class="" v-if="list" :src="setImgPath(item)" :alt="item.title ? item.title : item.name">
            </div>
            <div :class="!setImgPath(item) ? 'd-block' : ''" class="card-img-overlay rounded-0 bg-dark bg-opacity-75">
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
                <div id="item-genres" class=" d-flex align-items-baseline">
                    <span class="fw-bold">Genere:</span>
                    <p>
                        {{ printGenres(item.genre_ids) }}
                    </p>
                </div>
                <div id="item-vote" v-show="item.vote_average !== 0">
                    <span class="fw-bold">Media voti:</span>
                    <span class="star" v-for="star in setVote(item.vote_average)">
                        <font-awesome-icon :icon="star" />
                    </span>
                </div>
                <div id="item-overview" v-if="item.overview !== ''">
                    <span class="fw-bold">Sinossi:</span>
                    <p>{{ item.overview }}</p>
                </div>
                <div class="d-flex justify-content-center my-2" id="show-more-action">
                    <button class="btn rounded-0" @click="activeDescription(item)">Show more</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/sass/partials/resultItem.scss' as *;
</style>