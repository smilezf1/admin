<template>
  <div class="CompanyDetail">
    <Left />
    <div class="right">
      <div class="nav">
        <Head />
      </div>
      <div class="main">
        <h2 class="title">
          公司名称
          <i-input style="width:200px;margin-left:10px" v-model="listItem.title"></i-input>
        </h2>
        <vue-ueditor-wrap v-model="listItem.info"></vue-ueditor-wrap>
      </div>
    </div>
  </div>
</template>
<script>
import Head from "@/components/Head.vue";
import Left from "@/components/Left.vue";
export default {
  name: "CompanyDetail",
  data() {
    return {
      msg:
        '<h2><img src="http://img.baidu.com/hi/jx2/j_0003.gif"/>Vue + UEditor + v-model双向绑定</h2>',
      myConfig: {
         autoHeightEnabled:true,
        // 初始容器高度
        initialFrameHeight: 240,
        // 初始容器宽度
        initialFrameWidth: "60%"
      },
      listItem:{}
    };
  },
  mounted(){
    let id=this.$route.params.id;
    this.http.get("amouse.index.getDetail",{id}).then(res=>{
      console.log(res.detail);
      this.listItem=res.detail;
    })
    console.log(this.$route.params.id,"哈哈");
  },
  components: { Left, Head }
};
</script>
<style>
.CompanyDetail {
  height: 100%;
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
  position: absolute;
}
.main .title {
  font-weight: bolder;
  color: #333;
}
#edui1 {
  width: 700px !important;
}
</style>