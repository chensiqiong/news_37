// 引入axios
import axios from '@/utils/myaxios.js'
// 上传文件
export const uploadFiles = file => {
  return axios({
    method: 'post',
    url: '/upload',
    data: file
  })
}
