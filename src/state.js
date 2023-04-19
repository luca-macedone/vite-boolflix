import axios from "axios";
import { reactive } from "vue";

export const state = reactive({
    movieList: null,
    movie_base_URL: 'https://api.themoviedb.org/3/search/movie?api_key=f909dc835c7bb866b35d37713fed709d&language=it-IT&include_adult=false',
    popular_movies_URL: 'https://api.themoviedb.org/3/movie/popular?api_key=f909dc835c7bb866b35d37713fed709d&language=it-IT&page=1',
    query: null,

    fetchMovies(URL) {
        axios
            .get(URL)
            .then(response => {
                //console.log(response)
                this.movieList = response.data.results;
                console.log(this.movieList);
            })
            .catch(error => {
                console.error(error)
            })
    },

    setURL() {
        if (this.query) {
            return `${this.movie_base_URL}&query=${this.query}`;
        }
        // else{
        //     return this.popular_movies_URL; // se non sto cercando nulla di base stampo i film più poplari
        // }
    },

    filteredSearch() {
        this.fetchMovies(this.setURL())
    },
})