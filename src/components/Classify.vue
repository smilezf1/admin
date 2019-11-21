<template>
  <div class="Classify">
    <div class="content">
      <div class="con-title">
        <el-button type="success" @click="dialogFormVisible = true">添加分类</el-button>
        <!-- 添加分类弹窗 -->
        <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="id" :label-width="formLabelWidth">
              <el-input v-model="form.id" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="图片" :label-width="formLabelWidth">
              <el-input v-model="form.img" autocomplete="off"></el-input>
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
              <!-- <el-input v-model="EDitForm.thumb" autocomplete="off"></el-input> -->
              <img :src="EDitForm.thumb" width="100" />
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
            <!-- <el-table-column property="title" label="公司名称" width="600" @click="companyDetail">
               <template slot-scope="scope">
                 <router-link to="/">{{scope.row.title}}<router-link>
                 <template>
            </el-table-column> -->
            <el-table-column prop='title' label="公司名称" width="600">
              <template slot-scope="scope">
                <!-- <router-link to="/">{{scope.row.title}}<router-link> -->
                  <router-link to="/" style="color:#333">{{scope.row.title}}</router-link>
                </template>
            </el-table-column>

          </el-table>
        </el-dialog>
      </div>
      <div class="con-table">
        <el-table :data="listItem" style="width:100%">
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
              <el-button type="danger">删除</el-button>
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
      dialogTableVisible:false,
      dialogFormVisible: false,
      dialogFormEditVisible: false,
      form: {
        id: "",
        name: "",
        img: ""
      },
      EDitForm: {
        id: "",
        name: "",
        img: ""
      },
      formLabelWidth: "40px"
    };
  },
  beforeMount() {
    this.http.get("amouse.index.getFlList").then(res => {
      this.listItem = res.list;
    });
  },
  mounted() {},
  methods: {
    addSure() {
      this.dialogFormVisible = false;
      console.log(this.$form);
    },
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
      console.log(this.EDitForm);
      this.dialogFormEditVisible = true;
    },
    detail(id) {
      this. dialogTableVisible=true;
      this.http
        .get("amouse.index.amouseContacts", { pcateid: id })
        .then(res => {
          this.companyItem = res.list;
        });
    },
    companyDetail(){
      this.$router.push({path:"Login"})
    }
  }
};
</script>
<style>
.el-table--scrollable-x .el-table__body-wrapper {
    overflow:hidden;}
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
.el-dialog {
  width: 25%;
}
</style>