<template>
 <el-button round type='danger' @click="del()">删除</el-button>
</template>

<script type="text/ecmascript-6">
export default {
 components: {},
 props: ['idx'],
 data () {
 return {
 };
 },
 watch: {},
 computed: {},
 methods: {
       del(){
           this.$confirm('你确定要删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          confirmButtonClass:"el-button el-button--danger",
          type: 'warning'
        }).then(() => {
            this.$emit('del',this.idx)
        }).catch(d=>{
            this.$message({
                message:'取消删除成功',
                type:'info'
            })
        })
     }
 },
 mounted () {}
};
</script>
<style lang="stylus" scoped>

</style>

