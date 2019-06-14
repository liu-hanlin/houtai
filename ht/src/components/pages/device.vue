<template>
  <div class="device">
    <p>设备列表页</p>
    <el-button type="success" round class="create" @click="tocreatedevice(0)" v-show="isAdmin!='2'">创建</el-button>
    <div class="box">
      <el-table class="bcreate" :data="tableData" style="width: 96%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="ip" label="ip" width="100"></el-table-column>
      <el-table-column prop="door" label="机房"></el-table-column>
      <el-table-column prop="num" label="编号"></el-table-column>
      <el-table-column prop="width" label="宽带"></el-table-column>
      <el-table-column label="使用">
        <template slot-scope="scope">
          <span>{{scope.row.status=="1"?"空闲":"已出售"}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button round type="primary"  @click="tocreatedevice(scope.row.id)" v-show="isAdmin!='2'">修改</el-button>
            <el-button round type="primary"
             
              :disabled="scope.row.status=='0'"
             @click="shop(scope.row.id)" v-show="isAdmin=='2'">购买</el-button>
             <v-del :idx='scope.row.id' @del='del($event)'
              v-show="isAdmin!='2'"
             ></v-del>
          </template>
        </el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import API from '../../common/js/API'
import fn from '../../common/js/fn'
export default {
  components: {},
  props: [],
  data() {
    return {
      tableData: [],
      isAdmin:''
    };
  },
  watch: {},
  computed: {},
  methods: {
    tocreatedevice(id) {
      this.$router.push("/index/device/createdevice/"+id);
    },
     shop(id){
      this.$http({
        url:API.updatedevice,
        params:{
          id:id,
          status:'0'
        }
      }).then(d=>{
        if(d.data.code==-1){
          fn.errCallback(this,d)
        }
        if(d.data.isok){
          this.$message({
              message:"购买成功",
              type: 'success'
            });
            this.init()
        }else{
          this.$message({
              message:"购买失败，请重试",
              type: 'warning'
            });
        }
      })
    },
    del(id){
      this.$http({
        url:API.deldevice,
        params:{
          id:id
        }
      }).then(d=>{
        if(d.data.code==-1){
          fn.errCallback(this,d)
        }
          if(d.data.isok){
            this.$message({
              message:d.data.info,
              type: 'success'
            });
            this.init()
          }else{
             this.$message({
              message:d.data.info,
              type: 'warning'
            });
          }
      })
    },
    init() {
      this.$http({
        url: API.finddevice
      }).then(d => {
        // console.log(d)
        if (d.data.code == -1) {
          fn.errCallback(this, d);
        }
        this.tableData = d.data.data;
      });
    }
  },
  mounted() {
     this.isAdmin=localStorage.getItem('isAdmin')
    this.init();
  }
};
</script>
<style lang="stylus" scoped>
.device {
  p {
    font-size: 30px;
    margin-top: 30px;
    margin-left: 30px;
  }

  .create {
    margin-top: 30px;
    margin-left: 30px;
    margin-bottom: 50px;
  }

  .bcreate {
    margin-left: 30px;
  }
  .box{
    margin-top 30px
  }
}
</style>

