<script>
import { state } from './state';
export default {
  data() {
    return {
      state,
    }
  },
  methods: {
    filteredSearch() {
      this.state.fetchMovies(this.state.setURL())
    }
  },
  // mounted() {
  //   this.state.fetchMovies(this.state.setURL()) 
  // },
}
</script>

<template>
  <header>
    <input type="text" v-model="state.query">
    <button @click="filteredSearch()">Cerca</button>
  </header>
  <main>
    <div class="card" v-for="movie in state.movieList">
      {{ movie.original_title }}
    </div>
  </main>
</template>

<style lang="scss" scoped>
@use './assets/sass/app.scss';
</style>
