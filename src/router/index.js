import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue';
import Index from '@/components/Index.vue';
import ClassifyEdit from '@/components/ClassifyEdit.vue'
import aa from "@/components/aa.vue";
import Left from '@/components/Left.vue'
Vue.use(Router)
export default new Router({
  routes: [{
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: "/Index",
    name: "Index",
    component: Index
  },
  {
    path:"/ClassifyEdit",
    name:"ClassifyEdit",
    component:ClassifyEdit
  },
  {
    path: "/aa",
    name: "aa",
    component:aa
  },
  {
    path:"/Left",
    component:Left
  }

]
})
