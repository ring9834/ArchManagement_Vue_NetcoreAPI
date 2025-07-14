<template>
  <div id="app" onselectstart="return false">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  beforeCreate(){
    // window.parent.parent.reactGPO.contextPath = "/OSPApplication";
    // window.parent.parent.reactGPO.UserName = "9999";
    // window.parent.parent.reactGPO.UserCaption = "管理员";
    // window.parent.parent.reactGPO.orgName = "华发物业";
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  /* user-select: none; */
}
</style>
