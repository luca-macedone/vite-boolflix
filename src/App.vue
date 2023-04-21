<script>
import { state } from './state';
import AppHeader from './components/AppHeader.vue';
import AppMain from './components/AppMain.vue';

export default {
  name: 'App',
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
  <div class="position-relative">
    <AppHeader/>
    <AppMain/>
  </div>
  
</template>

<style lang="scss">
@use './assets/sass/app.scss' as *;
</style>
