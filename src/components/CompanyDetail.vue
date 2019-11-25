<template>
  <div class="CompanyDetail">
    <div class="main">
      <!-- <h2 class="title">
          <p>公司名称</p>
          <el-input style="width:400px;margin-left:10px" v-model="listItem.title"></el-input>
        </h2>
        <p class="detail">公司详情</p>
        <vue-ueditor-wrap v-model="listItem.info"></vue-ueditor-wrap>
        <p class="phone">联系电话:
          <el-input v-model="listItem.mobile1" style="width:400px;margin-top:10px;"></el-input>
        </p>
        <p class="address">联系地址:
          <el-input v-model="listItem.place" style="min-width:400px;max-width:500px"></el-input>
        </p>
        <p class="images">
          图片
      </p>-->
      <el-form :model="listItem">
        <el-form-item label="公司名称" :label-width="formLabelWidth">
          <el-input v-model="listItem.title"></el-input>
        </el-form-item>
        <el-form-item label="公司详情" :label-width="formLabelWidth">
         <vue-ueditor-wrap v-model="listItem.info" style="margin-top:40px;"></vue-ueditor-wrap>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="listItem.mobile1"></el-input>
        </el-form-item>
        <el-form-item label="联系地址" :label-width="formLabelWidth">
          <el-input v-model="listItem.place"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "CompanyDetail",
  data() {
    return {
      myConfig: {
        autoHeightEnabled: true,
        // 初始容器高度
        initialFrameHeight: 240,
        // 初始容器宽度
        initialFrameWidth: "60%"
      },
      listItem: {},
      form: [],
      formLabelWidth: "40px"
    };
  },
  mounted() {
    let id = this.$route.params.id;
    this.http.get("amouse.index.getDetail", { id }).then(res => {
      console.log(res.detail);
      this.listItem = res.detail;
    });
    console.log(this.$route.params.id, "哈哈");
  },
  components: {}
};
</script>
<style>
.CompanyDetail {
  width: 50%;
  padding: 10px;
  background: white;
  margin: 10px;
  border-radius: 10px;
}
.CompanyDetail .nav {
  width: 87%;
  position: absolute;
  top: 0;
  left: 250px;
  height: 65px;
}
.CompanyDetail .right {
  width: 86%;
  height: 100%;
  margin: 10px 0 0 10px;
  float: left;
  background: white !important;
  overflow: auto;
}
.layout-header {
  background: white;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.main {
  width: 100%;
}
.main .title {
  color: #333;
  margin-bottom: 10px;
}
.main p {
  color: #333;
  margin: 20px 0;
  font-size: 18px;
  font-weight: 600;
}
#edui1 {
  width: 700px !important;
}
.CompanyDetail .edui-default .edui-editor-iframeholder {
  width: 100%;
}
.edui-editor-iframeholder{
  width:100% !important;
}
.CompanyDetail .el-form-item__content{
  margin-left:0 !important;
   display:block !important;
}
.CompanyDetail .el-input{
  width:50%;
}
.CompanyDetail .el-form-item__label{
  text-align:left !important;
  width:100% !important;
}
</style>