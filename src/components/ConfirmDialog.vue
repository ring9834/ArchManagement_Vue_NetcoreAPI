<template>
    <!-- 确认弹窗 -->
    <transition name="fade" 
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        :duration="{ enter: 50, leave: 50 }">
        <div class="confirm-window">
            <div class="confirm-content">
                <p class="confirm-title">offload</p>
                <div class="confirm-body">Are you sure you want to offload the selected boxes?</div>
                <div class="confirm-btn">
                    <span :style="'color:' + cancelTextcolor + 'border-color:' + cancelBorder + 'background:' + cancelBgcolor" @click="cancelFun">{{cancelText}}</span>
                    <span :style="'color:' + confirmTextcolor + 'border-color:' + confirmBorder + 'background:' + confirmBgcolor" @click="confirmFun" style="background-color: #409EFF;">{{confirmText}}</span>
                </div>
            </div>
        </div>
    </transition>
</template>
 
<script>
import $ from "jquery";
export default {
  name:"ConfirmDialog",
  data() {
    return{
            scrollX:0,
            scrollY:0
        }
  },
  props: {
    showConfirmDialog:{
        typeof:Boolean
    },
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    cancelText: { // 取消按钮文案
      type: String,
      default: 'Cancel'
    },
    cancelTextcolor: { // 取消文案颜色
      type: String,
      default: '#2D2F32'
    },
    cancelBorder: { // 取消边框颜色
      type: String,
      default: '#A9B0BC'
    },
    cancelBgcolor: { // 取消背景色
      type: String,
      default: '#fff'
    },
    confirmText: { // 确认文案
      type: String,
      default: 'Confirm'
    },
    confirmTextcolor: { // 确认文字颜色
      type: String,
      default: '#2D2F32'
    },
    confirmBorder: { // 确认边框颜色
      type: String,
      default: '#A9B0BC'
    },
    confirmBgcolor: { // 确认背景颜色
      type: String,
      default: '#d9dbdd'
    }
  },
  created() {
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, true)
  },
  methods: {
    cancelFun () {
      this.$emit('cancelFun');
    },
    confirmFun () {
      this.$emit('confirmFun');
    },
    handleScroll() {
        this.$nextTick(()=>{
                var top = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;
                var left = document.body.scrollLeft || document.documentElement.scrollLeft ||window.pageXOffset;
                this.scrollX = top;
                this.scrollY = left;
            })
    }
  },
  watch:{
    scrollX(){
        $(".confirm-window").css({
                    left:this.scrollY,
                    top:this.scrollX
        })
    },
    scrollY(){
        $(".confirm-window").css({
                    left:this.scrollY,
                    top:this.scrollX
        });
    },
    showConfirmDialog(newVal,oldVal){
        if(newVal){
            $("html").css({
                "overflow": "hidden"
            });
        }else{
            $("html").css({
                "overflow": "visible"
            });
        }

    }
  }
};
</script>
 
<style lang="less">
.confirm-window {
    width: 100%;
    height: 100vh;
    z-index: 15;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    .confirm-content {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        background: #ddd9d9;
        width: 300px;
        text-align: center;
        padding: 22px 26px;
        box-sizing: border-box;
        .confirm-title {
            font-size: 20px;
            margin: 10px 0;
        }
        .confirm-body {
            font-size: 15px;
            text-align: left;
            margin: 20px 0;
        }
        .confirm-btn {
            display: flex;
            justify-content: space-between;
            align-items: center;
            span {
                width: 100px;
                display: inline-block;
                font-size: 15px;
                border-width:  1px;
                border-style: solid;
                border-radius: 50px;
                height: 20px;
                line-height: 20px;
                cursor: pointer;
            }
        }
    }
}
</style>