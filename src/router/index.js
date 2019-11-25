import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue';
import Index from '@/components/Index.vue';
import ClassifyEdit from '@/components/ClassifyEdit.vue'
import aa from "@/components/aa.vue";
import Left from '@/components/Left.vue'
import CompanyDetail from '@/components/CompanyDetail'
import Classify from '@/components/Classify'
import register from '@/components/register.vue';
import Header from '@/components/common/Header.vue';//新增
import slideBar from '@/components/common/slideBar.vue';
import Home from '@/components/common/Home.vue';
import tt from '@/components/tt.vue';
Vue.use(Router)

export default new Router({
  routes: [
  {
    path: '/',
    name: 'register',
    component:register
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
  },
  // {
  //   path:"/CompanyDetail",
  //   name:"CompanyDetail",
  //   component:CompanyDetail
  // },
  {
    path:"/Classify",
    component:Classify
  },
  {
    path:'/register',
    component:register
  },
  {
    path:"/Header",
    component:Header
  },
  {
    path:"/slideBar",
    component:slideBar
  },
  {
    path:"/Home",
    component:Home,
    children:[
      {
        path:"/",
        component:()=>import('@/components/classify.vue')
      },
      {
        path:"tt",
        component:()=>import ('@/components/tt.vue')
      },
      {
        path:"CompanyDetail",
        name:"CompanyDetail",
        component:()=>import('@/components/CompanyDetail.vue')
      },
      {
        path:"Detail",
        name:"Detail",
        component:()=>import('@/components/Detail.vue')
      }
    ]
  },
]
})
