<template>
  <div class="CompanyDetail">
    <div class="main">
      <el-form :model="listItem">
        <el-form-item label="公司名称" :label-width="formLabelWidth">
          <el-input v-model="listItem.title"></el-input>
        </el-form-item>
        <el-form-item label="公司详情" :label-width="formLabelWidth">
          <!-- <vue-ueditor-wrap v-model="listItem.info" style="margin-top:40px;"></vue-ueditor-wrap> -->
          <el-input type="textarea" v-model="listItem.info" style="width:50%"></el-input>
        </el-form-item>
        <!-- images -->
        <el-form-item label="图片" :label-width="formLabelWidth">
          <img :src="listItem.images" style="height:80px">
          <el-upload
            action="https://www.51gso.com/arvato/app/arvato_shop_api.php?i=194&r=amouse.index.images"
            list-type="picture"
            :limit="1"
            :on-success="addAvatarSuccess"
            ref="upload"
          >
            <el-button size="small" type="primary" style="margin-bottom:10px">点击上传</el-button>
          </el-upload>
          <!-- <el-button @click="Carousel()">轮播图</el-button>
          <el-button>下方显示图</el-button> -->
          <el-radio v-model="listItem.isbanner" label="1" >轮播图</el-radio>
          <el-radio v-model="listItem.isbanner" label="2">下方显示图</el-radio>
        </el-form-item>
        <!-- picture -->
        <el-form-item label="大图" :label-width="formLabelWidth">
          <img :src="listItem.picture" style="height:80px;">
          <el-upload
            action="https://www.51gso.com/arvato/app/arvato_shop_api.php?i=194&r=amouse.index.images"
            list-type="picture"
            :limit="1"
            :on-success="addBigAvatarSuccess"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="listItem.mobile1"></el-input>
        </el-form-item>
        <el-form-item label="联系地址" :label-width="formLabelWidth">
          <el-input v-model="listItem.place"></el-input>
        </el-form-item>
        <el-button type="primary" @click="submit(listItem)">提交</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "CompanyDetail",
  inject: ["reload"],
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
      formLabelWidth: "40px",
      radio:"0"
    };
  },
  mounted() {
    let id = this.$route.params.id;
    this.http.get("amouse.index.getDetail", { id }).then(res => {
      this.listItem = res.detail;
       console.log(this.listItem);
    });
  },
  methods: {
    submit(value) {
      const _this = this;
      console.log(value);
      _this.http
        .get("amouse.index.contactsList", {
          display: "updata",
          id: value.id,
          pcateid: value.pcateid,
          info: value.info,
          title: value.title,
          images: value.images,
          mobile: value.mobile1,
          place: value.place,
          picture: value.picture
        })
        .then(res => {
          _this.reload();
          _this.$router.push({ name: "Detail" });
        });
    },
    /* 上传的是轮播图还是下方显示图  图片上传*/
    addAvatarSuccess(response) {
      console.log(response.path);
      this.listItem.images=response.path
    },
    /* 大图上传 */
    addBigAvatarSuccess(response) {
      this.listItem.picture=response.path
      console.log(response.path);
    }
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
.edui-editor-iframeholder {
  width: 100% !important;
}
.CompanyDetail .el-form-item__content {
  margin-left: 0 !important;
  display: block !important;
}
.CompanyDetail .el-input {
  width: 50%;
}
.CompanyDetail .el-form-item__label {
  text-align: left !important;
  width: 100% !important;
}
</style>