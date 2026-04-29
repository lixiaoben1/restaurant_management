<script setup lang="ts">
import axios_instance from "@/utils/request";
import {onMounted, ref} from "vue";
import { useAllData } from '@/stores/admin'

const dialog = ref(false)

const search = ref()
const use_all_data = useAllData()


const run_spark_password = ref('')
const run_spark = async ()=>{
  //需要提供密码
  if (run_spark_password.value){
    const pyspark = await axios_instance.post('/api/refresh_dishes_data', {"refresh_password":parseInt(run_spark_password.value)})
    console.log(pyspark.data)
    if (pyspark.data.status === 0){
      dialog.value = false
      return alert("密码错误")
    }
    dialog.value = false
    return  alert("执行成功，请等待半分钟后执行刷新操作")
  }
  dialog.value = false
  return  alert("密码不能为空")
}

const get_all_data = async () => {
  const dishes_data = await axios_instance.post('/api/get_total_dishes_data')
  use_all_data.get_all_data = dishes_data.data.data
  console.log("数据存储完成")
}

</script>

<template>
  <v-container style="height: 50px" fluid >
    <v-row  class="ma-0">
      <v-col class="d-flex align-center justify-space-between pt-0 pb-0" cols="12" lg="8" sm="6">
        <v-icon icon="mdi-video-input-component"></v-icon> &nbsp;
        Dashboard
        <v-spacer ></v-spacer>

      </v-col>
      <v-col class="d-flex align-center justify-space-between pt-0 pb-0 mt-2" cols="12" lg="4" sm="6">
        <v-text-field
            v-model="search"
            label="Search"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            density="compact"
            style="height: 40px"
            max-width="300px"
            min-width="50px"
            hide-details
            single-line
        >
        </v-text-field>
        <div class="text-center">
          <v-dialog
              v-model="dialog"
              max-width="400"
              persistent
          >
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn width="100px" class="ml-5 mr-5" style="height: 40px" flat border v-bind="activatorProps">
                重构
              </v-btn>
            </template>

            <v-card
                prepend-icon="mdi-alert-circle"
                title="你确定要重构数据吗"
            >
              <template v-slot:text>
                本项目后端采用运行在linux上的spark进行大数据分布式计算，该重构按钮则是重新运行该spark进行最新数据的计算，将会消耗大量性能，因此你需要输入超级管理员密码。请确定你在干哈，否则请取消重构
                <v-text-field v-model="run_spark_password" class="mt-3" clearable label="Label"></v-text-field>
              </template>
              <template v-slot:actions>
                <v-spacer></v-spacer>

                <v-btn @click="run_spark">
                  Agree
                </v-btn>

                <v-btn style="color: white;background-color: black" @click="dialog = false">
                  Disagree
                </v-btn>
              </template>
            </v-card>
          </v-dialog>
        </div>
        <v-btn @click="get_all_data" style="height: 40px;width: 100px" flat color="black">
          刷新
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>