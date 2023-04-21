import axios from "axios";
import { reactive } from "vue";

export const state = reactive({
    movieList: null,
    tvSeriesList: null,
    movie_base_URL: 'https://api.themoviedb.org/3/search/movie?api_key=f909dc835c7bb866b35d37713fed709d&language=it-IT&include_adult=false',
    popular_movies_URL: 'https://api.themoviedb.org/3/movie/popular?api_key=f909dc835c7bb866b35d37713fed709d&language=it-IT&page=1',
    tv_series_base_URL: 'https://api.themoviedb.org/3/search/tv?api_key=f909dc835c7bb866b35d37713fed709d&language=it-IT',
    base_img_URL: 'https://image.tmdb.org/t/p/',
    query: null,

    fetchResults(URL, isMovie) {
        axios
            .get(URL)
            .then(response => {
                //console.log(response)
                if(isMovie){
                    this.movieList = response.data.results;
                    //console.log(this.movieList);
                }else{
                    this.tvSeriesList = response.data.results;
                    //console.log(this.tvSeriesList);
                }
            })
            .catch(error => {
                console.error(error)
            })
    },

    setURL(isMovie) {
        if(this.query !== undefined && this.query !== null) {
            if(isMovie){
                let newUrl = `${this.movie_base_URL}&query=${this.query}`;
                //console.log(newUrl);
                return newUrl;
            }else{
                let newUrl = `${this.tv_series_base_URL}&query=${this.query}`;
                //console.log(newUrl);
                return newUrl;
            }
        }
    },                      

    filteredSearch() {
        const movieCompleteURL = this.setURL(true);
        const tvSeriesCompleteURL = this.setURL(false);
        if(movieCompleteURL !== undefined || tvSeriesCompleteURL !== undefined){
            this.fetchResults( movieCompleteURL, true ) // cerco i film
            this.fetchResults( tvSeriesCompleteURL, false ) // cerco le serie TV
        }
    },
})