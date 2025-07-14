import VueRouter from "vue-router";
import Grounding from "../pages/Grounding.vue";
import WarehouseQuery from '../pages/WarehouseQuery.vue';
import CabinetDetails from '../components/CabinetDetails.vue';
import GroundingQuery from '../pages/GroundingQuery.vue';
import ImgPicture from '../components/ImgPicture.vue';
import FirstPage from "../pages/firstPage.vue";
import ShowPage from "../pages/showPage.vue";
import Vue from "vue";
Vue.use(VueRouter);
const router = new VueRouter({
    routes:[{
        name:"ShowPage",
        path:"/ShowPage",
        component:ShowPage,
        children:[
            {
                name:"grouping",
                path:"grouping",
                component:Grounding,
                props:{
                    navigationBooolean:"1",
                }
            },
            {
                name:"warehouseQuery",
                path:"warehouseQuery",
                component:WarehouseQuery,
                props:{
                    navigationBooolean:"2"
                },
                children:[{
                    name:"details",
                    path:"cabinetDetails",
                    component:CabinetDetails
                },{
                    name:"GroupingQuery",
                    path:"GroupingQuery",
                    component:GroundingQuery,
                    meta:{
                        isAuth:true,
                        title:"架详情"
                    }
                },{
                    name:"ImgPicture",
                    path:"ImgPicture",
                    component:ImgPicture
                }]
            }
        ]
    },{
        name:"FirstPage",
        path:"/FirstPage",
        component:FirstPage
    }]
});
export default router;