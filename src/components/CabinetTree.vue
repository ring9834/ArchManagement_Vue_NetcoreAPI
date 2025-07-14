<template>
    <div class="CabinetTree" style="position: relative; top: 10px; width: 100%; white-space: nowrap;display: inline-block;">    
        <LayerTree v-for="(boxArr,index) in CabinetArr" :boxArr="boxArr" :XAxis="index">
            <span>{{ "Layer"+(index+1)+"" }}</span>
        </LayerTree>
    </div>
</template>
<script>
import LayerTree from './LayerTree.vue';
import { mapState} from 'vuex';
import $ from 'jquery';
export default {
    name: 'CabinetTree',
    components:{
        LayerTree
    },
    computed:{
        ...mapState("grounding",["CabinetArr"]),
    },
    methods:{
        setPageSize(){
            var width = $(".jointParent").width()+100;
            var userSeeWidth = $(".resize").width();
            if(width>userSeeWidth){
                $(".resize").css({
                width:width+"px"
            })
            } else{
                $(".resize").css({
                width:"100%"
            })  
            }
        }
    },
    mounted() {
        this.setPageSize();
    },
    updated(){
        this.setPageSize();
    },  
};
</script>

<style lang="scss" scoped>

</style>