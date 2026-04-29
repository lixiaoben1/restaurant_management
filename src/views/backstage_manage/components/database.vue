<script setup lang="ts">
import axios_instance from "@/utils/request";
import {onMounted, reactive, ref, toRefs, watch} from "vue";

const search = ref('')
const page = ref(1)
const per_page = ref(12)
const total_visible = ref(15)
const headers = reactive([
  {
    align: 'start',
    key: 'order_id',
    sortable: false,
    title: '订单id',
  },
  { key: 'dishes_name', title: '菜名' },
  { key: 'counts', title: '份数' },
  { key: 'amounts', title: '单价' },
  { key: 'place_order_time', title: '日期' },
])
let desserts = ref([])

// 发送ajax请求，获取数据

const get_all_data = async ()=>{
  const all_food = await axios_instance.post('/api/get_all_data', {per_page:per_page.value, now_page:page.value})
  if (all_food.data){
    console.log('数据库数据获取成功')
    // console.log('数据库数据获取成功',all_food.data.data, typeof(all_food.data), all_food.data.info.value)
    desserts.value = all_food.data.data
    total_visible.value = all_food.data.info.value
  }
}


get_all_data()


watch(page, ()=>{
  get_all_data()
})
</script>

<template>
  <v-container class="pt-1" fluid >
    <v-row class="ma-0 pa-0">
      <v-col class="d-flex align-center justify-space-evenly" cols="12" lg="12" sm="12">
        <v-card color="rgba(0,0,0,0)" width="90vw" flat>
          <v-card-title class="d-flex align-center pe-2 mb-6">
            <v-icon icon="mdi-video-input-component"></v-icon> &nbsp;
            Database
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                label="Search"
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
                density="compact"
                style="height: 40px"
                hide-details
                single-line
            >
              <template v-slot:append>
                <v-btn @click="get_all_data" style="height: 40px" flat color="black">
                  refresh
                </v-btn></template>

            </v-text-field>
          </v-card-title>

          <v-data-table
              :page="page"
              :headers="headers"
              :items="desserts"
              :items-per-page="per_page"
              :search="search"
          >
            <template v-slot:bottom>
              <div class="text-center pt-2">
                <v-pagination
                    v-model="page"
                    :length="total_visible"
                    :total-visible="7"
                ></v-pagination>
              </div>
            </template>
          </v-data-table>
        </v-card>



      </v-col>
    </v-row>
  </v-container>












</template>

<style scoped>

</style>