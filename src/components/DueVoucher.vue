<template>
    <div style="display: inline-block;margin-left: 33px; cursor: pointer; color: #6e6c6c; text-align: center;" @click="openPage()">
        <div :id="'dueFile'+indexSum" :style="dueFileStyle">
            <div class="fCode">{{ ''+dueVoucher.infoCode }}</div>
            <div style="height:28px ; text-align: left !important; margin-left: 25px;">
                <span >Arch Details：</span>
                <ul style="margin: 0;">
                    <li v-for="detailName,index in detailNameArr" :key="index">{{ detailName }}</li>
                    <li v-show="dueVoucher && dueVoucher.detailName && dueVoucher.detailName.length>4">......</li>
                </ul>
            </div>
            <div class = "returnDay">{{ returnDayStr }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DueVoucher',
    props:["dueVoucher","indexSum"],
    computed:{
        dueFileStyle(){
            return{clear:"both",width: '235px',height: '235px',display: 'inline-block' ,'backgroundSize':'cover','backgroundRepeat':'no-repeat','backgroundPosition':'center','backgroundImage':'url(' + require(`@/static/${this.indexSum+1}.png`) + ')'}
        },
        detailNameArr(){
            if(this.dueVoucher&& this.dueVoucher.detailName && this.dueVoucher.detailName.length>4){
                return this.dueVoucher.detailName.slice(0,4)
            } else{
                return this.dueVoucher.detailName;
            }
            
        },
        returnDayStr(){
            if(this.dueVoucher.dueDay>=0){
                return `剩余${this.dueVoucher.dueDay}天`;
            }
            else{
                return `逾期${Math.abs(this.dueVoucher.dueDay)}天`;
            }
        }
    },
    methods:{
        openPage(){
            window.parent.openReactForm(
                    {
                        id: this.boxKey,
                        caption: 'Arch Borrow',
                        serverID: 'ARCHIVE', // 不需要可不传
                        config: {
                            displayType: 'OpenTab', // 打开方式，默认为 OpenTab:应用新tab页; DrawerForm: 抽屉； BrowserTab：浏览器tab页； OpenWindow：弹窗
                            forms: 'EA_BORROW',
                            OBJ_GUID:this.dueVoucher.infoFGuid,
                            OBJ_DJZT:this.dueVoucher.djzt
                        }
                    }
            )
        }
    }
};
</script>

<style lang="css" scoped>
.returnDay{
    position: relative;
    top: 70.5px; 
    left: 66px;
    font-family: "MicrosoftYaHei-Bold";
    font-weight: 550;
    font-size: 16px;
    line-height: 33px;
    color: #fff;
}
.fCode{
    text-align: center;
    padding-top: 70px;
    width: 235px;
    font-size: 20px;
    overflow: hidden;
    text-overflow:ellipsis;

}
</style>