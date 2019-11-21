<template>
  <div class="left">
     <Menu active-key="1" theme="dark" width="auto" style="height:100%;float:left;width:100%">
          <div class="title">
            <img src="../../static/images/logo.jpg" style="width:70px;">
            <span>黄页上海</span>
          </div>
          <Menu-item key="1">
            <Icon type="ios-keypad" :size="iconSize"></Icon>
            <span class="layout-text">公司分类</span>
          </Menu-item>
        </Menu>
  </div>
</template>
<script>
export default {
  name: "left"
};
</script>
<style>
.left {
  width: 250px;
  height: 100%;
}
.title {
  display: flex;
  align-items: center;
  padding: 10px;
}
.title span {
  font-size: 14px;
  margin-left: 6px;
  color:white;
}
</style>