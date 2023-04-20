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
    <header>
        <nav class="navbar navbar-expand-sm py-2">
            <div class="container">
                <a class="navbar-brand py-0 m-0" href="#">Boolflix</a>
                <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapsibleNavId">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="collapsibleNavId">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item align-self-center p-2">
                            <div class="input-group">
                                <input class="form-control rounded-0" type="text" v-model="state.query"
                                    @keyup.enter="state.filteredSearch()" placeholder="Squid Game">
                                <button class="btn btn-outline-light rounded-0" @click="state.filteredSearch()">
                                    🔍
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