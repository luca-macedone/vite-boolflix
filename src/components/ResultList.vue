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
    methods: {
        filterByCategory(list){
            if(list){
                if(state.category !== -1){
                    return list.filter(item => {
                        return item.genre_ids == state.category;
                    })
                }else{
                    return list
                }
            }
        }
    },
}
</script>

<template>
    <div class="col-12 my-3">
        <div class="row g-3 justify-content-start">
            <ResultItem v-if="list" :item="result" :list="filterByCategory(list)" v-for="result in filterByCategory(list)"/>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>