// 引入axios
import axios from '@/utils/myaxios.js'

// 文章列表
export const getArticalList = params => {
  return axios({
    url: '/post',
    params
  })
}

// 文章详情
export const getArticleById = id => {
  return axios({
    url: '/post/' + id
  })
}

// 点赞
export const likeArticles = id => {
  return axios({
    url: '/post_like/' + id
  })
}

// 评论列表
export const getCommentList = id => {
  return axios({
    url: '/post_comment/' + id
  })
}

// 收藏文章
export const collectionArticles = id => {
  return axios({
    url: '/post_star/' + id
  })
}

// 发表评论
export const sendComment = (id, data) => {
  return axios({
    method: 'post',
    url: '/post_comment/' + id,
    data
  })
}
