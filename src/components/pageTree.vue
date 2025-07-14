<template>
    <div>
        <span>面选择：</span>
        <select class="form-control info-select" @change="setPageSelect($event.target.value)">
            <option value="1" :selected="pageSelect===1">Face A</option>
            <option value="2" v-show="pageNum==='2'" :selected="pageSelect===2">Face B</option>
        </select>
        <div style="display: inline-block;" v-if="isGroupingCabinet==='1'">
            <el-button type="success" @click="clearChangeBox" round>Cancel Pending Shelves</el-button>
        </div>
        <div style="display: inline-block;" v-if="isGroupingCabinet==='2'">
            <el-button type="primary" @click="downCabinet" round>Down Shelf</el-button>
        </div>
    </div>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex';
export default {
    name: 'PageTree',
    data(){
        return{
            showConfirmDialog:false
        }
    },
    computed:{
        ...mapState("grounding",["pageNum","pageSelect","requestOutBox","isGroupingCabinet"])
    },
    methods:{
        ...mapActions("grounding",["setPageSelect","clearOutBox"]),
        ...mapMutations("grounding",["clearChangeBox","setShowConfirmDialog","setWarningMsg"]),
        downCabinet(){
            if(this.requestOutBox.length >0){
                this.setShowConfirmDialog(true);
            }else{
                this.setWarningMsg({"message":"Select a box to down shelf！","type":"error"})
            }
        }
    },
};
</script>

<style lang="css" scoped>
div{
    text-align:left;
}
.el-button{
    float: none;
    margin: 10px;
  }
.form-control {
    display: inline-block;
    width: 300px;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
}

/* IE浏览器下隐藏下拉按钮 */
select::-ms-expand { display: none; }     

/* 定义隐藏下拉框默认样式及图片覆盖下拉按钮 */   
.info-select{
    width: 300px;
    outline:none;
    appearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;
    -ms-appearance:none;
    background: #fff no-repeat scroll right center transparent;  
    margin-right: 80px;         
}
</style>