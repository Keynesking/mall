<template>
  <div class="home">
    <!-- 首页搜索框 -->
    <van-search
      v-model="searchVal"
      placeholder="请输入搜索关键词"
      disabled
      @click="handleSearchClick"
    />
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="blue">
      <van-swipe-item v-for="item in banner" :key="item.id">
        <img
          :src="item.image_url"
          width="100%"
          :style="{ display: 'block' }"
          alt=""
        />
      </van-swipe-item>
    </van-swipe>

    <transition name="van-fade">
      <div class="popup-shadow" v-show="$store.state.isShowShadow"></div>
    </transition>
    <!-- popup弹出窗口 -->
    <transition name="van-slide-right">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { GetHomeData } from "@/request/api";
export default {
  name: "Home",
  data() {
    return {
      searchVal: "", // 搜索框的v-model值
      banner: [],
    };
  },
  created() {
    GetHomeData()
      .then((res) => {
        // 请求成功之后执行
        console.log("--------then中的res是：", res.data.banner);
        this.banner = res.data.banner;
      })
      .catch((err) => {
        //请求失败的之后，执行这里代码
        console.log(err);
      });
  },
  components: {},
  methods:{
    handleSearchClick(){
      // 把是否展示阴影 的变量该成true。在home组件中改的。
        this.$router.push('/home/searchPopup');
        this.$store.commit("chanIsShowShadow", true);
    }
  }
};
</script>

<style lang="less" >
  //  vue原生写法（注意点：组件中不要书写这个需要过渡属性）
  // 过渡  从哪多个状态到哪个状态
  // .slide-enter, .slide-leave-to{
  //   // 过渡开始之前的状态
  //   right: -100%;
  // }
  // .slide-enter-active,.slide-leave-active {
  //   // 在这里书写过渡属性
  //   transition: right 0.5s;
  // }
  // .slide-enter-to, .slide-leave{
  //   // 过渡结束时候的状态
  //   right: 0;
  // }
  .popup-shadow{
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    position: absolute;
    left: 0;
    top: 0;
    z-index:998;
  }
</style>