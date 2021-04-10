<template>
<!-- 弹出框页面 -->
    <div class="search-popup">
        <!-- 搜索框 -->
        <van-search
            v-model="searchVal"
            show-action
            :placeholder="placeVal"
            @search="onSearch"
            @input="onInput"
            @cancel="onCancel"
        />
        <!-- 有3中可能的界面：历史热门，搜索列表， 产品列表， 3个组件选1个来展示  -->
        <!-- 父传子中的第2步， 给标签属性赋值 -->
        <HistoryHot 
            v-if="blockShow==1"
            :historyListData = "historyListData"
            :hotKeywordListData = "hotKeywordListData"
            @onSearch="onSearch"
         />
        <SearchTipsList 
            :searchTipsListData="searchTipsListData" 
            v-else-if="blockShow==2"
            @onSearch="onSearch"
        ></SearchTipsList>
        <SearchProducts  
            v-else-if="blockShow==3" 
            :goodsList="goodsList"
            :filterCategory="filterCategory"
            @changeCategory="changeCategory"
            @changePrice="changePrice"
        />
        <!-- <comp1 v-if="blockShow==1"></comp1>
        <comp2 v-else-if="blockShow==2"></comp2>
        <comp3 v-else-if="blockShow==3"></comp3> -->
    </div>
</template>

<script>
import HistoryHot from "@/components/HistoryHot"
import SearchTipsList from "@/components/SearchTipsList"
import SearchProducts from "@/components/SearchProducts"
import {GetSearchPopupData,GetSearchTipsListData,GetGoodsListData} from "@/request/api"
export default {
    data () {
        return {
            // 搜索框v-model的值
            searchVal:"",
            // 搜索框placeholder的值
            placeVal:"先写死",
            // blockShow变量用来决定最终展示3个组件中的哪一个组件
            // blockShow为1 表示 展示历史热门
            // blockShow为2 表示 搜索列表
            // blockShow为3 表示 产品列表
            blockShow:1,
            // 历史记录的数据列表
            historyListData:[],
            // 热门搜索的数据列表
            hotKeywordListData:[],
            // 搜索提示列表数组
            searchTipsListData:[],
            // 搜索出来的产品列表数组
            goodsList:[],
            // 搜索出来的产品的分类数组
            filterCategory:[],
            //order 排序   sort以什么排序    categoryId分类id
            order:"desc",
            sort:"id",
            categoryId:"0"
        }
    },
    created(){
        // 向后端服务器发起请求
        GetSearchPopupData().then(res=>{
            this.placeVal = res.data.defaultKeyword.keyword;
            this.historyListData = res.data.historyKeywordList
            this.hotKeywordListData = res.data.hotKeywordList
        })
    },
    components:{
        HistoryHot,SearchTipsList,SearchProducts
    },
    methods: {
        changePrice(val){
            this.order = val
            this.sort = "price"
            this.onSearch(this.searchVal)
        },
        changeCategory(val){
            this.categoryId=val
            // 发送请求，携带关键字参数
            this.onSearch(this.searchVal)
        },
        onInput(val){
            // 用户边输入的时候，就执行这里的代码
            // 用户边输入的时候，已经要展示列表界面，即第2个界面
            this.blockShow=2;
            // console.log(val);
            // 发送请求，获取搜索提示的列表数据
            GetSearchTipsListData({keyword:val}).then(res=>{
                console.log(res.data); //  ["日式"]
                this.searchTipsListData = res.data
            })
        },
        onSearch(val) {  // val 就是用户输入的信息
            this.blockShow=3;
            // onSearch 用户按回车进行搜索时候执行
            console.log("onSearch", val);

            // 根据用户输入的关键字，请求商品列表信息
            GetGoodsListData({
                // 用户搜索的关键字
                keyword:val,
                // 排序 desc 从高到低    asc从低到高
                order:this.order,
                // sort 以什么来排序   id  price
                sort:this.sort,
                // 分类id
                categoryId:this.categoryId
            }).then(res=>{
                console.log(res.data);
                this.goodsList = res.data.goodsList
                
//              请求过来的数组是：   [{id: 0, name: "全部", checked: true}, {id: 1005001, name: "餐厨", checked: false},…]
// 0: {id: 0, name: "全部", checked: true}
// 1: {id: 1005001, name: "餐厨", checked: false}
// 2: {id: 1005000, name: "居家", checked: false}]
// 需求： 要把它里面的 键名name改成text  ，再把键名id改成value
                let newArr = JSON.parse(JSON.stringify(res.data.filterCategory).replace(/name/g, 'text').replace(/id/g, 'value'));

                this.filterCategory = newArr
            })
        },
        onCancel() {
            // onCancel 用户点击取消按钮的时候执行
            // console.log("onCancel");
            // 跳转到/home路径下
            // this.$router.push("/home")
            this.$router.go(-1);  //  .go(-1) 从哪个路径进来，就返回到哪个路径下


            // 把是否展示阴影 的变量该成false。
            this.$store.commit("chanIsShowShadow", false);

        },
  },
}
</script>
 
<style lang = "less" scoped>
    .search-popup{
        width: 100%;
        min-height: 100%;
        position: absolute;
        background-color: #efefef;
        top: 0;
        z-index:999
    }
</style>