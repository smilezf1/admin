<template>
  <div class="Detail">
    <div class="Detail-top">
      <el-button type="primary" @click="dialogFormVisible=true">添加公司</el-button>
      <!-- 添加公司弹窗 -->
      <el-dialog title="添加公司" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="公司名称" :label-width="formLabelWidth">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="公司详情" :label-width="formLabelWidth">
            <el-input type="textarea" v-model="form.info"></el-input>
          </el-form-item>
          <el-form-item label="图片" :label-width="formLabelWidth">
            <img :src="form.images" width="60" />
            <el-upload
              action="https://www.51gso.com/arvato/app/arvato_shop_api.php?i=194&r=amouse.index.images"
              list-type="picture"
              :limit="1"
              :on-success="addAvatarSuccess"
              ref="upload"
            >
              <el-button size="small" type="primary" style="margin-top:10px">上传</el-button>
            </el-upload>
            <el-radio label="1" v-model="form.isbanner">轮播图</el-radio>
            <el-radio label="2" v-model="form.isbanner">下方显示图</el-radio>
             <el-radio label="0" v-model="form.isbanner">不显示</el-radio>
          </el-form-item>
          <el-form-item label="大图" :label-width="formLabelWidth">
            <img :src="form.picture" width="60" />
            <el-upload
              action="https://www.51gso.com/arvato/app/arvato_shop_api.php?i=194&r=amouse.index.images"
              list-type="picture"
              :limit="1"
              :on-success="addBigAvatarSuccess"
              ref="upload"
            >
            <el-button size="small" type="primary">上传</el-button>
            </el-upload> 
          </el-form-item>
          <el-form-item label="联系方式" :label-width="formLabelWidth">
            <el-input v-model="form.mobile"></el-input>
          </el-form-item>
          <el-form-item label="联系地址" :label-width="formLabelWidth">
            <el-input v-model="form.place"></el-input>
          </el-form-item>
          <el-button type="primary" @click="submit(form)">提交</el-button>
        </el-form>
      </el-dialog>
      <el-input style="width:300px;margin-left:200px" v-model="searchValue"></el-input>
      <el-button type="primary" @click="search(searchValue)">搜索</el-button>
    </div>
    <el-table :data="listItem" style="padding-left:10px;">
      <el-table-column prop="title" label="公司名称">
        <template slot-scope="scope">
          <span style="color:#333">{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="edit(scope.$index,scope.row)"
            v-model="dialogFormVisible"
          >编辑</el-button>
          <el-button type="danger" @click="delete1(scope.row.id,scope.row.pcateid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "Detail",
  inject: ["reload"],
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "40px",
      listItem: [],
      searchValue: "",
      form: {
        title: "",
        info: "",
        images: "",
        isbanner:"",
        picture: "",
        mobile: "",
        place: ""
      }
    };
  },
  mounted() {
    let id = this.$route.params.id || 23;
    this.http.get("amouse.index.amouseContacts", { pcateid: id }).then(res => {
      this.listItem = res.list;
    });
  },
  methods: {
    search(value) {
      let id = this.$route.params.id;
      const _this = this;
      console.log(value);
      if (value == "") {
        this.$Message.error("请输入查询内容");
      } else {
        this.http
          .get("amouse.index.contactsList", {
            display:"list",
            search: value,
            pcateid: id
          })
          .then(res => {
            console.log(res);
            if (!res.message) {
              _this.listItem = res.list;
            } else {
              this.$message.error("查不到相关数据");
            }
          });
      }
    },
    /* 上传 */
    addAvatarSuccess(response) {
      this.form.images=response.path;
      console.log(response,"小图")
    },
    /* 大图上传 */
    addBigAvatarSuccess(response){
      this.form.picture=response.path;
      console.log(response.path,this.form.picture,"大图")
    },
    //编辑
    edit(index, row) {
      const _this = this;
      _this.$router.push({ name:"CompanyDetail", params: { id: row.id } });
    },
    submit(value) {
      const _this = this;
      let id = this.$route.params.id||23;
      this.dialogFormVisible = false;
      console.log(id);
      _this.http
        .get("amouse.index.contactsList", {
          display:"add",
          pcateid: id,
          isbanner:value.isbanner,
          info: value.info,
          title: value.title,
          images: value.images,
          picture:value.picture,
          mobile: value.mobile,
          place: value.place
        })
        .then(res => {
          _this.reload();
           _this.$router.push({path:"/Home"});
          console.log(res, _this.listItem);
        });
    },
    /* 删除 */
    delete1(id, pcateid) {
      console.log("哈哈", id, pcateid);
      const _this = this;
      _this
        .$confirm("此操作将永久删除文件,是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          _this.http
            .get("amouse.index.contactsList", {
              display: "slice",
              id: [id],
              pcateid: 23
            })
            .then(res => {
              _this.reload();
              console.log(res, "执行了嘛");
            });
          _this.$message({
            type: "success",
            message: "删除成功"
          });
        })
        .catch(err => {
          console.log(err);
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style>
.Detail-top {
  padding: 10px;
}
.Detail label {
  width: 80px !important;
}
.Detail .el-form-item__label {
  text-align: left !important;
}
.Detail .el-form-item__content {
  margin-left: 0 !important;
}
.Detail .el-textarea {
  display: block;
}
.Detail .el-form .el-input {
  width: 50%;
  display: block;
}
.el-textarea {
  width: 400px !important;
}
.el-textarea textarea {
  height: 80px;
}
</style>