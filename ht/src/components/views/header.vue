<template>
  <div class="header">
    <header>
      <div class="left">
        <p class="a">十步杀一人，千里不留行</p>
      </div>
      <div class="right clearfix">
        <div class="img">
          <img
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560224227553&di=0f563f5b52c90a621f62330712661fc5&imgtype=0&src=http%3A%2F%2Fpic8.nipic.com%2F20100713%2F1954049_091647155567_2.jpg"
            alt
          >
        </div>

        <el-button class="btn" type="text" @click="show()">{{name}}</el-button>
      </div>
    </header>
  </div>
</template>

<script type="text/ecmascript-6">
import API from "../../common/js/API";
export default {
  components: {},
  props: [],
  data() {
    return {
      name: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    show() {
      this.$confirm('"亲，你确定退出~"', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        confirmButtonClass: "el-button el-button--danger",
        type: "warning"
      })
        .then(() => {
          window.location.href = "login";
        })
        .catch(d => {
          this.$message({
            message: "取消删除成功",
            type: "info"
          });
        });
    }
  },
  mounted() {
    this.name = localStorage.getItem("username");

    var R = 100;
    var G = 200;
    var B = 50;

    this.timer = setInterval(auto, 140);
    var that = this;
    function auto() {
      if (G >= 0) {
        G += 10;
        if (G >= 250) {
          G = 0;
        }
      }
      if (R >= 0) {
        R += 25;
        if (R >= 250) {
          R = 0;
        }
      }
      if (B >= 0) {
        B += 50;
        if (B >= 250) {
          B = 0;
        }
      }

      that.$(".a").css("color", "rgb(" + R + "," + G + "," + B + ")");
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';

.header {
  position: relative;
  left: 0;
  top: 0;

  header {
    height: 60px;
    width: 100%;
    background-color: $blue;
    border-bottom: 1px solid $666;
    overflow: hidden;

    .right {
      float: right;

      .img {
        float: left;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-top: 10px;
        margin-left: 50px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .btn {
        float: right;
        font-size: 20px;
        margin-right: 30px;
        margin-left: 30px;
        padding-top: 20px;
      }
    }

    .left {
      float: left;

      p {
        margin-top: 15px;
        color: black;
        font-size: 30px;
        margin-left: 30px;
      }
    }
  }
}
</style>

