import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
    // 这个字段走 main.json
    config: {
        "usingComponents": {
            "i-button": "../../lib/iview/button/index" ,
            "i-toast": "../../lib/iview/toast/index"
        }
    }
}