import Vue from 'vue'
// import Router from 'vue-router'
import App from '../App'
import Login from '@pages/login/Login'
import MyList from '@pages/mylist/main'
// import Meeting from '@cmpt/meeting/Meeting'
// import Detail from '@cmpt/meeting/Detail'
// import SignConfirm from '@cmpt/signature/SignConfirm'
// import SignRecord from '@cmpt/signature/SignRecord'
// import MealRecord from '@cmpt/meal/MealRecord'
// import MealConfirm from '@cmpt/meal/MealConfirm'

// Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta:{
        noLogin: true 
      }
    },
    {
      path: '/mylist',
      name: 'MyList',
      component: MyList,
    },
    // {
    //   path: '/meeting',
    //   name: 'Meeting',
    //   component: Meeting,
    //   children:
    //     [{
    //       path: 'detail/:conference_no',
    //       name: 'Detail',
    //       component: Detail,
    //       meta:{
    //         tabIndex:'1'
    //       }
    //     },
    //     {
    //       path: 'signrecord/:conference_no',
    //       name: 'SignRecord',
    //       component: SignRecord,
    //       meta:{
    //         tabIndex:'2'
    //       }
    //     },
    //     {
    //       path: 'mealrecord/:conference_no',
    //       name: 'MealRecord',
    //       component: MealRecord,
    //       meta:{
    //         tabIndex:'3'
    //       }
    //     }]
    // },
    // {
    //   path: '/meal',
    //   name: 'MealConfirm',
    //   component: MealConfirm
    // },
    // {
    //   path: '/sign',
    //   name: 'SignConfirm',
    //   component: SignConfirm
    // }
  ]
})

const app = new Vue(App)
app.$mount()
