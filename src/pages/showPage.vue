<template>
    <div id="app">
      <el-row :gutter="24">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="header">
              <img src="../assets/logo.png" width="15px" height="15px"/>
              <span>档案库房</span>
            </div>
          </div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple resize" style="background:#b9bbc0; text-align:left;">
            <div class="header" style="left: 20px;top: 2px;">
              <img src="../assets/logo.png" width="15px" height="15px"/>
              <span>档案密集架</span>
            </div>
          </div>
        </el-col>
      </el-row>
      <router-view></router-view>
      <WarningAlter :warningMsg = "warningMsg" :typeMsg="typeMsg" :isShowPage="'1'"/>
      <ConfirmDialog
        v-show="showConfirmDialog"
        :showConfirmDialog = "showConfirmDialog"
        title="订单取消"
        content="取消后不可恢复，是否确认取消？"
        @cancelFun="cancelFun"
        @confirmFun="confirmFun"
        >
        </ConfirmDialog>
    </div>
  </template>
  
  <script>
  
  import { mapState,mapMutations,mapActions} from 'vuex';
  import WarningAlter from '../components/WarningAlter.vue';
  import Grounding from "./Grounding.vue";
  import ConfirmDialog from '../components/ConfirmDialog.vue';
  export default {
    name: 'ShowPage',
    components:{
      Grounding,WarningAlter,ConfirmDialog
    },
    computed:{
      ...mapState("grounding",["warningMsg","typeMsg","showConfirmDialog"]),
    },
    methods:{
      ...mapMutations("grounding",["setShowConfirmDialog"]),
      ...mapActions("grounding",["clearOutBox"]),
      confirmFun(){
            this.clearOutBox();
            this.setShowConfirmDialog(false);
        },
        cancelFun(){
          this.setShowConfirmDialog(false);
        }
    }
  }
  </script>
  
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .el-row {
      margin-bottom: 20px;
      width: 100%;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
      border-radius: 2px;
    }
    .bg-purple-dark {
      background: #99a9bf;
    }
    .bg-purple {
      background: #f9fafc;
    }
    .bg-purple-light {
      background: #687db3;
    }
    .grid-content {
      border-radius: 4px;
      min-height: 36px;
    }
    .row-bg {
      padding: 10px 0;
      background-color: #d9e1f1;
    }
    .header{
      display: inline-block;
      position: relative;
      top: 0px;
      left: -100px;
      width: 300px;
      font-weight: 600;
      font-size: 20px;
    }
  </style>
  