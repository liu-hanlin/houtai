<template>
  <div class="createnotice">
    <p v-show="isAdmin!='2'">添加或修改通知</p>
    <div class="box">
      <el-form ref="form"  label-width="80px">
      <el-form-item label="题目">
        <el-input v-model="user.tit" :disabled="isAdmin=='2'"></el-input>
      </el-form-item>
      <el-form-item label="内容" >
        <el-input type="textarea" v-model="user.con" class="textarea" :disabled="isAdmin=='2'"></el-input>
      </el-form-item>
      <el-form-item label="时间" >
      <el-date-picker type="date" placeholder="选择日期" v-model="user.time" style="width: 99%;"  :disabled="isAdmin=='2'" ></el-date-picker>
    </el-form-item>
    </el-form>
    </div>
    <div class="t-btn">
      <el-button type="success" round  @click="add()"
      v-if="id=='0'"
      >发布</el-button>
      <el-button type="success" round v-show="isAdmin!='2'"
      v-if="id!='0'" @click="update()"
      >修改</el-button>
      <el-button type="success" round @click="$router.go(-1)">返回</el-button>
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
      isAdmin:'',
     user:{
       tit:'',
      time:'',
      con:''

     }
    };
  },
  watch: {},
  computed: {},
  methods: {
    add() {
        this.$http({
          url: API.addnotice,
          params: this.user
        }).then(d => {
          if (d.data.code == -1) {
            fn.errCallback(this, d);
          }
          if (d.data.isok) {
            this.$message({
              message: d.data.info,
              type: "success"
            });
            this.$router.replace("/index/notice");
          } else {
            this.$message({
              message: d.data.info,
              type: "warning"
            });
          }
        });
    },
    update() {
      delete this.user._id;
      this.$http({
        url: API.updatenotice,
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
          this.$router.replace("/index/notice");
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
    this.isAdmin=localStorage.getItem('isAdmin')
    this.id = this.$route.params.id;
    if (this.id == "0") {
      //新建
    } else {
      //修改
       this.$http({
        url: API.findnotice,
        params: {
          id: this.id
        }
      }).then(d => {
        this.user = d.data.data[0];
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.createnotice {
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
  .textarea{
      width 99%
  }
  .box{
    margin-top 30px
  }
}
</style>

