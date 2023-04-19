<script>
import { state } from './state';
import AppHeader from './components/AppHeader.vue';
import AppMain from './components/AppMain.vue';

export default {
  data() {
    return {
      state,
    }
  },
  components: {
    AppHeader,
    AppMain,
  }
  // mounted() {
  //   this.state.fetchMovies(this.state.setURL()) 
  // },
}
</script>

<template>

  <AppHeader/>
  
</template>

<style lang="scss" scoped>
@use './assets/sass/app.scss';
</style>
