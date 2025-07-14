<template>
    <div>
        <div>
              <PageTree/>
              <hr style="height:1px;border:none;border-top:1px solid rgba(0,0,0,0.2);margin-top: 30px;" />
            <CabinetTree/>
        </div>
    </div>
</template>

<script>
import CabinetTree from '../components/CabinetTree.vue';
import PageTree from '../components/pageTree.vue';
export default {
    name: 'GroundingQuery',
    components: {
    CabinetTree,PageTree
  },
  props:["navigationBooolean"]
};
</script>

<style lang="scss" scoped>

</style>