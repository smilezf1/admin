<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <el-form ref="loginForm" :model="param" :rules="rules" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="请输入用户名">
            <el-button slot="prepend" icon="el-icon-user"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="param.password"
            @keyup.enter.native="handleSubmit()"
            placeholder="请输入密码"
          >
            <el-button slot="prepend" icon="el-icon-key"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="handleSubmit('param')">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import md5 from "js-md5";
export default {
  name: "bb",
  data: function() {
    return {
      param: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  mounted() {},
  methods: {
    handleSubmit(param) {
      const _this = this;
      let model = this.$refs.loginForm.$options.propsData.model;
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.http
            .get("amouse.index.login", {
              username: model.username,
              pw: md5(model.password)
            })
            .then(res => {
              if (res.error == 0) {
                this.$Message.success("登录成功");
                this.$router.push("/Home");
              }
              if (res.error == 10000) {
                this.$Message.error("用户名或密码错误");
              }
            });
        } else {
          this.$Message.error("请填写用户名和密码");
        }
      });
    }
  }
};
</script>
<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("../../static/images/bg.png");
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>