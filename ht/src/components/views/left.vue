<template>
  <div class="left">
    <router-link to='/index/manage' v-if="isAdmin=='0'"
    active-class="select">管理员管理</router-link>
    <router-link to='/index/user' active-class="select" v-if="isAdmin!='2'">用户管理</router-link>
    <router-link to='/index/notice' active-class="select">通知</router-link>
    <router-link to='/index/device' active-class="select">设备管理</router-link>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {},
  props: [],
  data() {
    return {
      isAdmin:''
    };
  },
  watch: {},
  computed: {},
  methods: {},
  mounted() {
    this.isAdmin=localStorage.getItem('isAdmin')
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';

.left {
  width: 200px;
  background-color: $left;

  a {
    display: block;
    background-color: red;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 20px;
    color #fff
    background-color: $left;

    &:hover {
      background-color: $fff;
    }
  }

  .select {
    background-color: $blue;
    color skyblue
  }
}
</style>

