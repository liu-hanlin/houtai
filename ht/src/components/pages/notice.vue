<template>
  <div class="notice">
    <p v-show="isAdmin!='2'">通知列表页</p>
    <el-button type="success" round class="create" @click="tocreate(0)" v-show="isAdmin!='2'">创建</el-button>
    <div class="box">
      <el-table class="bcreate" :data="tableData" style="width: 90%">
      <el-table-column type="index" label="序号" width="180"></el-table-column>
      <el-table-column prop="tit" label="题目" width="180"></el-table-column>
      <el-table-column label="时间">
         <template slot-scope="scope">
            <span>{{scope.row.time|moment}}</span>
          </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button round type="primary" @click="tocreate(scope.row.id)">查看</el-button>
          <v-del :idx="scope.row.id" @del="del($event)"  v-show="isAdmin!='2'"></v-del>
        </template>
      </el-table-column>
    </el-table>
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
      tableData: [],
      isAdmin:''
    };
  },
  watch: {},
  computed: {},
  methods: {
    tocreate(n) {
      this.$router.push("/index/notice/createnotice/" + n);
    },
    del(id) {
      this.$http({
        url: API.delnotice,
        params: {
          id: id
        }
      }).then(d => {
        if (d.data.code == -1) {
          fn.errCallback(this, d);
        }
        if (d.data.isok) {
          this.$message({
            message: d.data.info,
            type: "success"
          });
          this.init();
        } else {
          this.$message({
            message: d.data.info,
            type: "warning"
          });
        }
      });
    },
    init() {
      this.$http({
        url: API.findnotice
      }).then(d => {
        // console.log(d);
        if (d.data.code == -1) {
          fn.errCallback(this, d);
        }
        this.tableData = d.data.data;
      });
    }
  },
  mounted() {
    this.init();
    this.isAdmin=localStorage.getItem('isAdmin')
  }
};
</script>
<style lang="stylus" scoped>
.notice {
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

    padding-top 40px
  }
}
</style>

