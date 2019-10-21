// 引入axios
import axios from '@/utils/myaxios.js'

export const getCategoryList = () => {
  return axios({
    url: '/category'
  })
}
