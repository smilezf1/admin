<template>
  <div class="Classify">
    <h3 class="title">公司分类</h3>
    <div class="content">
      <div class="con-title">
        <i-button type="info">添加分类</i-button>
      </div>
      <div class="con-table">
        <i-table :columns="columns1" :data="listItem">     
        </i-table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns1: [
        {
          title: "分类ID",
          key: "id"
        },
        {
          title: "分类名称",
          key: "name"
        },
        {
          title: "分类图片",
          key: "thumb",
          render: (h, params) => {
            return h("img", {
              style: {
                width: "50px",
                padding: "10px 0px"
              },
              attrs: { src: params.row.thumb }
            });
          }
        },
        {
          title: "操作",
          key: "operate",
          fixed:"right",
          render(){
            return `<i-button type="text" size="small">查看</i-button><i-button type="text" size="small">编辑</i-button>`
          }
        }
      ],
      listItem: []
    };
  },
  beforeMount() {
    this.http.get("amouse.index.getFlList").then(res => {
      console.log(res.list);
      this.listItem = res.list;
    });
  }
};
</script>
<style>
.Classify .title {
  color: #000;
  font-size: 15px;
}
.Classify .content {
  height: 500px;
  border: 1px solid #dcdee2;
  border-radius: 6px;
  background: white;
}
.Classify .con-title {
  padding: 10px;
}
</style>