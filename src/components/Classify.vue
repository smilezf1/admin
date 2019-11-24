<template>
  <div class="Classify">
    <div class="content">
      <div class="con-title">
        <div class="con-title-left" style="display:inline-block">
          <el-button type="primary" @click="dialogFormVisible = true">添加分类</el-button>
        </div>
        <div class="con-title-right" style="display:inline-block;margin-left:200px">
          <input style="border: 1px solid #dcdee2;height:40px;border-radius:4px;width:300px" />
          <el-button type="primary" style="padding: 12px 25px" @click="classifySearch">搜索</el-button>
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
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="xx"
                list-type="picture"
                :auto-upload="false"
                :limit="1"
                ref="upload"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传一张图片哦</div>
              </el-upload>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addCancel">取 消</el-button>
            <el-button type="primary" @click="addSure">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 编辑弹窗 -->
        <el-dialog title="编辑" :visible.sync=" dialogFormEditVisible">
          <el-form :model="form">
            <el-form-item label="id" :label-width="formLabelWidth">
              <el-input v-model=" EDitForm.id" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="名称" :label-width="formLabelWidth">
              <el-input v-model=" EDitForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="图片" :label-width="formLabelWidth">
              <img :src="EDitForm.thumb" width="60" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="editCancel">取 消</el-button>
            <el-button type="primary" @click="editSure">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 详情弹窗 -->
        <el-dialog title="详情" :visible.sync="dialogTableVisible">
          <el-table :data="companyItem">
            <el-table-column prop="title" label="公司名称" width="600">
              <template slot-scope="scope">
                <router-link
                  :to="{name:'CompanyDetail',params:{id:scope.row.id}}"
                  style="color:#333"
                >{{scope.row.title}}</router-link>
              </template>
            </el-table-column>
          </el-table>
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
  data() {
    return {
      modal1: false,
      listItem: [],
      companyItem: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogFormEditVisible: false,
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
      input: ""
      //上传图片
    };
  },
  beforeMount() {
     this.http.get("amouse.index.getFlList").then(res => {
       console.log(res.list);
      this.listItem = res.list;
     });
    this.http
      .get("amouse.index.images", {
        file:
          ""
      })
      .then(res => {
        // console.log(res,"图片上传");
      });
  },
  mounted() {},
  methods: {
    /* 添加分类 */
    addSure() {
      this.dialogFormVisible = false;
      let form = this.form;
      this.http
        .get("amouse.index.contactsList", {
          display: "add",
          name: form.name,
          thumb: form.img
        })
        .then(res => {
          console.log(res, this.listItem);
        })
        .catch(error => {
          console.log(error);
        });
    },
    /* 分类搜索 */
    classifySearch() {
      this.http
        .get("amouse.index.contactsList", {
          display: "list",
          search: "政府机关"
        })
        .then(res => {
          console.log(res, "查询");
        });
    },
    submitUpload() {},
    addCancel() {
      this.dialogFormVisible = false;
    },
    editSure() {
      this.dialogFormEditVisible = false;
      console.log(this.EDitForm);
    },
    editCancel() {
      this.dialogFormEditVisible = false;
    },
    edit(index, row) {
      this.listIndex = index;
      this.EDitForm = row;
      this.dialogFormEditVisible = true;
    },
    detail(id) {
      console.log(id);
      this.dialogTableVisible = true;
      this.http
        .get("amouse.index.amouseContacts", { pcateid:id })
        .then(res => {
          this.companyItem = res.list;
          console.log(res);
        }).catch(err=>{
          console.log(err);
        })
    },
    companyDetail() {
      this.$router.push({ path: "Login" });
    },
    /* 图片上传 */
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file, fileList);
    },
   xx(response,file,fileList){
     console.log(response,file,FileList);

   },    

    //删除
    delete1() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
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
  overflow: auto;
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