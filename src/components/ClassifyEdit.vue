<template>
  <div class="ClassifyEdit layout" :class="{'layout-hide-text':spanLeft<3}">
    <Row type="flex">
      <i-col :span="spanLeft" class="layout-menu-left">
        <Menu active-key="1" theme="dark" width="auto">
          <div class="layout-logo-left">
            <img src="../../static/images/logo.jpg" style="width:70px;" />
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
           分类编辑页面
          </div>
        </div>
      </i-col>
    </Row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      spanLeft: 3,
      spanRight: 21
    };
  },
  computed: {
    iconSize() {
      return this.spanLeft === 3 ? 14 : 24;
    }
  },
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

};
</script>
<style>
.layout {
  height: 100%;
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.ivu-row-flex {
  height: 100%;
}
.layout-header{
  background:white;
  box-shadow: 0 1px 1px rgba(0,0,0,.1)
}
.layout-content {
  min-height: 100%;
  margin: 15px;
  overflow: hidden;
  background: #fff;
  border-radius: 4px;
}
.layout-content-main {
  padding: 10px;
}
.layout-menu-left {
  background: #464c5b;
}
.layout-content-header {
  height: 60px;
  background: #fff;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
}

</style>