import Vue from 'vue'
import App from './App'
import MpvueRouterPatch from 'mpvue-router-patch'

import '@style/common/reset.less'// 重置浏览器样式以及mint样式替换
import '@style/iconfont/iconfont.css'// 字体图标样式文件
Vue.config.productionTip = false
App.mpType = 'app'

Vue.use(MpvueRouterPatch)

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
      '^pages/meeting/MyList',
      'pages/login/Login',
      'pages/meeting/Meeting'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#000',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'white'
    }
  }
}
