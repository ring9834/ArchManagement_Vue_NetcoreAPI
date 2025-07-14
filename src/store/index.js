import Vue from "vue";
import Vuex from "vuex";
import grounding from "./grounding";
import warehouseQuery from "./warehouseQuery";
import QRcode from "./QRcode";
import firstPage from "./firstPage";

Vue.use(Vuex);
var state={
    loading:false
}
var mutations = {
    setLoading(state,val){
        state.loading = val;
    }
}
const store = new Vuex.Store({
    state,mutations,
    modules:{
        grounding,
        warehouseQuery,
        QRcode,
        firstPage
    }
});
export default store;