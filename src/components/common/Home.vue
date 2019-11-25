<template>
  <div class="wrapper">
    <Header/>
    <slideBar/>
    <div class="content-box" :class="{'content-collapse':collapse}">
      <div class="content">
        <transition name="move" mode="out-in">
          <keep-alive :include="tagsList">
            <router-view></router-view>
          </keep-alive>
        </transition>
          <!-- <Classify/> -->
        <el-backtop target=".content">
        </el-backtop>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "./Header"; //头部
import slideBar from "./slideBar"; //侧边栏
import bus from "./bus";
import Classify from "@/components/Classify.vue";
export default {
  name: "Home",
  data() {
    return {
      tagsList: [],
      collapse: false
    };
  },
  components: {
    Header,
    slideBar,
    Classify
  },
  created() {
    bus.$on("collapse-content", msg => {
      this.collapse = msg;
    });

    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    bus.$on("tags", msg => {
      let arr = [];
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name);
      }
      this.tagsList = arr;
    });
  }
};
</script>
<style>
.content{
  height:100%;
}
.content-box{
  position: absolute;
    left: 250px;
    right: 0;
    top: 70px;
    bottom: 0;
    padding-bottom: 30px;
    overflow-y:auto;
}

</style>