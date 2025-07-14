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
            <div v-show="cabinetId!==''">
              <PageTree/>
              <hr style="height:1px;border:none;border-top:1px solid rgba(0,0,0,0.2);margin-top: 30px;" />
            <CabinetTree/>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import NavigationTree from '../components/NavigationTree.vue'
import CabinetTree from '../components/CabinetTree.vue';
import PageTree from '../components/pageTree.vue';
import {mapActions, mapState} from 'vuex';
export default {
    name: 'Grounding',
    components: {
    NavigationTree,CabinetTree,PageTree
  },
  props:["navigationBooolean"],
  beforeMount(){
    this.getNavigation(this.navigationBooolean);
  },
  methods:{
    ...mapActions("grounding",["getNavigation"])
  },
  computed:{
    ...mapState("grounding",["cabinetId","warningMsg","typeMsg"])
  }
};
</script>

<style lang="css" scoped>

</style>