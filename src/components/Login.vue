<template>
  <div class="Login">
    <!-- <form class="login" @submit.prevent="submit($event)">
      <div class="login-top">欢迎登录</div>
      <div class="login-bottom">
        <label>
          <span>管理员：</span>
          <input type="text" value="" v-model="userName" class="text" />
        </label>
        <label>
          <span>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:</span>
          <input type="password" value="" v-model="passWord" class="pwd" />
        </label>
        <label>
          <button @click="submitForm($event)">登录</button>
        </label>
      </div>
    </form>-->
    <!-- <i-form v-ref:from-inline :model="formInline" :rules="ruleInline" inline class="login">
      <div class="login-top">欢迎登录</div>
      <div class="login-content">
        <Form-item prop="user" style="width:100%">
          <i-input type="text" placeholder="UserName">
            <Icon type="ios-person" slot="prepend"></Icon>
          </i-input>
        </Form-item>
        <Form-item prop="password" style="width:100%">
          <i-input type="password" placeholder="Password">
            <Icon type="md-lock" slot="prepend"></Icon>
          </i-input>
        </Form-item>
        <i-button type="primary"  @click="handleSubmit('formIline')">登录</i-button>
      </div>
    </i-form>-->
    <div class="formcard">
      <div>后台管理系统</div>
      <div>
        <i-form ref="loginForm" :model="loginForm" :rules="loginRules" inline>
          <FormItem prop="userName" style="width:100%">
            <i-input v-model="loginForm.userName" placeholder="请输入用户名">
              <span slot="prepend">
                <Icon :size="16" type="ios-person"></Icon>
              </span>
            </i-input>
          </FormItem>
          <FormItem prop="password" style="width:100%">
            <i-input
              type="password"
              @keyup.native.enter="handleSubmit('loginForm')"
              v-model="loginForm.password"
              placeholder="请输入密码"
            >
              <span slot="prepend">
                <Icon :size="14" type="md-lock"></Icon>
              </span>
            </i-input>
          </FormItem>
        </i-form>
        <Button class="logintn" @click="handleSubmit('loginForm')" type="primary" long>登录</Button>
      </div>
    </div>
  </div>
</template>
<script>
import md5 from "js-md5";
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        userName: "",
        password: ""
      },
      loginRules: {
        userName: [
          {
            required: true,
            message: "账号不能为空",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      const _this = this;
      let model = this.$refs.loginForm.$options.propsData.model;
      console.log(model);
      this.$refs[name].validate(valid => {
        if (valid) {
          this.http
            .get("amouse.index.login", {
              username: model.userName,
              pw: md5(model.password)
            })
            .then(res => {
              console.log(res.error);
              if (res.error == 0) {
                this.$Message.success("登录成功");
                setTimeout(function() {
                  _this.$router.push({ path: "Index" });
                }, 1000);
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
<style>
.Login {
  height: 100vh;
  background: url("../../static/images/bg.png") center center;
  box-sizing: border-box;
}
.login {
  width: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.login-top {
  width: 100%;
  background: #0371d1;
  color: white;
  font-size: 30px;
  text-align: center;
  line-height: 80px;
  border-radius: 12px 12px 0 0;
}

.login-bottom {
  background: white;
  border-radius: 0px 0px 12px 12px;
  padding: 0 10px;
  position: relative;
  padding-bottom: 4px;
}
.login-bottom label {
  text-align: justify;
}
.login input {
  width: 284px;
  line-height: 40px;
  outline: none;
  border: 1px solid #dae1e6;
  border-radius: 16px;
  margin-left: 4px;
  margin-top: 25px;
}
.login button {
  width: 220px;
  line-height: 40px;
  outline: none;
  background-color: #0371d1;
  border-radius: 16px;
  border: none;
  color: white;
  cursor: pointer;
  text-align: center;
  display: block;
  margin: 10px auto;
}
label {
  display: block;
  color: rgba(191, 191, 191, 0.75);
  margin-bottom: 5px;
}
label span {
  position: relative;
}
.formcard {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  right: 150px;
  width: 360px;
  height: 275px;
  background-color: #0371d18a;
  padding: 30px;
  border-radius: 5px;
}
.formcard > div:nth-child(1) {
  text-align: center;
  margin-bottom: 20px;
  font-weight: 600;
  color: #ffffff;
  font-size: 20px;
}

.logintn:hover {
  opacity: 0.9;
}
</style>