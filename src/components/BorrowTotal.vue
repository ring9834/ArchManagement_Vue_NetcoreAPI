<template>
    <div style="">
        <div>
            <div class="block"><el-avatar :size="60" :src="require('@/static/borrowVoucher.png')"></el-avatar><span class="borowSpan">Borrowed Times</span><span class="borrowTotalSum" style="color: #0081cc;">{{ borrowVoucherTotal }}</span></div>
        </div>
        <div>
            <div class="block"><el-avatar :size="60" :src="require('@/static/borrowBoxing.png')"></el-avatar><span class="borowSpan">Borrowed Copies</span><span class="borrowTotalSum" style="color: #2bb884;">{{ borrowComponentTotal }}</span></div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'BorrowTotal',
    computed:{
        ...mapState("firstPage",["borrowVoucherTotal","borrowComponentTotal"])
    }
};
</script>

<style lang="css" scoped>
    .block{
        text-align: left !important;
        margin-top: 42px;
        margin-left: 10px;
    }
    .borowSpan{
        position: relative;
        top:-29px;
        left: 12px;
        font-family: "MicrosoftYaHei ";
        font-weight: 400;
        font-size: 14px;
        color:#545758;;
    }
    .borrowTotalSum{
        font-family: "MicrosoftYaHei-Bold ";
        font-weight: 400;
        font-size: 26px;
        line-height: 45.5px;
        text-align: left;
        position: relative;
        top:-25px;
        left: 20px;
    }
</style>