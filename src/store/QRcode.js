import axios from "axios";
// import $ from "jquery";
export default {
    namespaced:true,
    mutations:{
        setQRCodeIdArr(state,idArr){
            state.QRCodeIdArr = idArr;
        },
        setQrCodePictureArr(state,picture){
            state.QrCodePictureArr.push(picture);
        },
        clearQrCodePictureArr(state){
            if(state.QrCodePictureArr.length>0){
                while(state.QrCodePictureArr.pop()){}
            }
        },
        clearQRCodeIdArr(state){
            if(state.QRCodeIdArr.length>0){
                while(state.QRCodeIdArr.pop()){}
            }
        },
        sortQrCodePictureArr(state,length){
            var QrCodePictureArr = [];
            if(length === state.QrCodePictureArr.length){
                for(let i=1;i<=length;i++){
                    for(let j = 0; j<length;j++){
                        if( state.QrCodePictureArr[j].index === i){
                            var QrCodePicture = state.QrCodePictureArr[j]
                            QrCodePictureArr.push({
                                index:QrCodePicture.index,
                                imageUrl:QrCodePicture.imageUrl,
                                height:QrCodePicture.imageUrl
                            });
                           }
                    }
                }
                while(state.QrCodePictureArr.pop()){}
                QrCodePictureArr.map((element=>{
                    state.QrCodePictureArr.push(element)
                }))
            }
        },
    },
    actions:{
        getQRCodePictureArr(context, vc) {
            context.commit("clearQrCodePictureArr");
            if (
              context.state.QRCodeIdArr === null ||
              context.state.QRCodeIdArr === "" ||
              context.state.QRCodeIdArr.length === 0
            ) {
              context.commit(
                "grounding/setWarningMsg",
                { message: "请选择一条数据后再点击生成二维码！", type: "error" },
                { root: true }
              );
              return;
            }
            if (vc.$route.name !== "ImgPicture") {
                vc.$router.push({ name: "ImgPicture" });
            }
            context.commit("setLoading",true,{root:true});
            var codeIdSum = 0;
            var codeIdList = [];
            var index = 0;
            var lengthQrId =  context.state.QRCodeIdArr.length;
            context.state.QRCodeIdArr.forEach(async (codeIdMap) => {
              codeIdList.push(codeIdMap.cabinetName);
              codeIdSum++;
              if (codeIdSum % 4 === 0) {
                index++;
                if (codeIdList.length > 0) {
                    getAsyncAxios(
                        `/general/generateQRCode/${codeIdList.join(",")}`,
                        codeIdList.length*220,
                        index
                      );
                }
                codeIdList = [];
                codeIdSum = 0;
              }
            });
            if (codeIdList.length > 0) {
              index++;
              getAsyncAxios(
                `/general/generateQRCode/${codeIdList.join(",")}`,
                codeIdList.length*250,
                index
              );
              codeIdList = [];
            }
            
            context.commit("clearQRCodeIdArr");
            function getAsyncAxios(url,height,index){
                var axiosRespone = axios.get(url,{
                    responseType: 'blob',
                });
                axiosRespone.then(Response=>{
                    const blob = new Blob([Response.data], { type: Response.data.type });
                    const imageUrl = URL.createObjectURL(blob);
                    context.commit("setQrCodePictureArr",{imageUrl,height,index});
                    context.commit("sortQrCodePictureArr",Math.round(lengthQrId/4));
                    context.commit("setLoading",false,{root:true});
                });
        // $.get({
        //     url,
        //     responseType:'blob',
        //     async:false,
        //     success(data){
        //     const blob = new Blob([data], { type: "image/png" });
        //     const imageUrl = URL.createObjectURL(blob);
        //     context.commit("setQrCodePictureArr",{imageUrl,height});
        //     }
        // })
        }
       }
    },
    state:{
       QRCodeIdArr:[],
       QrCodePictureArr:[],
    }
}