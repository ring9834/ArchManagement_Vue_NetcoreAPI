import axios from "axios";
export default {
    namespaced:true,
    mutations:{
        //获取密集柜表格展示信息
        getTableData(state,tableData){
            state.tableData = tableData;
        },
        clearTableData(state){
            while(state.tableData.pop()){}
        }
    },
    actions:{
        //获取密集柜表格信息
        getTableData(context,tableId){
            context.commit("setLoading",true,{root:true})
            axios.post(`/cabinet/queryCabinet/${tableId}`).then(
                Response=>{
                    if(Response.data.code==="0"){
                        context.commit("getTableData",Response.data.data);
                    }else{
                        context.commit("grounding/setWarningMsg",{"message":Response.data.message,"type":"error"},{root:true})
                    }
                },
                error=>{
                
            });
            context.commit("setLoading",false,{root:true});
        }
    },
    state:{
        tableData:[],//密集柜列表信息
    }
}