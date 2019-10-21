<template>
  <div
    class="articleSection1 common"
    v-if="articl.cover && articl.cover.length <= 2 && articl.type === 1"
    @click="$router.push('/articleDetails/' + articl.id)"
  >
    <div class="left">
      <p class="content">{{articl.title}}</p>
      <p class="info">
        <span>{{articl.user.nickname}}</span>
        <span>{{articl.comment_length}}人跟帖</span>
      </p>
    </div>
    <img class="oneImg" :src="articl.cover[0].url" />
  </div>

  <div
    class="articleSection2 common"
    v-else-if="articl.cover && articl.cover.length > 2 && articl.type === 1"
    @click="$router.push('/articleDetails/' + articl.id)"
  >
    <div class="left">
      <p class="content">{{articl.title}}</p>
    </div>
    <div class="threeImgs">
      <img :src="item.url" v-for="item in articl.cover" :key="item.id" />
    </div>
    <div class="info">
      <span>{{articl.user.nickname}}</span>&nbsp;
      <span>{{articl.comment_length}}人跟帖</span>
    </div>
  </div>

  <div
    class="articleSection3 common"
    v-else-if="articl.cover && articl.type === 2"
    @click="$router.push('/articleDetails/' + articl.id)"
  >
    <div class="left">
      <p class="content">{{articl.title}}</p>
    </div>
    <div class="video">
      <img :src="articl.cover[0].url" alt />
      <i class="iconfont iconshipin"></i>
    </div>
    <div class="info">
      <span>{{articl.user.nickname}}</span>&nbsp;
      <span>{{articl.comment_length}}人跟帖</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['articl']
}
</script>

<style lang="less" scoped>
.common {
  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    overflow: hidden;
    // flex: 1;
    // overflow: hidden;
    .content {
      font-size: 14px;
      padding: 0px 5px;
      line-height: 24px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .info {
    font-size: 12px;
    padding-left: 5px;
    color: #999;
    > span:nth-of-type(1) {
      padding-right: 15px;
    }
  }
}
.articleSection1 {
  padding: 15px 4px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  flex-wrap: wrap;
  .oneImg {
    width: 120/360 * 100vw;
    height: 70/360 * 100vw;
    object-fit: cover;
    padding-right: 5px;
  }
}
.articleSection2 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px 4px;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  .threeImgs {
    display: flex;
    padding: 8px 2px;
    > img {
      // flex: 1;
      width: 33.33%;
      padding: 2px;
      box-sizing: border-box;
      display: block;
    }
  }
}
.articleSection3 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px 4px;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  .video {
    width: 100%;
    // height: 170/360 * 100vw;
    padding: 8px 4px;
    box-sizing: border-box;
    position: relative;
    > img {
      width: 100%;
      // height: 100%;
    }
    i {
      position: absolute;
      font-size: 46/360 * 100vw;
      color: #fff;
      border: 1px solid #ccc;
      background-color: rgba(0, 0, 0, 0.2);
      box-shadow: 0px 0px 10px #fff;
      border-radius: 50%;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
