<template>
 <div class="createdevice">
 <p>添加/修改设备</p>
 <el-form ref="form"  label-width="70px">
      <el-form-item label="ip">
        <el-input v-model="user.ip"></el-input>
      </el-form-item>
      <el-form-item label="机房">
        <el-input v-model="user.door"></el-input>
      </el-form-item>
      <el-form-item label="编号">
        <el-input v-model="user.num"></el-input>
      </el-form-item>
      <el-form-item label="宽带">
        <el-input v-model="user.width"></el-input>
      </el-form-item>
       <el-form-item label="状态">
    <el-radio-group v-model="user.status">
      <el-radio label="1" v-model="user.status">空闲</el-radio>
      <el-radio label="0" v-model="user.status">已出售</el-radio>
    </el-radio-group>
  </el-form-item>
    </el-form>
    <div class="t-btn">
         <el-button type="primary" @click="add()" v-if="id=='0'" round>新建</el-button>
      <el-button type="primary" @click="update()" v-if="id!='0'" round>修改</el-button>
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
 data () {
 return {
         id: "",
      user: {
        ip: "",
        num: "",
        width: "",
        door: "",
        status: ""
      }
 };
 },
 watch: {},
 computed: {},
  methods: {
    add() {
     
        this.$http({
          url: API.adddevice,
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
            this.$router.replace("/index/device");
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
        url: API.updatedevice,
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
          this.$router.replace("/index/device");
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
    } else {
      //修改
       this.$http({
        url: API.finddevice,
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
.createdevice{
     p {
    font-size: 30px;
    margin-top: 30px;
    margin-left: 30px;
    margin-bottom: 20px;
  }
    .t-btn{
     margin 0 auto 
     text-align center 
}
}
</style>

