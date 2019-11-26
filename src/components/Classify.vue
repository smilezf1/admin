<template>
  <div class="Classify">
    <div class="content">
      <div class="con-title">
        <div class="con-title-left" style="display:inline-block">
          <el-button type="primary" @click="dialogFormVisible = true">添加分类</el-button>
        </div>
        <div class="con-title-right" style="display:inline-block;margin-left:200px">
          <input
            style="border: 1px solid #dcdee2;height:40px;border-radius:4px;width:300px"
            v-model="searchValue"
          />
          <el-button
            type="primary"
            style="padding: 12px 25px"
            @click="classifySearch(searchValue)"
          >搜索</el-button>
        </div>
        <!-- 添加分类弹窗 -->
        <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="图片" :label-width="formLabelWidth">
              <el-upload
                class="upload-demo"
                action="https://www.51gso.com/arvato/app/arvato_shop_api.php?i=194&r=amouse.index.images"
                :before-upload="beforeUploadAddClassify"
                :on-success="addAvatarSuccess"
                list-type="picture"
                :limit="1"
                ref="upload"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addCancel">取 消</el-button>
            <el-button type="primary" @click="addSure">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 编辑弹窗 -->
        <el-dialog title="编辑" :visible.sync="dialogFormEditVisible">
          <el-form :model="EDitForm">
            <el-form-item label="id" :label-width="formLabelWidth">
              <el-input v-model=" EDitForm.id" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="名称" :label-width="formLabelWidth">
              <el-input v-model=" EDitForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="图片" :label-width="formLabelWidth">
              <img :src="EDitForm.thumb" width="60" />
              <el-upload
                action="https://www.51gso.com/arvato/app/arvato_shop_api.php?i=194&r=amouse.index.images"
                list-type="picture"
                :on-success="editAvatarSuccess"
                :limit="1"
                ref="upload"
              >
                <el-button size="small" type="primary">上传</el-button>
              </el-upload>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="editCancel">取 消</el-button>
            <el-button type="primary" @click="editSure">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 删除弹窗 -->
      </div>
      <div class="con-table">
        <el-table :data="listItem" style="width:100%;margin-left:15px">
          <el-table-column prop="id" label="分类ID" width="180">
            <template slot-scope="scope">
              <span>{{scope.row.id}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="分类名称" width="180">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="thumb" label="分类图片">
            <template slot-scope="scope">
              <img :src="scope.row.thumb" width="50" />
            </template>
          </el-table-column>
          <el-table-column label="操作" style="margin-left:20px">
            <template slot-scope="scope">
              <el-button
                type="primary"
                @click="edit(scope.$index, scope.row)"
                v-model="dialogFormEditVisible"
              >编辑</el-button>
              <el-button type="info" @click="detail(scope.row.id)">详情</el-button>
              <el-button type="danger" @click="delete1(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import { Modal } from "iview";
export default {
  inject: ["reload"],
  data() {
    return {
      modal1: false,
      listItem: [],
      companyItem: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogFormEditVisible: false,
      searchValue: "",
      form: {
        name: "",
        img: ""
      },
      EDitForm: {
        id: "",
        name: "",
        img: ""
      },
      formLabelWidth: "40px",
      dialogVisible: false,
      input: "",
      //上传图片
      uploadImg: ""
    };
  },
  beforeMount() {
    this.http.get("amouse.index.getFlList").then(res => {
      this.listItem = res.list;
    });
  },
  mounted() {},
  methods: {
    /* 添加分类 */
    addSure() {
      const _this = this;
      this.dialogFormVisible = false;
      let form = _this.form;
      _this.http
        .get("amouse.index.flList", {
          display: "add",
          display: "add",
          name: form.name,
          thumb: form.img
        })
        .then(res => {
          _this.reload();
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    },
    beforeUploadAddClassify(file) {
      // let fd = new FormData();
      // fd.append("file", file);
      // console.log("哈哈",file);
    },
    //上传成功后
    addAvatarSuccess(response, file) {
      this.form.img = response.path;
    },
    /* 编辑 */
    editAvatarSuccess(response) {
      console.log(response.path);
      this.EDitForm.img = response.path;
    },
    /* 分类搜索 */
    classifySearch(value) {
      const _this = this;
      if (value == "") {
        this.$message.error("请输入查询内容");
      } else {
        this.http
          .get("amouse.index.flList", {
            display: "list",
            search: value
          })
          .then(res => {
            if (!res.message) {
              _this.listItem = res.list;
            } else {
              this.$message.error("查不到相关数据");
            }
          });
      }
    },
    submitUpload() {},
    addCancel() {
      this.dialogFormVisible = false;
    },
    editSure() {
      const _this = this;
      this.dialogFormEditVisible = false;
      console.log(this.EDitForm);
      _this.http
        .get("amouse.index.flList", {
          display: "updata",
          id: this.EDitForm.id,
          name: _this.EDitForm.name,
          thumb: _this.EDitForm.img
        })
        .then(res => {
          console.log(res);
          _this.reload();
        });
    },
    editCancel() {
      this.dialogFormEditVisible = false;
    },
    edit(index, row) {
      this.listIndex = index;
      this.EDitForm = row;
      this.dialogFormEditVisible = true;
    },
    detail(id, pcateid) {
      this.$router.push({ name: "Detail", params: { id, pcateid } });
    },
    companyDetail() {
      this.$router.push({ path: "Login", params: { id } });
    },
    /* 图片上传 */

    //删除
    delete1(id) {
      const _this = this;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _this.http
            .get("amouse.index.flList", { display: "slice", id: [id] })
            .then(res => {
              
              _this.reload();
            });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(err => {
        
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
.el-table--scrollable-x .el-table__body-wrapper {
  overflow: hidden;
}
.Classify {
  height: 100%;
  overflow-x: hidden;
}
.Classify .title {
  color: #000;
  font-size: 15px;
}
.Classify .content {
  border: 1px solid #dcdee2;
  border-radius: 6px;
  background: white;
}
.Classify .con-title {
  padding: 10px;
}
.el-dialog {
  width: 25%;
}
.el-input--small .el-input__inner {
  height: 40px;
  line-height: 40px;
}
</style>