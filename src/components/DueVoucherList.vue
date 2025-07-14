<template>
    <div>
        <div style="width: 100%;height: 32px; border-bottom: 2px solid #999999;">
            <div class="dueSum" style="float: left;padding-top: 2px;">Expired<span style="color: #fe4848;">
                {{ dueVoucherSum }}&nbsp;</span>copies
            </div>
            <div style="position: absolute; right: 0px;">
                <div style="background-color: #fff; margin-right: 20px; cursor: pointer;">
                    <div class="btn4" @click="openHandle"><span style=" font-size: 6px;">My To-Do</span></div>
                </div>
            </div>
        </div>
        <div style="width: 100%;margin-top: 14px;position: relative; left: -11.5px;">
            <div style="margin: 0 auto; white-space: nowrap;" :style="dueFileListStyle">
                <DueVoucher v-for="(DueVoucher,index) in dueVoucherList" :indexSum="index" :key="index" :dueVoucher="DueVoucher"/>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import DueVoucher from './DueVoucher.vue';
export default {
    name: 'DueVoucherList',
    computed:{
        ...mapState("firstPage",["dueVoucherList","dueVoucherSum"]),
        dueFileListStyle(){
            if(this.dueVoucherSum>=5){
                return {
                    textAlign:"center",
                }
            }else{
                return {
                    textAlign:"left",
                }     
            }
        }
    },
    components:{
        DueVoucher
    },
    methods:{
        openHandle(){
            window.parent.parent.openReactForm(
                    {
                        id: this.boxKey,
                        caption: 'My To-Do',
                        serverID: 'ARCHIVE', // 
                        config: {
                            displayType: 'OpenTab', // 
                            forms: 'sys_homepage_show',
                            DefaultManageFormID:"PICTURE_HOMEPAGE"
                        }
                    }
            )
        }
    }
};
</script>

<style lang="css" scoped>
.dueSum{
    font-family: "MicrosoftYaHei-Bold ";
    font-weight: 600;
    font-size: 18px;
    line-height: 24.5px;
    text-align: left;
    color: #2b3136;
}
.btn4 {
  display: inline-block;
  border-radius: 20px;
  background-color: rgb(220, 242, 250);
  border: none;
  color: #504d4d;
  text-align: center;
  font-size: 20px;
  width: 100px;
  height: 20px;
  line-height: 18px;
  transition: all 0.5s;
  cursor: pointer;
  vertical-align: middle;
}
 
.btn4 span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
  top:-2px;
}
 
.btn4 span::after {
  content: ">>";
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}
 
.btn4:hover span {
  padding-right: 30px;
}
 
.btn4:hover span::after {
  opacity: 1;
  right: 0;
}
</style>