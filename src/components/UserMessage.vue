<template>
    <div style="">
        <div class="block" @click="setFileUpdateLoadPageShow(true)"><el-avatar :size="90" :src="userHeaderCircleUrl" @error="setHeadDefult"></el-avatar></div>
        <span class="userCaption">{{ userCaption }}</span>
        <br>
        <span class="userJob">{{ userJob }}</span>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
export default {
    name: 'UserMessage',
    computed:{
        ...mapState("firstPage",["userHeaderCircleUrl","userCaption","userJob"])
    },
    methods:{
        ...mapMutations("firstPage",["setFileUpdateLoadPageShow"]),
        ...mapActions("firstPage",["getUserHead"]),
        setHeadDefult(){
            console.log("Error loading image.");
        }
    },
    created(){
        this.getUserHead();
    }
};
</script>

<style lang="css" scoped>
.block{
    padding-top: 60px;
    cursor: pointer;
}
.userCaption{
    font-family: "MicrosoftYaHei";
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;
    text-align: left;
    color: #000;
}
.userJob{
    font-family: "MicrosoftYaHei ";
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    text-align: center;
    color: #6a6f74;
}
</style>