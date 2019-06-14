<template>
 <div class="right">
     
 <router-view></router-view>
 </div>
</template>

<script type="text/ecmascript-6">
export default {
 components: {},
 props: [],
 data () {
 return {
 };
 },
 watch: {},
 computed: {},
 methods: {},
 mounted () {}
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl'

.right 
    flex 1
    background-color $right;
    
    background url(../../../static/img/pic1.jpg) no-repeat
    background-size 100% 100%
    
</style>

