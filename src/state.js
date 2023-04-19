import axios from "axios";
import { reactive } from "vue";

export const state = reactive({
    movieList: null,
    tvSeriesList: null,
    movie_base_URL: 'https://api.themoviedb.org/3/search/movie?api_key=f909dc835c7bb866b35d37713fed709d&language=it-IT&include_adult=false',
    popular_movies_URL: 'https://api.themoviedb.org/3/movie/popular?api_key=f909dc835c7bb866b35d37713fed709d&language=it-IT&page=1',
    tv_series_base_URL: 'https://api.themoviedb.org/3/search/tv?api_key=f909dc835c7bb866b35d37713fed709d&language=it-IT',
    query: null,

    fetchMovies(URL, bool) {
        axios
            .get(URL)
            .then(response => {
                //console.log(response)
                if(bool){
                    this.movieList = response.data.results;
                    //console.log(this.movieList);
                }else{
                    this.tvSeriesList = response.data.results;
                    console.log(this.tvSeriesList);
                }
            })
            .catch(error => {
                console.error(error)
            })
    },

    setURL(bool) {
        if (this.query) {
            if(bool){
                return `${this.movie_base_URL}&query=${this.query}`;
            }else{
                return `${this.tv_series_base_URL}&query=${this.query}`;
            }
        }
        // else{
        //     return this.popular_movies_URL; // se non sto cercando nulla di base stampo i film più poplari
        // }
    },

    filteredSearch() {
        this.fetchMovies(this.setURL(true), true) // cerco i film
        this.fetchMovies(this.setURL(false), false) // cerco le serie TV
    },
})