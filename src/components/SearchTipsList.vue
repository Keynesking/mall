<template>
<!-- 弹出框中的：搜索提示列表展示 -->
    <div>
        <van-list
            :finished="finished"
            finished-text="没有更多了"
        >
            <van-cell @click="cellClick(item)" v-for="item in searchTipsListData" :key="item" :title="item" />
        </van-list>
    </div>
</template>

<script>
export default {
    data () {
        return {
            finished:true,
            
        }
    },
    props:["searchTipsListData"],
    methods:{
        cellClick(val){
            // console.log("cellClick", val);
            this.$emit("onSearch",val)
        }
    }
}
</script>
 
<style lang = "less" scoped>
    
</style>