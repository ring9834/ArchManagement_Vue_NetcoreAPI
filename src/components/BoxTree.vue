<template>
    <div class="boxOut">
        <div :class="lightClass" @click="BoxingClick" @mouseover="boxMouseOver()" @mouseout="boxMouseOut()"></div>
        <div class="hover-text" id="hover-text" v-show="isHoverShow"    ref="hover-text" :style="styleTopLeft">
            {{ boxKey["slotMc"]===null || boxKey["slotMc"]===""?(positionArr[0]+1)+"层-"+(positionArr[1]+1)+"节-"+(positionArr[2]+1)+"卡位":boxKey["slotMc"].split("柜-")[1] }}
            <div v-if="voucherCode!==''&& voucherCode!==null" style="height: 2px;white-space: nowrap;">
                {{ voucherCode }}
            </div>
            <br/>
            {{ getBoxingState }}
        </div>
        <div></div>
    </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from 'vuex';
import $ from 'jquery';
import axios from 'axios';
export default {
    data(){
        return{
            isHoverShow:false,
            styleTopLeft:{
                "top":"0px",
                "left":"0px",
            },
            scrollX:0,
            scrollY:0,
            voucherCode:""
        }
    },
    name: 'BoxTree',
    props:["boxKey","positionArr"],
    computed:{
        ...mapState("grounding",["changeBoxList","requestOutBox","isGroupingCabinet","downedBox"]),
        lightClass(){
            if(this.changeBoxList.indexOf(this.boxKey["fGuid"])!==-1){
                return "boxing isChange";
            }
            if(this.requestOutBox.indexOf(this.boxKey["fGuid"])!==-1){
                return "boxing outBox";
            }
            if(this.boxKey["dataId"]&&this.boxKey["dataId"]["dataId"]!==""&&this.boxKey["dataId"]!==null&& this.downedBox.indexOf(this.boxKey["fGuid"])===-1){
                return "boxing lighted";
            }else{
                return "boxing";
            }
        },
        getBoxingState(){
            if(this.changeBoxList.indexOf(this.boxKey["fGuid"])!==-1){
                return "【待上架】";
            }
            if(this.requestOutBox.indexOf(this.boxKey["fGuid"])!==-1){
                return "【待下架】";
            }
            if(this.boxKey["dataId"]&&this.boxKey["dataId"]["dataId"]!==""&&this.boxKey["dataId"]!==null){
                return "【已上架】";
            }
            else {
                return "【未上架】";
            }
        }
    },
    methods: {
        ...mapActions("grounding",["setBoxid"]),
        ...mapMutations("grounding",["setWarningMsg","setOutBox"]),
        BoxingClick(){
            if(this.$route.name==="grouping"){
                if(this.boxKey["dataId"]&&this.boxKey["dataId"]!==null && this.boxKey["dataId"]!==""){
                    // this.setWarningMsg({"message":"该卡位已上架盒，不能进行再次上架！","type":"error"})
                    if(this.isGroupingCabinet === "2"){
                        this.setOutBox({fileBagId:this.boxKey["fGuid"]})
                    }

            } else if(this.isGroupingCabinet === "1"){
                this.setBoxid({
                    "fileBagId":this.boxKey["fGuid"],
                    "fileBagName":this.boxKey["slotMc"]===null || this.boxKey["slotMc"]===""?(this.positionArr[0]+1)+"层-"+(this.positionArr[1]+1)+"节-"+(this.positionArr[2]+1)+"卡位":this.boxKey["slotMc"],
                    "repositoryId":this.boxKey["repositoryId"]
                });
                this.$forceUpdate();
            } 
            }
            debugger
            if(this.$route.name ==="GroupingQuery" && this.boxKey["dataId"]&&this.boxKey["dataId"]!==null && this.boxKey["dataId"]!==""){
                window.parent.parent.openReactForm(
                        {
                            id: this.boxKey.dataId,
                            caption: '档案装盒',
                            serverID: 'ARCHIVE', // 不需要可不传
                            config: {
                                displayType: 'OpenTab', // 打开方式，默认为 OpenTab:应用新tab页; DrawerForm: 抽屉； BrowserTab：浏览器tab页； OpenWindow：弹窗
                                forms: 'EA_BOXING',
                                OBJ_GUID:this.boxKey.dataId,
                                OBJ_DJZT:"2"
                            }
                        }
                    )
            }
        },
        boxMouseOver(){
            if(this.boxKey["dataId"]&&this.boxKey["dataId"]!==""&&this.boxKey["dataId"]!==null && (this.voucherCode==="" || this.voucherCode === null)){
                axios.post(`/cabinet/loadBoxCode/${this.boxKey["dataId"]}`).then(res=>{
                if(res.data.code==="0"){
                    this.voucherCode = res.data.data;
                }
            },error=>{

            })
            }
            this.isHoverShow = true;
            document.onmousemove=event=>{
                var offset = $(".CabinetTree").offset();
                var width = $(".hover-text").width()
                var x=event.clientX  + this.scrollY -  offset.left -width-15;
			    var y=event.clientY  +this.scrollX - offset.top +10;
				this.styleTopLeft["left"] = x+"px";
                this.styleTopLeft["top"] = y+"px";
            }
        },
        boxMouseOut(){
            this.isHoverShow = false;
            document.onmousemove=()=>{
                return null;
            }
        },
        handleScroll() {
        this.$nextTick(()=>{
                var top = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;
                var left = document.body.scrollLeft || document.documentElement.scrollLeft ||window.pageXOffset;
                this.scrollX = top;
                this.scrollY = left;
            })
        },  
    },
    mounted() {//可以在这里面直接进行滚动条的获取
	window.addEventListener('scroll', this.handleScroll, true);
    },
    beforeDestroy(){
        window.removeEventListener('scroll',this.handleScroll,true);
    }
}
</script>

<style lang="css" scoped>
.boxing {
    width: 18px;
    height: 50px;
    border: 1px solid #999999;
    margin-left: 10px;
    margin-top: 0px;
    cursor: pointer;
}
.boxOut{
    display: inline-block;
}
.lighted{
    background-color: rgb(127, 208, 255);
}
.isChange{
    background-color: rgb(180, 241, 10)!important;
}
.outBox{
    background-color: rgb(6, 105, 161)!important;
}
.hover-text {
  position: absolute;
  padding: 8px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
