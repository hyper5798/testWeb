<template>
  <div id="main">
    <div class="login">
      <div class="login-form">
        <div class="login-logo">
          <span>農業資訊管理</span>
        </div>
        <Form inline ref="loginFormRef" :model="formData" :rules="rule">
          <FormItem prop="user" class="form-item">
            <Input type="text" icon="person" v-model="formData.user" @on-enter="loginSubmit" placeholder="登錄賬號"></Input>
          </FormItem>
          <FormItem prop="password" class="form-item">
            <Input type="password" icon="ios-locked" v-model="formData.password" @on-enter="loginSubmit" placeholder="賬戶密碼"></Input>
          </FormItem>
          <FormItem class="form-item" style="margin-bottom:5px;">
            <!-- <Checkbox v-model="record">记住登录</Checkbox> -->
            <!-- <a style="float:right;">忘记密码</a> -->
          </FormItem>
          <FormItem class="form-item">
            <Button class="loginBtn" type="primary" :loading="loading" @click="loginSubmit">
              登 录
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
import md5 from '~/libs/md5'
import { toLogin } from '~/libs/api'
import axios from '~/plugins/axios2'
import Cookies from 'js-cookie'

export default {
  layout: 'full',
  asyncData({ query }) {
    let jump = query.jump || ''
    return {
      jump: jump,
      record: false,
      loading: false,
      formData: {
        user: 'sysAdmin',
        password: ''
      },
      rule: {
        user: [
          { required: true, message: '請填寫登錄賬戶', trigger: 'blur' },
          {
            type: 'string',
            min: 2,
            message: '登錄賬戶最少為2個字符',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '請填寫賬戶密碼', trigger: 'blur' },
          {
            type: 'string',
            min: 6,
            max: 30,
            message: '賬戶密碼必須為6~30字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    loginSubmit() {
      this.loading = true
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) {
          this.loading = false
          this.$Message.error({
            content: '請正確填寫登錄賬戶和密碼！',
            duration: 2,
            closable: true
          })
        } else {
          let _mobile = this.formData.user
          let _psd = md5(this.formData.password)
          /* let req = await axios.post('/user/v1/login/gemtek', {
            acc: this.formData.user,
            pwd: this.formData.password,
            type: 0
          })*/
          let req = await toLogin({
            acc: this.formData.user,
            pwd: this.formData.password,
            cp: 'gemtek',
            type: 0
          })


          // 网络异常
          if (req.status !== 200) {
            this.$Message.error({
              content: '網絡通訊異常',
              duration: 2,
              closable: true
            })
            this.loading = false
            return false
          }
          if (!!req.data && req.status!== 200) {
            let msg = req.data.responseMsg || '失敗'
            this.$Message.error({ content: msg, duration: 2, closable: true })
            this.loading = false
            return false
          }
          if (!!req.data && req.data.responseCode !== '000') {
            let msg = req.data.responseMsg || '登錄失敗'
            this.$Message.error({ content: msg, duration: 2, closable: true })
            this.loading = false
            return false
          }
          this.$Message.success('恭喜您，登錄成功！')
          this.$store.commit('user/SET_TOKEN', req.data.authToken)
          this.$store.commit('user/SET_USERINFO', req.data.userInfo)
          this.$store.commit('app/setAvator', 'https://avatars3.githubusercontent.com/u/12723410?s=460&v=4');
          Cookies.set('token', req.data.authToken)
          Cookies.set('userInfo', req.data.userInfo)
          console.log('$$$$ store token: ', Cookies.get('token'))

          let route = {
            path: '/'
          }
          if (this.jump !== '' && typeof this.jump !== 'undefined') {
            route.path = this.jump
          }
          localStorage.token = req.data.authToken
          // setTimeout(() => {
            this.loading = false
            this.$router.push(route)
          // }, 1500)
        }
      })
    }
  },
  mounted() {}
}
</script>
<style scoped>
#main {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: #f8f8f9;
}

.login {
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
  height: 100%;
  background-image:url('~assets/images/agri1.jpg');
}

.login-form {
  width: 350px;
  height: 340px;
  padding: 35px;
  -webkit-box-shadow: 0 0 100px rgba(0, 0, 0, 0.08);
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.08);
  background: #fff;
}

.login-logo {
  text-align: center;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  margin-bottom: 20px;
}

.login-logo > span {
  vertical-align: text-bottom;
  font-size: 16px;
  text-transform: uppercase;
  display: inline-block;
  color: rgba(0, 0, 0, 0.65);
}

.form-item {
  width: 100%;
}

.item-input > i.ivu-input-icon {
  left: 0;
  right: auto;
}

.loginBtn {
  width: 100%;
}
</style>

