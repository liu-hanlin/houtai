<template>
  <div class="body">
    <div class="login">
      <h2>登录</h2>
      <hr>
      <div>
        <el-select class="select" v-model="user.type" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>

      <div class="user">
        <el-input placeholder="用户名" v-model="user.name" clearable></el-input>
      </div>
      <div class="pass">
        <el-input placeholder="密码" type="password" v-model="user.pass" clearable></el-input>
      </div>
      <div class="btn">
        <el-row>
          <el-button type="primary" @click="login()">登录</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import API from "../../common/js/API.js";
export default {
  components: {},
  props: [],
  data() {
    return {
      user: {
        name: "",
        pass: "",
        type: ""
      },
      options: [
        {
          value: '0',
          label: "超级管理员"
        },
        {
          value: '1',
          label: "普通管理员"
        },
        {
          value: '2',
          label: "用户"
        }
      ],
      select: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    login() {
      var user = this.$qs.stringify(this.user);
      this.$http({
        url: API.login,
        method: "post",
        data: user
      }).then(data => {
        // console.log(data);
        if (data.data.isok) {
          this.$message({
            message: data.data.info,
            type: "success"
          });
          localStorage.setItem("isAdmin", data.data.isAdmin);
          localStorage.setItem("username", this.user.name);
          this.$router.replace("/index");
        }else{
          this.$message({
            message:data.data.info,
            type:"warning"
          });
        }
      });
      // this.$router.push('/index')
    }
  },
  mounted() {}
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';

.body {
  background-color: #ccc;
  width: 100vw;
  height: 100vh;

  .login {
    position: absolute;
    background-color: $fff;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 300px;
    height: 300px;

    h2 {
      margin: 0 auto;
      text-align: center;
      font-size: 20px;
      margin: 10px;
    }

    .select {
      width: 290px;
      height: 50px;
      margin-left: 5px;
      padding-top: 5px;
    }

    .user {
      margin: 0 5px 5px;
    }

    .pass {
      margin: 0 5px 5px;
    }

    .btn {
      margin: 0 auto;
      text-align: center;
      padding-top: 20px;
    }
  }
}
</style>


