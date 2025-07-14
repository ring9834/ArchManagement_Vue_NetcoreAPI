<template>
    <div>
        <InformationDestails v-for="information,index in informationArr" :information="information" :key="index"/>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import InformationDestails from './InformationDestails.vue';
export default {
    name: 'InformationList',
    computed:{
        ...mapState("firstPage",["informationArr"])
    },
    components:{
        InformationDestails
    }
}
</script>

<style lang="scss" scoped>

</style>