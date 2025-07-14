<template>
    <div>
        <el-row :gutter="24">
            <el-col :span="5">
            <div class="grid-content bg-purple" >
                <NavigationTree :navigationBooolean="navigationBooolean"/>
            </div>
            </el-col>
            <el-col :span="19">
            <div class="grid-content bg-purple resize" style=" padding-bottom: 100px;" >
                <router-view></router-view>
            </div>
            </el-col>
        </el-row>
        
    </div>
</template>

<script>
import NavigationTree from "../components/NavigationTree.vue";
import {mapActions} from 'vuex'
export default {
    name: 'WarehouseQuery',
    components:{
        NavigationTree
    },
    props:["navigationBooolean"],
    beforeMount(){
    this.getNavigation(this.navigationBooolean);
  },
  methods:{
    ...mapActions("grounding",["getNavigation"])
  },
};
</script>

<style lang="scss" scoped>

</style>