import Vue from 'vue'
import Router from 'vue-router'
import ClassifyEdit from '@/components/ClassifyEdit.vue'
import CompanyDetail from '@/components/CompanyDetail'
import Classify from '@/components/Classify'
import register from '@/components/register.vue';
import Header from '@/components/common/Header.vue'; //新增
import slideBar from '@/components/common/slideBar.vue';
import Home from '@/components/common/Home.vue';
Vue.use(Router)
export default new Router({
  routes: [{
      path: '/',
      name: 'register',
      component: register
    },
    {
      path: "/ClassifyEdit",
      name: "ClassifyEdit",
      component: ClassifyEdit
    },
    {
      path:"/register",
      name:"register",
      component:register
    },
    {
      path: "/Classify",
      component: Classify
    },
    {
      path: "/Header",
      component: Header
    },
    {
      path: "/slideBar",
      component: slideBar
    },
    {
      path: "/Home",
      name: "Home",
      component: Home,
      children: [{
          path: "/",
          component: () => import('@/components/classify.vue')
        },
        {
          path: "CompanyDetail",
          name: "CompanyDetail",
          component: () => import('@/components/CompanyDetail.vue')
        },
        {
          path: "Detail",
          name: "Detail",
          component: () => import('@/components/Detail.vue')
        }
      ]
    },
  ]
})
