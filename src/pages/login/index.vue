<template>
  <div id="login">
    <header>
      <img src="../../assets/images/logo.png" alt="此处应有图片">
    </header>
    <section>
      <div class="phone line-b">
        <span>手机号</span>
        <input type="text" placeholder="请输入您的手机号码" v-model="form.mobile">
      </div>
      <div class="verifyCode line-b">
        <span>验证码</span>
        <input type="text" placeholder="请输入验证码" v-model="form.verification_code">
        <button class="line-l" :class="{'wait':verifyCode.isWait,'getCode':!verifyCode.isWait}" plain @click="getVerfiyCode">{{verifyCode.text}}</button>
      </div>
      <i-button type="primary" size="large" @click="loginRequest" class="submit">登 录</i-button>
    </section>
    <i-toast id="toast" />
  </div>
</template>

<script>
  import { Verify } from '@utils/dataHandle'
  import { getVerfiyCode, loginRequest } from '@api/api'
  const { $Toast } = require('../../lib/iview/base/index.js') ;
  export default {
    data() {
      return {
        verifyCode: {
          isWait: false,
          waiting: 60,
          text: '获取验证码'
        },
        form: {
          mobile: '',
          verification_code: ''
        }
      }
    },
    methods: {
      verfiyPhone (mobile = this.form.mobile) {
        if (!mobile) {
          $Toast({content:'请输入手机号码'})
          return false
        }
        let pass = Verify.isMobile(mobile)
        if (!pass) {
          $Toast({content:'手机号码格式不正确'})
        }
        return pass
      },
      verfiyCode (code = this.form.verification_code) {
        if (!code) {
          $Toast({content:'请输入验证码'})
          return false
        }
        let pass = Verify.isVerifyCode(code)
        if (!pass) {
          $Toast({content:'验证码格式不正确'})
        }
        return pass
      },
      getVerfiyCode () {
        // 等待时禁止多次点击
        if (this.verifyCode.isWait) {
          return
        }
        // 验证手机号
        if (!this.verfiyPhone()) {
          return
        }
        getVerfiyCode({ mobile: this.form.mobile }).then(res => {
          if (res.success) {
            $Toast({content:'获取成功'})
            // 禁止多次点击
            this.banClick()
          }
        }).catch(err => {
          $Toast({content:err.message})
        })
      },
      banClick() {
        let waiting = this.verifyCode.waiting
        let timer = setInterval(() => {
          this.verifyCode.isWait = true
          this.verifyCode.text = waiting-- + 's重新发送'
          if (waiting < 0) {
            clearInterval(timer)
            this.verifyCode.isWait = false
            this.verifyCode.text = '获取验证码'
          }
        }, 1000)
      },
      loginRequest() {
        if (!this.verfiyPhone() || !this.verfiyCode()) {
          return
        }
        loginRequest(this.form).then(res => {
          if (res.success) {
            Auth.setToken(res.access_token)
            this.$router.push({ path: '/mylist' })
          }
        }).catch(err => {
          $Toast({content:err.message})
        })
      }
    } 
  }
</script>

<style lang="less" scoped>
    @import url('../../assets/styles/login/login.less'); 
</style>
<style>
  .i-btn-primary {
    background: #0a70da!important
  }
  .i-btn{
    /* box-shadow: none!important; */
    margin: 0!important;
    font-size: 0.28rem;
    font-weight: 300
  }
</style>