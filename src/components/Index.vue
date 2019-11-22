<template>
  <!-- <div class="Index layout" :class="{'layout-hide-text':spanLeft<3}">
    <Row type="flex">
      <i-col :span="spanLeft" class="layout-menu-left">
        <Menu active-key="1" theme="dark" width="auto">
          <div class="layout-logo-left">
            <img src="../../static/images/logo.jpg" style="width:70px;">
            <span>黄页上海</span>
          </div>
          <Menu-item key="1">
            <Icon type="ios-keypad" :size="iconSize"></Icon>
            <span class="layout-text">公司分类</span>
          </Menu-item>
        </Menu>
      </i-col>
      <i-col :span="spanRight">
        <div class="layout-header">
          <i-button type="text" @click="toggleClick">
           <Icon type="ios-more" :size="32"></Icon>
          </i-button>
        </div>
        <div class="layout-content">
          <div class="layout-content-main">
            <Classify/>
          </div>
        </div>
      </i-col>
    </Row>
  </div>-->
  <div class="Index">
    <Left />
    <div class="right">
      <div class="nav">
        <Head />
      </div>
      <div class="main">
        <Classify />
      </div>
    </div>
  </div>
</template>
<script>
import Classify from "@/components/Classify.vue";
import Left from "@/components/Left.vue";
import Head from "@/components/Head.vue";
export default {
  name: "Index",
  data() {
    return {
      spanLeft: 3,
      spanRight: 21
    };
  },
  computed: {},
  methods: {
    toggleClick() {
      if (this.spanLeft == 3) {
        this.spanLeft = 2;
        this.spanRight = 22;
      } else {
        this.spanLeft = 3;
        this.spanRight = 21;
      }
    }
  },
  components: { Classify, Left, Head }
};
</script>
<style>
.Index {
  height: 100%;
  box-sizing: border-box;
}
.Index .nav {
  width: 87%;
  height: 65px;
  position: absolute;
  top: 0;
  left: 250px;
}
.right {
  width: 86%;
  height: 100%;
  margin: 10px 0 0 10px;
  float: left;
  background: white !important;
}
.main {
  width: 86%;
  height: 100%;
  overflow: auto;
  position: absolute;
  margin-top:56px;
}
.layout-header {
  background: white;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.ivu-btn-text:hover {
  color: none !important;

  border-color: transparent;
}
.ivu-menu-dark {
  background: none;
}
.layout-logo-left {
  width: 90%;
  border-radius: 3px;
  margin: 15px auto;
  color: white;
  display: flex;
  align-items: center;
}
.layout-logo-left span {
  margin-left: 10px;
}
.layout-ceiling-main a {
  color: #9ba7b5;
}
.layout-hide-text .layout-text {
  display: none;
}
.ivu-col {
  transition: width 0.2s ease-in-out;
}
</style>