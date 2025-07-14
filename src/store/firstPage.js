import axios from "axios";
export default {
    namespaced:true,
    mutations:{
        getBorrowVoucher(state,data){
            state.borrowApplicationArr = data.borrowApplicationDTOList;
            state.dueVoucherList = data.dueVoucherDTOList;
            state.borrowComponentTotal = data.borrowTotal.borrowComponentTotal;
            state.borrowVoucherTotal = data.borrowTotal.borrowVoucherTotal;
            if(data.dueVoucherDTOList && data.dueVoucherDTOList.length>0){
                state.dueVoucherSum =  data.dueVoucherDTOList[0].dueVoucherSum;
            } else{
                state.dueVoucherSum = 0 ;
            }
            window.parent.parent.isLoadingFristPage = state.isLoadingFristPage;
        },
        getInformation(state,data){
            state.informationArr = data;
        },
        getPolicyList(state,data){
            state.archivesPolicyArr = data;
        },
        setFileUpdateLoadPageShow(state,isShow){
            state.fileUpdateLoadPageShow = isShow;
        },
        setUserHeaderCircleUrl(state,file){
            if(file!==null && file!==""){
                state.userHeaderCircleBlob = file;
                if(window.createObjectURL != undefined){
                    state.userHeaderCircleUrl = window.createObjectURL(file);
                } else if(window.URL != undefined){
                    state.userHeaderCircleUrl = window.URL.createObjectURL(file);
                } else if(window.webkitURL != undefined){
                    state.userHeaderCircleUrl = window.webkitURL.createObjectURL(file);
                }
            }
        },
        setLoading(state,val){
            state.loadingUpload = val;
        },
        setLoadingDown(state,val){
            state.loadingDownload = val;
        },
        setHeadDefult(state){
            state.userHeaderCircleBlob = "";
            state.userHeaderCircleUrl = require("@/static/userHeader.png");
        }
    },
    actions:{
        getBorrowVoucher(context){
            axios.post(`/firstPage/borrowVoucher/${context.state.userName}`).then(Response=>{
                if(Response.data.code==="0"){
                    context.commit("getBorrowVoucher",Response.data.data);
                } else{
                    context.commit(
                        "grounding/setWarningMsg",
                        { message: Response.data.message, type: "error" },
                        { root: true }
                      );
                }
            },
            error=>{
                context.commit(
                    "grounding/setWarningMsg",
                    { message: error.data, type: "error" },
                    { root: true }
                  );
            })
        },
        getInformation(context){
            axios.post(`/firstPage/getInformation`).then(Response=>{
                if(Response.data.code==="0"){
                    context.commit("getInformation",Response.data.data);
                } else{
                    context.commit(
                        "grounding/setWarningMsg",
                        { message: Response.data.message, type: "error" },
                        { root: true }
                      );
                }
            },
            error=>{
                context.commit(
                    "grounding/setWarningMsg",
                    { message: error.data, type: "error" },
                    { root: true }
                  );
            })
        },
        getPolicyList(context){
            axios.post(`/firstPage/getPolicy`).then(Response=>{
                if(Response.data.code==="0"){
                    context.commit("getPolicyList",Response.data.data);
                } else{
                    context.commit(
                        "grounding/setWarningMsg",
                        { message: Response.data.message, type: "error" },
                        { root: true }
                      );
                }
            },
            error=>{
                context.commit(
                    "grounding/setWarningMsg",
                    { message: error.data, type: "error" },
                    { root: true }
                  );
            })
        },
        async uploadHeadPic(context,{file,vc}){
            if(file.size>1048576){
                vc.title = "文件过大，请小于1M!";
                vc.isShowAlter = true;
                return;
            }
            context.commit("setLoading",true);
            const formData = new FormData();
            formData.append("file",file);
            await axios.post(`/general/uploadHeadPic/${context.state.userName}`,formData,{
                "Content-Type": "multipart/form-data;charset=utf-8"
            }).then(Response=>{
                if(Response.data.code==="0"){
                    context.commit("setUserHeaderCircleUrl",file);
                }else{
                    vc.title = Response.data.message.split(": ")[1];
                    vc.isShowAlter = true;
                }
                context.commit("setLoading",false);
            },
            error=>{
                    vc.title = error.data;
                    vc.isShowAlter = true;
                    context.commit("setLoading",false);
            })
        },
        async getUserHead(context){
            axios.get(`/general/viewUserHeadPic/${context.state.userName}`,{
                responseType: 'blob'
            }).then(Response=>{
                if(Response.data.type.indexOf("image")!==-1){
                    const blob = new Blob([Response.data], { type: Response.data.type });
                    context.commit("setUserHeaderCircleUrl",blob);
                }else{
                    context.commit("setHeadDefult");
                    console.log("没有上传头像");
                }
 
            },
            error=>{
                console.log(error.data);
            })
        },
        async downLoadPolicyFile(context,fguid){
            context.commit("setLoadingDown",true);
            await axios.get(`/general/batchDownloadFile/${fguid}/${context.state.userName}`,{
                responseType: 'blob'
            }).then(Response=>{
                if(Response.data.type==="multipart/form-data"){
                    const blob = new Blob([Response.data], { type: Response.data.type });
                    const link = document.createElement('a');
                    let url = "";
                    if(window.createObjectURL != undefined){
                        url = window.createObjectURL(blob);
                    } else if(window.URL != undefined){
                        url = window.URL.createObjectURL(blob);
                    } else if(window.webkitURL != undefined){
                        url = window.webkitURL.createObjectURL(blob);
                    }
                    context.commit("setLoadingDown",false);
                    link.href = url;
                    link.setAttribute('download','档案政策'+new Date().getTime()+'.zip');
                    link.click();
                }else{
                    context.commit("setLoadingDown",false);
                    context.commit(
                        "grounding/setWarningMsg",
                        { message: "没有找到可以下载的附件！", type: "error" },
                        { root: true }
                      );
                }
            },
            error=>{
                context.commit("setLoadingDown",false);
                console.log(error.data);
            })
        }
    },
    state:{
        userHeaderCircleUrl:"",
        userHeaderCircleBlob:"",
        // userName:"9999",//window.parent.parent.reactGPO.UserName
        // userCaption:"管理员",//window.parent.parent.reactGPO.UserCaption
        // userJob:"华发物业",//window.parent.parent.reactGPO.orgName
        userName:window.parent.parent.reactGPO.UserName,
        userCaption:window.parent.parent.reactGPO.UserCaption,
        userJob:window.parent.parent.reactGPO.orgName,
        dueVoucherSum:0,
        loadingUpload:false,
        loadingDownload:false,
        dueVoucherList:[],
        borrowVoucherTotal:0,
        borrowComponentTotal:0,
        borrowApplicationArr:[],
        archivesPolicyArr:[],
        informationArr:[],
        fileUpdateLoadPageShow:false,
        isLoadingFristPage:["true"]
    }
}