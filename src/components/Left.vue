<template>
  <div class="left">
    <Menu active-key="1" theme="dark" width="auto" style="height:100%;float:left;width:100%">
      <div class="title">
        <img src="../../static/images/logo.jpg" style="width:70px;" />
        <span>黄页上海</span>
      </div>
      <Menu-item key="1" name="MenuItem">
        <Icon type="ios-keypad" :size="24"></Icon>
        <span class="layout-text">公司分类</span>
      </Menu-item>
    </Menu>
  </div>
</template>
<script>
export default {
  name: "Left"
};
</script>
<style>
.left {
  width: 13%;
  height: 100%;
  background: #515a6e;
  float:left;
}
.title {
  display: flex;
  align-items: center;
  padding: 10px;
}
.title span {
  font-size: 14px;
  margin-left: 6px;
  color: white;
}
</style>