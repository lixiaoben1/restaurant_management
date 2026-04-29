import { ref } from 'vue'
import { defineStore } from 'pinia'

type validate_admin = {
  access?: string
  refresh?: string
  adminName: string
  password: string
}
const useAdminStore = defineStore(
  'loginAdmin',
  () => {
    //存储数据用ref
    const adminAccount = ref<validate_admin>()
    //想要修改数据用函数
    const changeAdminAccount = (newRegisterAdmin: validate_admin) => {
      adminAccount.value = newRegisterAdmin
    }
    const removeAdminAccount = () => {
      adminAccount.value = {
        access: '',
        refresh: '',
        adminName: '',
        password: ''
      }
    }
    return { adminAccount, changeAdminAccount, removeAdminAccount }
  },
  {
    persist: true
  }
)

//存储获取的主面板数据
const useAllData = defineStore(
  'getAllData',
  () => {
    const get_all_data = ref('')
    return { get_all_data }
  },
  {
    persist: true
  }
)

const useIsLoading = defineStore('isLoading', () => {
  const is_loading = ref(false)
  const start_loading = () => {
    is_loading.value = true
  }
  const stop_loading = () => {
    is_loading.value = false
  }
  return { is_loading, start_loading, stop_loading }
})

export { useAdminStore, useAllData, useIsLoading }
