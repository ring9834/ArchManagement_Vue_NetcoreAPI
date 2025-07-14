<template>
    <div>
        <div v-loading="loading" element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)">
            <el-button type="info" @click="backPage" round>Back</el-button>
            <el-button v-print="printObj" type="primary"  round>Print</el-button>
        </div>
        <div id="printDiv">
            <img v-for="(key,index) in QrCodePictureArr" :src="key.imageUrl" :key="index" width="220px" :height="key.height"/>
        </div>
    </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex';
export default {
    name: 'ImgPicture',
    computed:{
        ...mapState("QRcode",["QrCodePictureArr"]),
        ...mapState(["loading"])
    
    },
    methods:{
        backPage(){
            this.$router.back();
        },
        ...mapMutations("warehouseQuery",["clearTableData"]),
    },
    beforeRouteLeave(to,from,next){
        if(to.name!=="details"){
          this.clearTableData();
        }
        next();
    },
    data(){
        return {
            printObj: {
              id: "printDiv",
              popTitle: '华发物业',
              standard:"html5"
            }
        }
    }
};
</script>

<style lang="css" scoped>

</style>