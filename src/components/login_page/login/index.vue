<script setup lang="ts">
import {ref} from "vue";
import { useAdminStore, useAllData} from '@/stores/admin'
import { useRouter } from "vue-router";
import axios_instance from "@/utils/request";


const useAdmin =  useAdminStore()

//导入路由跳转组件
const router = useRouter()

const rules = {
    phoneRequired: (value: string) => !!value || '手机号不能为空',
    passwordRequired: (value: string) => !!value || '密码不能为空',
    max:  (value: string) => (value || '').length <= 20 || 'Max 20 characters',
    min:  (value: string) => value.length >= 8 || '至少输入八位数密码',
    phoneMatch: (value: string) => {
      const pattern = /^(?:\d{11}|[A-Za-z]{6,})$/
      return pattern.test(value) || '请输入正确的手机号码或者用户名'
    },
    passwordMatch: (value: string) => {
      const pattern = /^\d{8,}$/
      return pattern.test(value) || '请输入正确的密码'
    },
}
//定义密码框是否显示明文
const show = ref(false)
//定义一个提示框
const alert = ref(false)
const success = ref(false)
const noUser = ref(false)
//获取输入的手机号和密码
const phoneNumber = ref("lixiaoben")
const password = ref("12345678")
//接收父组件传过来的方法
defineProps(['toggleToChildren'])

//登录校验
const loginForm = ref()

//跳转计时器，自动五秒跳转，在这里定义一个id，手动跳转后关闭自动跳转器，不然有bug
const startTimer = ref()
const toMainPage = () => {
  clearTimeout(startTimer.value)
  router.push('/')
}

const loginAdmin = async () =>{
  //先表单校验，然后再去跳转主页OK?
  // noinspection ES6RedundantAwait
  const {valid} = await loginForm.value.validate()
  if (valid)
  {
    //已经验证成功了，快来发个请求获取token,记得与本地账号密码校验
    if(phoneNumber.value && password.value) {
        const content = await axios_instance.post(
            '/api/login',
            {adminAccount:phoneNumber.value, password:password.value},
        )
      if (content.data.status == 1){
          console.log('content是：', content.data["access"])
          useAdmin.adminAccount = {
            access:content.data["access"],
            refresh:content.data["refresh"],
            adminName:phoneNumber.value,
            password:password.value
          }
          if (content.data.access){
            success.value = true
            loginForm.value.reset()
            startTimer.value = setTimeout(()=>{
              router.push('/')
            }, 5000)
          }
      }
      else {
        console.log("用户未注册")
        noUser.value = true
        loginForm.value.reset()
      }
    }
    else {
      console.log('用户不存在')
    }
    // if (phoneNumber.value === useAdmin.adminAccount?.adminName && password.value === useAdmin.adminAccount?.adminPassword){
    //   success.value = true
    //   loginForm.value.reset()
    //   setTimeout(()=>{
    //     router.push('/')
    //   }, 5000)
    // }
    // else {
    //   alert.value = true
    // }

  }
  else {
    console.log("校验失败", "@@@@@",phoneNumber.value,"!!!!!!",password.value)
  }


}
const loginValidate = () =>{}
</script>

<template>
  <div class="login_card">
    <h1 class="login_text">登录</h1>
    <h2 class="login_text2">前往至管理员面板</h2>
    <span style="font-size: 16px; color: #505050; margin-bottom: 30px;">
          没有管理员账户?
          <button @click="toggleToChildren" class="to_register">前往注册</button>
    </span>
    <v-form ref="loginForm" class="input_window">
      <div style="height: 85px">
        <v-text-field style="" :rules='[rules.phoneRequired, rules.phoneMatch]'
                      v-model="phoneNumber"
                      variant="outlined"
                      label="请输入手机号码或者用户名"
                      hide-details="auto"
                      density="comfortable"
                      validate-on="blur"
                      hint="请输入11位手机号或者用户名"></v-text-field>
      </div>
      <div style="height: 85px">
        <v-text-field
            :rules="[rules.passwordRequired, rules.min, rules.passwordMatch]"
            v-model="password"
            variant="outlined"
            label="请输入登录密码"
            :type="show ? 'text' : 'password'"
            density="comfortable"
            @click:append-inner="show = !show"
            :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            hint="至少输入八位数密码"
            validate-on="blur"></v-text-field>
      </div>
    </v-form>

    <v-btn @click="loginAdmin" base-color="rgba(10,10,10,1)">
      登录
    </v-btn>
    <v-snackbar
        v-model="alert"
        location="center"
        color="rgba(0,0,0,1)"
        height="100px"
        closable
        timeout="5000"
        timer="true"
    >
      用户名或密码错误
      <template v-slot:actions>
        <v-btn
            color="blue"
            variant="text"
            @click="alert = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar
        v-model="success"
        location="center"
        color="rgba(0,0,0,0.7)"
        height="100px"
        timeout="5000"
        timer="true"
        closable
    >
      登录成功，5秒后自动跳转，<a @click="toMainPage" style="border-bottom: white solid 1px;font-weight: bold;cursor: pointer">立即跳转</a>
      <template v-slot:actions>
        <v-btn
            color="blue"
            variant="text"
            @click="success = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar
        v-model="noUser"
        location="center"
        color="rgba(0,0,0,0.7)"
        height="100px"
        timeout="5000"
        timer="true"
        closable
    >
      用户未注册，<a @click="toggleToChildren" style="border-bottom: white solid 1px;font-weight: bold;cursor: pointer">立即注册</a>
      <template v-slot:actions>
        <v-btn
            color="blue"
            variant="text"
            @click="noUser = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

  </div>
</template>

<style scoped>
.login_card {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}


.to_register {
  font-size: 16px;
  background-color: transparent;
  border: 1px solid rgba(0,0,0,0);
  padding: 0;
}
.to_register:hover::after {
  content: "";
  display: block;
  position: absolute;
  width: 4em;
  height: 1px;
  background-color: #000000;
  margin-top: 1px;
}
button {
  cursor: pointer;
}

.input_window {
  width: 100%;
  height: 23vh;
}

h1 {
  font-size: 3rem;
  margin-bottom: 16px;
}

p {
  line-height: 1.6;
}

</style>