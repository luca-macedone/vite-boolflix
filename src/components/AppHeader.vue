<script>
import { state } from '../state';
export default {
    name: 'AppHeader',
    data() {
        return {
            state,
        }
    }
}
</script>

<template>
    <header class="shadow">
        <nav class="navbar navbar-expand-lg py-2">
            <div class="container">
                <a class="navbar-brand py-0 m-0" href="#">Boolflix</a>
                <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapsibleNavId">
                    <font-awesome-icon icon="fa-solid fa-bars"/>
                </button>
                <div class="collapse navbar-collapse" id="collapsibleNavId">
                    <ul class="navbar-nav ms-auto d-flex gap-3 align-items-center">
                        <li class="nav-item active">
                            <a href="#">Home</a>
                        </li>
                        <li class="nav-item">
                            <a href="#">Serie TV</a>
                        </li>
                        <li class="nav-item">
                            <a href="#">Film</a>
                        </li>
                        <li class="nav-item">
                            <a href="#">Originali</a>
                        </li>
                        <li class="nav-item">
                            <a href="#">Aggiunti di recente</a>
                        </li>
                        <li class="nav-item">
                            <a href="#">La mia lista</a>
                        </li>
                        <li class="nav-item align-self-center p-2">
                            <div class="input-group" id="search-bar">
                                <input class="form-control rounded-0" type="text" v-model="state.query"
                                    @keyup.enter="state.filteredSearch()" placeholder="Squid Game">
                                <button class="btn rounded-0" @click="state.filteredSearch()">
                                    <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<style lang="scss" scoped>
@use '../assets/sass/partials/appHeader' as *;
</style>