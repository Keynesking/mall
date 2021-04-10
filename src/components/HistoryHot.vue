<template>
<!-- 弹出框中的：历史搜索和热门搜索 -->
    <div>
        <div class="his-hot" v-show="isShowHistory">
            <div class="hd">
                <h4>历史记录</h4>
                <van-icon name="delete-o" @click="clear"/>
            </div>
            <div class="bd">
                <van-tag @click="tagClick(item)" plain type="default" v-for="(item,index) in historyListData" :key="index">{{item}}</van-tag>
            </div>
        </div>
        <div class="his-hot">
            <div class="hd">
                <h4>热门搜索</h4>
            </div>
            <div class="bd">
                <van-tag  @click="tagClick(item.keyword)" :type=" item.is_hot==1?'danger':'default' " plain v-for="(item,index) in hotKeywordListData" :key="index">{{item.keyword}}</van-tag>
            </div>
        </div>
    </div>
</template>

<script>
import {clearHistorySearch} from "@/request/api"
export default {
    data () {
        return {
            isShowHistory:true
 
        }
    },
    // 声明标签属性
    props:["historyListData", "hotKeywordListData"],
    methods:{
        tagClick(val){
            console.log("hisTagClick---");
            this.$emit("onSearch",val)
        },
        clear(){
            clearHistorySearch().then(res=>{
                console.log(res);
                this.$toast.success('成功删除');
                setTimeout(()=>{
                    this.isShowHistory = false
                },1000)
                
               
            })
        }
    }
}
</script>
 
<style lang = "less" scoped>
    .his-hot{
        background-color: #fff;
        padding: .1rem  .1rem 0;
        margin-bottom: .2rem;

        .hd{
            display: flex;
            justify-content: space-between;
            font-size: .20rem;
            margin-bottom: 0.1rem;
            
        }

        .van-tag{
            margin-right: .1rem;
            padding:0.01rem  0.03rem;
            margin-bottom: 0.1rem;
        }

        .red{
            color:darkred;
        }
    }
</style>