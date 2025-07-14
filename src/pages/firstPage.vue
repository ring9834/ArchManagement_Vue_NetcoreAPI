<template>
    <div id="firstPage"
    v-loading="loadingDownload" element-loading-text="拼命下载档案政策中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
    >
        <el-row :gutter="8">
            <el-col :span="4" class="userMessage">
                <div class="grid-content bg-purple" style="height: 290px;">
                    <UserMessage/>
                </div>
            </el-col>
            <el-col :span="20">
                <div class="grid-content bg-purple" style="height: 290px;">
                    <DueVoucherList/>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="8">
            <el-col :span="4">
                <div class="grid-content bg-purple" style="height: 271px;">
                    <div style="text-align: left !important;">
                        <span class="borrowTotalSpan">档案借阅</span>
                    </div>
                    <hr>
                    <div>
                        <BorrowTotal/>
                    </div>
                </div>
            </el-col>
            <el-col :span="20">
                <div class="grid-content bg-purple" style="height: 271px">
                    <div style="text-align: left !important;">
                        <span class="borrowTotalSpan">借阅申请</span>
                    </div>
                    <hr>
                    <div>
                        <BorrowingApplication/>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="8">
            <el-col :span="12">
                <div class="grid-content bg-purple" style="height: 309px">
                    <div style="text-align: left !important;">
                        <span class="borrowTotalSpan">档案法规</span>
                    </div>
                    <hr>
                    <div>
                        <ArchivesPolicy/>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple" style="height: 309px;">
                    <div style="text-align: left !important;">
                        <span class="borrowTotalSpan">内部消息</span>
                        <div class="btn4" @click="openDetails"><span style=" font-size: 0.1em;">more...</span></div>
                    </div>
                    <hr>
                    <div>
                        <InformationList/>
                    </div>
                </div>
            </el-col>
        </el-row>
        <UpLoadHeadPicture v-if="fileUpdateLoadPageShow"/>
        <WarningAlter :warningMsg = "warningMsg" :typeMsg="typeMsg" :isShowPage="'0'"/>
    </div>
</template>

<script>
import $ from 'jquery';
import {mapActions,mapMutations,mapState} from "vuex";
import UserMessage from '@/components/UserMessage.vue';
import DueVoucherList from '@/components/DueVoucherList.vue';
import BorrowTotal from '@/components/BorrowTotal.vue';
import BorrowingApplication from "@/components/BorrowingApplication.vue";
import ArchivesPolicy from "@/components/ArchivesPolicy.vue";
import InformationList from "@/components/InformationList.vue";
import UpLoadHeadPicture from '@/components/UpLoadHeadPicture.vue';
import WarningAlter from '@/components/WarningAlter.vue';
export default {
    name: 'FirstPage',
    components:{
        UserMessage,DueVoucherList,BorrowTotal,BorrowingApplication,ArchivesPolicy,InformationList,UpLoadHeadPicture,WarningAlter
    },
    methods:{
        ...mapActions("firstPage",["getBorrowVoucher","getInformation","getPolicyList"]),
        ...mapMutations("firstPage",["setIsLoadingFristPage"]),
        openDetails(){
            window.parent.parent.openReactComp({
                id:"12345",
                caption: '内部消息',
                serverID: 'ARCHIVE', // 服务器ID
                config: {
                            displayType: 'OpenTab',
                            formType: 'ReactComp',
                            reactCompType: 'infoalllist',
                            "F_TYPE":"Notice",
                            "infoReactCompType":"infodetails"
                        }
            })
        },
        setScale () {
      let ratio = 0
      const screen = window.screen
      const ua = navigator.userAgent.toLowerCase()
      if (window.devicePixelRatio !== undefined) {
        ratio = window.devicePixelRatio
      } else if (~ua.indexOf('msie')) {
        if (screen.deviceXDPI && screen.logicalXDPI) {
          ratio = screen.deviceXDPI / screen.logicalXDPI
        }
      } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
        ratio = window.outerWidth / window.innerWidth
      }
      if (ratio) {
        ratio = Math.round(ratio * 100)
        if (~ua.indexOf('firefox')) {
          document.body.style.MozTransform = 'scale(' + ((100 / ratio) * 100) / 100 + ')'
          document.body.style.MozTransformOrigin = '0 0'
          document.body.style.right = (100 - ratio) + '%'
          document.body.style.bottom = (100 - ratio) + '%'
        } else {
          document.body.style.zoom = Math.floor((100 / ratio) * 100) / 100
        }
      }
    }
    },
    watch:{
        isLoadingFristPage(newVal,oldVal){
            this.getBorrowVoucher();
            this.getInformation();
            this.getPolicyList();
        }
    },
    mounted(){
        this.$nextTick(()=>{
            $("#app").css({
                "margin-top":"0px"
            });
            $("html").css({
                "overflow": "hidden"
            })
        })
        let that = this
        window.addEventListener('resize', function () {
        that.setScale()
        })
    },
    created(){
        this.getBorrowVoucher();
        this.getInformation();
        this.getPolicyList();
        this.setScale()
    },
    computed:{
        ...mapState("firstPage",["fileUpdateLoadPageShow","loadingDownload","isLoadingFristPage"]),
        ...mapState("grounding",["warningMsg","typeMsg"]),
    }
};
</script>

<style lang="css" scoped>
.userMessage{
border-radius: 3px;
background: #fff !important;
}
.borrowTotalSpan{
    font-family: "MicrosoftYaHei-Bold ";
    font-weight: 600;
    font-size: 18px;
    line-height: 34px;
    color: #2b3136;
}
/* #firstPage{
    
} */
.btn4 {
    float:right;
    margin-top: 5px;
    display: inline;
    border-radius: 20px;
    background-color: rgb(220, 242, 250);
    border: none;
    color: #504d4d;
    text-align: center;
    font-size: 20px;
    width: 80px;
    height: 20px;
    line-height: 18px;
    transition: all 0.5s;
    cursor: pointer;
    vertical-align: middle;
    position: relative;
    left: -20px;
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
.el-row{
    margin-bottom: 5px !important;
}

</style>