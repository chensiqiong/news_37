// users.js专门用来处理与users相关的请求

// 引入axios
import axios from '@/utils/myaxios.js'

// 登录请求
export const login = data => {
  // axios() 返回一个promise对象
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}

// 个人中心数据请求
export const getUserData = id => {
  return axios({
    // token不是浏览器的默认行为，所以不会主动传递，需要手动写入
    // headers: {
    //   'Authorization': localStorage.getItem('news_37')
    // },
    url: `user/${id}`
  })
}

// 注册
export const register = data => {
  return axios({
    method: 'post',
    url: '/register',
    data
  })
}

// 编辑用户信息
export const updataUserData = (id, data) => {
  return axios({
    method: 'post',
    url: `/user_update/${id}`,
    data
  })
}

// 我的关注
export const getMyFocus = id => {
  if (id) {
    return axios({
      url: '/user_follows/' + id
    })
  } else {
    return axios({
      url: '/user_follows'
    })
  }
}

// 取消关注
export const cancelMyFocus = id => {
  return axios({
    url: '/user_unfollow/' + id
  })
}

// 用户评论列表
export const getUserComments = () => {
  return axios({
    url: '/user_comments'
  })
}

// 收藏文章列表
export const collectionArticleList = () => {
  return axios({
    url: '/user_star'
  })
}
