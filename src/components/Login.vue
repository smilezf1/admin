<template>
  <div class="Login">
    <form class="login">
      <div class="login-top">欢迎登录</div>
      <div class="login-bottom">
        <label>
          <span>管理员：</span>
          <input type="text" name="name" class="text" />
        </label>
        <label>
          <span>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:</span>
          <input type="password" namw="pwd" class="pwd" />
        </label>
        <button type="button">登录</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: "Login"
};
</script>
<style>
.Login{
  height: 100vh;
  background: url("../../static/images/bg.png") center center;
  box-sizing:border-box;
 
}
.login {
  width: 428px;
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
  line-height: 117px;
  border-radius: 12px 12px 0 0;
}
.login-bottom{
    background:white;
    border-radius:0px 0px 12px 12px;
    padding:0 10px;
    position:relative;
    padding-bottom:4px;
}
.login input {
  width: 284px;
  line-height: 40px;
  outline: none;
  border: 1px solid #dae1e6;
  border-radius: 16px;
  margin-left:4px;
  margin-top:25px;
}
.login button{
    width:228px;
    line-height:40px;
    outline:none;
    background-color: #0371d1;
    border-radius:16px;
    border:none;
    color:white;
    cursor: pointer;
    text-align:center;
    display:block;
    margin:10px auto;
   
}
label{
    display:block;
    color:rgba(191, 191, 191, 0.75);
    margin-bottom:5px;
}
label span{
    position: relative;
   
}
</style>