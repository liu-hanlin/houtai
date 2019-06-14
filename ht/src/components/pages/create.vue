<template>
  <div class="create">
    <p>添加/修改管理员</p>
    <el-form ref="form" label-width="70px">
      <el-form-item label="账号">
        <el-input v-model="user.name" :disabled="id!='0'"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="user.pass" type="password" :disabled="id!='0'" ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" v-show="id=='0'">
        <el-input v-model="confirm" type="password"  
          ></el-input>
      </el-form-item>
      <el-form-item label="属性">
        <el-input v-model="user.prop"></el-input>
      </el-form-item>
      <el-form-item label="注册时间">
        <el-date-picker type="date" placeholder="选择日期" v-model="user.time" style="width: 99%;"></el-date-picker>
      </el-form-item>
    </el-form>
    <div class="t-btn">
      <el-button type="primary" round v-if="id=='0'" @click="add()">注册</el-button>
      <el-button type="danger" round v-if="id!='0'" @click="update()">修改</el-button>
      <el-button type="primary" round  @click="$router.go(-1)">返回</el-button>
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
      confirm: "",
      id:'',
      user: {
        name: "",
        pass: "",
        prop: "",
        time: ""
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    add() {
      if(this.user.pass!=this.confirm){
      this.$message({
      message:'密码和确认密码不一致',
      type:'warning'
      });
      }else{
        this.$http({
          url:API.addmanage,
          params:this.user
        }).then(d=>{
           if (d.data.code == -1) {
            fn.errCallback(this, d);
          }
          if (d.data.isok) {
            this.$message({
              message: d.data.info,
              type: "success"
            });
            this.$router.replace("/index/manage");
            }else {
            this.$message({
              message: d.data.info,
              type: "warning"
            });
          }

        })
      }
    },
    update(){
      delete this.user._id;
      this.$http({
        url:API.updatemanage,
        params:this.user
      }).then(d=>{
      // console.log(d);
       if(d.data.code==-1){
          fn.errCallback(this,d)
        } if(d.data.isok){
        this.$message({
          message:d.data.info,
          type:'success'
        });
        this.$router.replace('/index/manage')
        }else{
          $message({
            message:d.data.info,
            type:'warning'
          });
        }
      });
    }
  },
  mounted() {
    this.id=this.$route.params.id;
    if(this.id=='0'){

    }else{
      this.$http({
        url:API.findmanage,
        params:{
          id:this.id
        }
      }).then(d=>{
        this.user=d.data.data[0];
        this.confirm=this.user.pass;
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.create {
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
  >>>.el-form,thead.tr{
   background none 

}
}
</style>

