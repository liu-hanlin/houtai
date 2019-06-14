<template>
  <div class="createuser">
    <p>添加或修改用户</p>
    <el-form ref="form" label-width="70px">
      <el-form-item label="账号">
        <el-input v-model="user.name" :disabled="id!='0'"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="user.pass" type='passward' :disabled='id!=0'></el-input>
      </el-form-item>
      <el-form-item label="确认密码" v-show="id=='0'">
        <el-input v-model="confirm"></el-input>
      </el-form-item>
      <el-form-item label="电话" >
        <el-input v-model="user.tel" ></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="user.email" ></el-input>
      </el-form-item>
      <el-form-item label="性别" :disabled="id!='0'">
        <el-radio label="男" :disabled="id!='0'" v-model="user.sex">男</el-radio>
        <el-radio label="女" :disabled="id!='0'" v-model="user.sex">女</el-radio>
      </el-form-item>
      <el-form-item label="身份证号" >
        <el-input v-model="user.idx" :disabled="id!='0'"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="user.des"></el-input>
      </el-form-item>
      <el-form-item label="生日">
        <el-date-picker type="date" placeholder="选择日期" v-model="user.time" style="width: 99%;"></el-date-picker>
      </el-form-item>
    </el-form>
    <div class="t-btn">
      <el-button type="primary" round @click="add()" v-if="id=='0'">注册</el-button>
      <el-button type="primary" round @click="update()" v-if="id!='0'">修改</el-button>
      <el-button type="primary" round @click="$router.go(-1)">返回</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import API from "../../common/js/API";
import fn from "../../common/js/fn";
export default {
  components: {},
  props: [],
  data() {
    return {
      id:'',
      confirm: "",
      user: {
        name: "",
        pass: "",
        tel: "",
        email: "",
        sex: "",
        idx: "",
        des: "",
        time: ""
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    add() {
      if (this.confirm != this.user.pass) {
        this.$message({
          message: "密码和确认密码不一致",
          type: "warning"
        });
      } else {
        this.$http({
          url: API.adduser,
          params: this.user
        }).then(d => {
          // console.log(d);

          if (d.data.code == -1) {
            fn.errCallback(this, d);
          }
          if (d.data.isok) {
            this.$message({
              message: d.data.info,
              type: "success"
            });
            this.$router.replace("/index/user");
          } else {
            this.$message({
              message: d.data.info,
              type: "warning"
            });
          }
        });
      }
    },
    update() {
      delete this.user._id;
      this.$http({
        url: API.updateuser,
        params: this.user
      }).then(d => {
         if(d.data.code==-1){
          fn.errCallback(this,d)
        }
        if (d.data.isok) {

          this.$message({
            message: d.data.info,
            type: "success"
          });
          this.$router.replace("/index/user");
        } else {
          this.$message({
            message: d.data.info,
            type: "warning"
          });
        }
      });
    }
  },
   mounted() {
    this.id = this.$route.params.id;
    if (this.id == "0") {
      //新建
    } else {
       this.$http({
        url: API.finduser,
        params: {
          id: this.id
        }
      }).then(d => {
        this.user = d.data.data[0];
        this.confirm = this.user.pass;
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.createuser {
  p {
    font-size: 30px;
    margin-top: 30px;
    margin-left: 30px;
    margin-bottom: 20px;
  }

  .el-input {
    width: 99%;
  }

  .t-btn {
    margin: 0 auto;
    text-align: center;
  }
}
</style>

