// 过滤器的本质是函数
// export default {}  返回默认对象
// 下面这句代码说明这个函数在将来这个文件被引入的时候可以进行返回
export const timeformat = (time, spe) => {
  // 时间格式化
  time = new Date(time)
  spe = spe || '-'
  let year = time.getFullYear()
  let month = time.getMonth() + 1
  let day = time.getDate()
  // 返回结果
  return year + spe + month + spe + day
}
