<template>
    <div>
        <el-tree  :data="navigation" :props="defaultProps" @node-click="handleNodeClick" :highlight-current="true"></el-tree>
    </div>
</template>

<script>
import {mapActions,mapState} from "vuex";
export default {
    name: 'NavigationTree',
    props:["navigationBooolean"],
    data(){
    },
    methods: {
      ...mapActions("grounding",["getCabinetArr"]),
      ...mapActions("warehouseQuery",["getTableData"]),
      handleNodeClick(data) {
        if(data.mx&&data.mx==="1"&&this.navigationBooolean==="1"){
          let cabinetId = data.id;
          let pageNum = data.face;
          this.getCabinetArr({
            "cabinetId":cabinetId,"pageNum":pageNum,"pageSelect":1
          });
        } else if(data.mx&&data.mx==="0"&&this.navigationBooolean ==="2"){
          if(this.$route.name !=="details"){
            this.$router.push({"name":"details"});
          }
          this.getTableData(data.id);
        } else if(data.mx&&data.mx==="1"&&this.navigationBooolean ==="2"){
          let cabinetId = data.id;
          let pageNum = data.face;
          this.getCabinetArr({
            "cabinetId":cabinetId,"pageNum":pageNum,"pageSelect":1
          });
          if(this.$route.name !=="GroupingQuery"){
            this.$router.push({"name":"GroupingQuery"});
          }
        } else if(data.mx&&data.mx==="2"&&this.navigationBooolean ==="2"){
          if(this.$route.name !=="warehouseQuery"){
            this.$router.push({"name":"warehouseQuery"});
          }
        }
      }
    },
    data(){
    return {
      defaultProps: {
        children: 'children',
        label: 'name',
      },
    }
  },
  computed:{
    ...mapState("grounding",["navigation"]),
  },
  beforeRouteLeave(to,from,next){
        next();
    },
  };

</script>

<style lang="css">
.el-tree-node__content{
  font-size: 18px;
}
.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
  background-color: rgb(152, 179, 179);
}
.el-tree-node__content:hover{
  background-color: rgb(152, 179, 179);
}
</style>