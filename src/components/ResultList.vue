<script>
import { state } from '../state';
import ResultItem from './ResultItem.vue';

export default {
    name: 'ResultList',
    data() {
        return {
            state,
        }
    },
    components: {
        ResultItem,
    },
    props: ['list'],
}
</script>

<template>
    <div class="col-12">
        <div class="row g-3">
            <ResultItem :item="movie" :list="list" v-for="movie in list"/>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>