<template>
    <div v-show="warningMsg!==''" class="Masking-layer" >
        <div v-if="warningMsg!==''" style="position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%);">
            <el-alert
                @close="setWarningMsg({'message':'','type':''})"
                :title="typeMsg==='error'?'':''"
                :type="typeMsg"
                :description="warningMsg"
                show-icon>
            </el-alert>
        </div>
    </div>
</template>

<script>
import {mapMutations} from 'vuex';
import $ from "jquery";
export default {
    name: 'WarningAlter',
    data(){
        return{
            scrollX:0,
            scrollY:0
        }
    },
    props:["warningMsg","typeMsg","isShowPage"],
    methods:{
        ...mapMutations("grounding",["setWarningMsg"]),
        handleScroll() {
        this.$nextTick(()=>{
                var top = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;
                var left = document.body.scrollLeft || document.documentElement.scrollLeft ||window.pageXOffset;
                this.scrollX = top;
                this.scrollY = left;
            })
        }
    },
    mounted() {
	window.addEventListener('scroll', this.handleScroll, true)
    },
    watch:{
        warningMsg(newValue,oldValue){
            if (this.isShowPage==="0") {
                return;
            }
            if(newValue !==''){
                $("html").css({
                    "overflow": "hidden"
                });
                $(".Masking-layer").css({
                    left:this.scrollY,
                    top:this.scrollX
                })
            } else{
                $("html").css({
                    "overflow": "visible"
                });
            }
        }
    }
};
</script>

<style lang="css" >
.el-alert__closebtn{
    font-size: 30px !important;
}
.el-alert__description{
    font-size: 22px !important; 
    margin-left: 40px !important;
    margin-right: 40px !important;
    margin-bottom: 30px !important;
}
.el-alert__title{
    font-size: 26px;
}
.el-alert__icon{
    position: relative;
    top:5px;
    left: 40px;
}
.el-alert__content{
    padding-top: 30px;
}
.Masking-layer{
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}
</style>