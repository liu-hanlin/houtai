<template>
  <div class="user">
    <p>用户列表页</p>
    <el-button type="success" round class="create" @click="tocreateuser(0)">创建</el-button>
    <div class="left">  
    <el-table :data="tableData" border style="width:1100px">
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="name" label="账号" width="200"></el-table-column>
      <el-table-column prop="tel" label="电话" width="200"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="sex" label="性别" width="100"></el-table-column>
      <el-table-column prop="idx" label="身份证" width="200"></el-table-column>
      <el-table-column prop="des" label="备注" width="120"></el-table-column>
      <el-table-column label="生日" width="120">
         <template slot-scope='scope'>
           <span>{{scope.row.time|moment}}</span>
         </template>
      </el-table-column>
      <el-table-column label="操作" fixed='right' width="200">
        <template slot-scope="scope">
          <el-button round type="primary" @click="tocreateuser(scope.row.id)">查看</el-button>
          <v-del :idx="scope.row.id" @del="del($event)"></v-del>
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
      tableData: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    tocreateuser(n){  
      this.$router.push('/index/user/createuser/'+n)
    },
    del(id){
      this.$http({
        url:API.deluser,
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
    init(){
      this.$http({
        url:API.finduser
      }).then(d=>{
        // console.log(d)
        if(d.data.code==-1){
          fn.errCallback(this,d)
        }
        this.tableData=d.data.data
      })
    }
  },
  mounted() {
    this.init()
  }
};
</script>
<style lang="stylus" scoped>
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
.left{
    margin-left 30px
  }

</style>

