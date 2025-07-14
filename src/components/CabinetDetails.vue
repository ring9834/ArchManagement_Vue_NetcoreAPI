<template>
    <div style="padding-top: 0px;">
      <el-button type="primary" @click="getQRCodePictureClick" round>Get QR Code</el-button>
        <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        @selection-change="handleSelectionChange"
            v-loading="loading" 
            element-loading-text="Loading..."
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
        >
            <el-table-column
            type="selection"
            width="50">
            </el-table-column>
            <el-table-column
            prop="cabinetName"
            label="档案密集架"
            width="180">
            </el-table-column>
            <el-table-column
            prop="archiveCenterName"
            label="Arcchive Center"
            width="180">
            </el-table-column>
            <el-table-column
            prop="repositoryName"
            label="Repository Name">
            </el-table-column>
            <el-table-column
            prop="levelNum"
            label="Layers">
            </el-table-column>
            <el-table-column
            prop="faceNum"
            label="Faces">
            </el-table-column>
            <el-table-column
            prop="jointNum"
            label="Joints">
            </el-table-column>
            <el-table-column
            prop="slotNum"
            label="Slots">
            </el-table-column>
            <el-table-column
            prop="upRate"
            label="Shelving Rate">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { mapState,mapMutations,mapActions } from 'vuex';
export default {
    name: 'CabinetDetails',
    methods: {
      ...mapMutations("QRcode",["setQRCodeIdArr"]),
      ...mapActions("QRcode",["getQRCodePictureArr"]),
      ...mapMutations("warehouseQuery",["clearTableData"]),
        tableRowClassName({row, rowIndex}) {
        if (rowIndex%2 === 0) {
          return 'warning-row';
        } else{
            return 'success-row'
        }
      },
      //选中之后的函数
      handleSelectionChange(val) {
        this.setQRCodeIdArr(val);
      },
      getQRCodePictureClick(){
        this.getQRCodePictureArr(this);
      }
    },
    computed:{
      ...mapState("warehouseQuery",["tableData"]),
      ...mapState(["loading"])
    },
    //通过路由规则，离开该组件被调用
    beforeRouteLeave(to,from,next){
        if(to.name!=="ImgPicture"){
          this.clearTableData();
        }
        next();
    },
};
</script>

<style lang="css">
 .el-table .warning-row {
    background: rgb(250, 250, 250);
  }
  .el-button{
    float: right;
    margin: 10px;
  }
  .el-table .success-row {
    background: rgb(255, 255, 255);
  }
  .cell{
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
  }
  .el-table__body td{
    padding: 10px 0 !important;
  }

.el-table {
    --el-table-row-hover-background-color: rgb(31, 117, 204) !important;
}
</style>