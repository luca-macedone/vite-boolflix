import axios from "axios";
import { reactive } from "vue";

export const state = reactive({
    movieList: null,
    tvSeriesList: null,
    query: null,
    genresList: null,
    resultCredits: null,
    singleResultCast: null,
    category: -1,

    api_base_URL: 'https://api.themoviedb.org/3/',
    movie_URL: 'search/movie?api_key=f909dc835c7bb866b35d37713fed709d&language=it-IT&include_adult=false',
    popular_movies_URL: 'movie/popular?api_key=f909dc835c7bb866b35d37713fed709d&language=it-IT&page=1',
    tv_series_URL: 'search/tv?api_key=f909dc835c7bb866b35d37713fed709d&language=it-IT',
    base_img_URL: 'https://image.tmdb.org/t/p/',
    genre_URL: 'genre/movie/list?api_key=f909dc835c7bb866b35d37713fed709d&language=it-IT',
    credits_URL: '/credits?api_key=f909dc835c7bb866b35d37713fed709d&language=it-IT',

    fetchResults(URL, isMovie) {
        axios
            .get(URL)
            .then(response => {
                //console.log(response)
                if (isMovie) {
                    this.movieList = response.data.results;
                    //console.log(this.movieList);
                } else {
                    this.tvSeriesList = response.data.results;
                    //console.log(this.tvSeriesList);
                }
            })
            .catch(error => {
                console.error(error)
            })
    },

    setURL(isMovie) {
        if (this.query !== undefined && this.query !== null) {
            if (isMovie) {
                let newUrl = `${this.api_base_URL + this.movie_URL}&query=${this.query}`;
                //console.log(newUrl);
                return newUrl;
            } else {
                let newUrl = `${this.api_base_URL + this.tv_series_URL}&query=${this.query}`;
                //console.log(newUrl);
                return newUrl;
            }
        }
    },

    filteredSearch() {
        const movieCompleteURL = this.setURL(true);
        const tvSeriesCompleteURL = this.setURL(false);
        if (movieCompleteURL !== undefined || tvSeriesCompleteURL !== undefined) {
            this.fetchResults(movieCompleteURL, true) // cerco i film
            this.fetchResults(tvSeriesCompleteURL, false) // cerco le serie TV
        }
    },

    fetchGenres() {
        const genresURL = `${this.api_base_URL + this.genre_URL}`;
        axios
            .get(genresURL)
            .then(response => {
                //console.log(response)
                this.genresList = response.data.genres;
                //console.log(this.genresList)
            })
            .catch(error => {
                console.error(error)
            })
    },

    fetchCredits(ID) {
        const creditsURL = `${this.api_base_URL}movie/${ID}${this.credits_URL}`;
        axios
            .get(creditsURL)
            .then(response => {
                //console.log(response)
                this.resultCredits = response.data.cast;
                //console.log(this.resultCredits)
            })
            .catch(error => {
                console.error(error)
            })
    }
})