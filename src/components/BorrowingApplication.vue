<template>
    <div>
        <ul>
            <li v-for="borrowApplication in borrowApplicationArr" :key="borrowApplication.fGuid" style="padding-bottom:5px; color: #55565a; border-bottom: 1px solid rgba(61, 58, 58, 0.1);cursor: pointer;" @click="openPage(borrowApplication.fGuid,borrowApplication.djzt)">
                    <tr style="position: relative; top:3px;">
                        <td style="width: 167px; text-align: left !important;padding-left: 31px;"><a><div style="overflow: hidden;text-overflow:ellipsis; width: 167px">{{ borrowApplication.code }}</div></a></td>
                        <td style="padding-left: 417px;">档案借阅</td>
                        <td style="padding-left: 417px;">{{ borrowApplication.fCreate | timestampToTime  }}</td>
                    </tr>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'BorrowingApplication',
    computed:{
        ...mapState("firstPage",["borrowApplicationArr"])
    },
    methods:{
        openPage(fGuid,djzt){
            window.parent.openReactForm(
                    {
                        id: this.boxKey,
                        caption: '档案借阅',
                        serverID: 'ARCHIVE', // 服务器ID
                        config: {
                            displayType: 'OpenTab', // 打开方式，OpenTab，DrawerForm，BrowserTab，OpenWindow，
                            forms: 'EA_BORROW',
                            OBJ_GUID:fGuid,
                            OBJ_DJZT:djzt
                        }
                    }
            )
        }
    },
    filters:{
        timestampToTime(timestamp){
            let timestampFormat = Date.parse(new Date(timestamp).toString());
            timestampFormat = timestampFormat ? timestampFormat : null;
            let date = new Date(timestampFormat);//timestampFormat
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
            let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
            return Y + M + D + h + m + s;
        }
    }

};
</script>

<style lang="css" scoped>
 ul li::marker{
    content: url('../static/pointLi.png');
    width: 5px;
 }
 a {
    text-decoration:none;
      color:#999999;
      font-weight:bold;
 }
</style>