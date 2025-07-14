import Vue from 'vue'
import App from './App.vue'
import {Tree,Row,Col,Alert,Table,TableColumn,Button,Image,Loading,Avatar,Upload} from "element-ui";
import store from './store';
import router from './router';
import  Print  from 'vue-print-nb';
import axios from "axios"
axios.defaults.baseURL = window.location.href.split("/dist/index.html")[0];
console.log(window.location.href.split("/dist/index.html")[0]);

Vue.config.productionTip = false;
Vue.component(Tree.name,Tree);
Vue.component(Row.name,Row);
Vue.component(Col.name,Col);
Vue.component(Alert.name,Alert);
Vue.component(Table.name,Table);
Vue.component(TableColumn.name,TableColumn);
Vue.component(Button.name,Button);
Vue.component(Image.name,Image);
Vue.component(Avatar.name,Avatar);
Vue.component(Upload.name,Upload);
Vue.use(Print);
Vue.use(Loading);
Vue.use(Loading.directive);
new Vue({
  render: h => h(App),
  store,
  router,
  
}).$mount('#app')
