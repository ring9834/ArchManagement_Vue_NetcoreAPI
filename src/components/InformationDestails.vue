<template>
    <div style="margin-left: 5px;">
        <div style="text-align: left !important;cursor: pointer;" @click="openInfoDetails">
            <div class="timeFormat">
                <div style="padding-top: 5px;font-family: 'Microsoft YaHei';font-weight: 400;font-size: 14px;color: #0081cc;">{{ information.yearAndMount }}</div>
                <div style="padding-top: 7px; font-family: 'Microsoft YaHei Bold';font-weight: 800;font-size: 16px;color: #0081cc;">{{ information.day }}</div>
            </div>
            <div style="display: inline-block; margin-left: 50px; position: relative; top: -7px;">
                <div style="font-family: 'Microsoft YaHei';font-weight: 700;font-size: 16px; letter-spacing: 0;  color: #4b5053; width: 500px;  overflow: hidden;text-overflow: ellipsis;white-space: nowrap; ">{{ informationTilte }}</div>
                <div style="font-family: 'Microsoft YaHei';font-weight: 400;font-size: 15px;color: #9a9fa2;  width: 584px; overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{ informationDetails }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'InformationDestails',
    props:["information"],
    computed:{
        informationDetails(){
            var informationDetails = this.information.informationDetails;
            return informationDetails.replace(/<\/?.+?>/g,"").replace(/ /g,"");
        },
        informationTilte(){
            var informationTilte = this.information.informationTiTle;
            return informationTilte.replace(/<\/?.+?>/g,"").replace(/ /g,"");
        }
    },
    methods:{
        openInfoDetails(){
            window.parent.parent.openReactComp({
                id:this.information.guid,
                caption: '通知公告详情',
                "F_MC":"通知公告详情",
                title:"通知公告详情",
                serverID: 'ARCHIVE', // 不需要可不传
                config: {
                            displayType: 'OpenTab',
                            formType: 'ReactComp',
                            "reactCompType":"infodetails"
                        }
            })
        }
    }
};
</script>

<style lang="css" scoped>
.timeFormat{
    background-image: url('../static/timeFormat.png');
    background-size:cover;
    background-repeat:no-repeat;
    background-position:center;
    width: 75px;
    height: 68px;
    margin-bottom: 12px;
    display: inline-block;
    text-align: center;
}
</style>