<script setup lang="ts">
import { ref } from "vue";
import { useAdminStore } from '@/stores/admin'
const useAdmin =  useAdminStore()


import axios_instance from '@/utils/request'

const test = async () => {
  // const token = await axios.get('')
  // console.log("dddddd",token.data,typeof(token))

  const content = await axios_instance.post(
      '/api/login_admin',
      {},
      {
        headers: { 'x-csrftoken': 'GeAeTcJgMIkvZg8W0lp9AeqJYXdBNWPGb5rEq5r00ENzHRWjLSay0qgctJ71tB2I' }
      }
  )
  console.log('content是：', content.data)
}




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
const userExist = ref(false)
const success = ref(false)
//获取输入的手机号和密码
const phoneNumber = ref('')
const password = ref('')
//接收父组件传过来的方法
defineProps(['toggleToChildren'])

//注册账户存储于useStore
const registerForm = ref()
const registerAdmin = async () =>{
  //先表单校验，然后再去存储OK?
  // noinspection ES6RedundantAwait
  const {valid} = await registerForm.value.validate()
  if (valid)
  {
    //已经验证成功了，快来发起请求吧,记得将获得的token存入local storage
      const content = await axios_instance.post(
          '/api/register',
          {adminAccount:phoneNumber.value, password:password.value},
      )
    if (content.data.status === 1){
        console.log('content是：', content.data)
        //存入local
        useAdmin.adminAccount = {
            adminName:phoneNumber.value,
            password:password.value
        }
        success.value = true
        registerForm.value.reset()
    }
    else {
      userExist.value = true
    }
  }
  else {
    console.log("校验失败")
  }


}

</script>

<template>
  <div class="register_card">
    <h1 class="register_text">注册</h1>
    <h2 class="register_text2">前往至管理员面板</h2>
    <span style="font-size: 16px; color: #505050; margin-bottom: 30px;">
          已有管理员账户?
          <button @click="toggleToChildren" class="to_login">前往登录</button>
    </span>
    <v-form ref="registerForm" class="input_window">
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
            label="请输入注册密码"
            :type="show ? 'text' : 'password'"
            density="comfortable"
            @click:append-inner="show = !show"
            :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            hint="至少输入八位数密码"
            validate-on="blur"></v-text-field>
      </div>
    </v-form>

    <v-btn @click="registerAdmin" base-color="rgba(10,10,10,1)">
      注册
    </v-btn>
    <v-snackbar
        v-model="userExist"
        location="center"
        color="rgba(0,0,0,0.7)"
        height="100px"
        timeout="5000"
        timer="true"
        closable
    >
      用户已存在，<a @click="toggleToChildren" style="border-bottom: white solid 1px;font-weight: bold;cursor: pointer">立即登录</a>
      <template v-slot:actions>
        <v-btn
            color="blue"
            variant="text"
            @click="userExist = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar
        v-model="success"
        location="center"
        color="rgba(0,0,0,1)"
        height="100px"
        closable
    >
      注册成功
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
  </div>
</template>

<style scoped>
.register_card {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}


.to_login {
  font-size: 16px;
  background-color: transparent;
  border: 1px solid rgba(0,0,0,0);
  padding: 0;
}
.to_login:hover::after {
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