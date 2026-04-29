<script setup lang="ts">

import Refresh_button from "@/components/backstage_main/float_button.vue";
import Base_info from "@/components/backstage_main/base_info.vue";
import Dishes_database from "@/components/backstage_main/dishes_database.vue";
import Hour_day_month from "@/components/backstage_main/hour_day_month.vue";
import Loading from "@/components/backstage_main/loading.vue";
import {onMounted, ref} from "vue";
import {useAllData} from "@/stores/admin";
import axios_instance from "@/utils/request";



//当未获取到数据的时候不加载组件
const isShow = ref(false)

const use_all_data = useAllData()



const get_all_data = async () => {
  console.log("我要发起请求了哦")
  try {
    const dishes_data = await axios_instance.post('/api/get_total_dishes_data')
    if (dishes_data.data){
      use_all_data.get_all_data = dishes_data.data.data
      isShow.value = true
      console.log("数据存储完成")
    }
    // await get_all_data()
  }catch(e){
    alert("后端服务器没启动")
    console.log(e)
  }
}

onMounted(()=>{
  if (!use_all_data.get_all_data){
    get_all_data()
  }else {
    isShow.value = true
    document.querySelector('.loading')?.remove();
  }
})


</script>

<template>
  <Refresh_button></Refresh_button>
<!--  <Loading v-if="!isShow"></Loading>-->
  <Base_info v-if="isShow"></Base_info>
  <Hour_day_month v-if="isShow"></Hour_day_month>
  <Dishes_database v-if="isShow"></Dishes_database>
</template>

<style scoped>

</style>