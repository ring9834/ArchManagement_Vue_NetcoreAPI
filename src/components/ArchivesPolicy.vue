<template>
    <div>
        <ul style="list-style:none;margin-top:0px;height: 282px;">
            <li v-for="archivesPolicy in archivesPolicyArr" style="text-align: left !important; border-bottom: 1px solid rgba(61, 58, 58, 0.1);height: 50px; cursor: pointer;" @click="downLoadPolicyFile(archivesPolicy.fGuid)">
                <h4 class="archivesOrg">【{{archivesPolicy.policyTitle}}】</h4>
                <div class="archivesMessqge">
                    {{ archivesPolicy.policyPurpuse }}
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
    name: 'ArchivesPolicy',
    computed:{
        ...mapState("firstPage",["archivesPolicyArr"])
    },
    methods:{
        ...mapActions("firstPage",["downLoadPolicyFile"])
    }
};
</script>

<style lang="css" scoped>
.archivesMessqge{
    display: inline-block;
}
.archivesOrg{
    display: inline-block;
}
</style>