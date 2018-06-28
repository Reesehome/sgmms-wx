module.exports = [
    // {
    //     path: '/',
    //     redirect: '/pages/login/Login'
    // },
    {
        path: '/pages/meeting/MyList',
        name: 'MyList',
        config: {
            navigationBarTitleText: '会议列表',
            "usingComponents": {
                "i-spin": "../../lib/iview/spin/index",
                "i-page": "../../lib/iview/page/index"
            }
        }
    },
    {
        path: '/pages/meeting/Meeting',
        name: 'Meeting',
        config: {
            navigationBarTitleText: '会议详情',
        }
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
    },
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
    {
        path: '/pages/login/Login',
        name: 'Login',
        meta: {
            noLogin: true
        },
        config: {
            "usingComponents": {
                "i-button": "../../lib/iview/button/index",
                "i-toast": "../../lib/iview/toast/index"
            },
            navigationBarTitleText: '登录页'
        }
    }
]

