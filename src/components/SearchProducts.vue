<template>
<!-- 弹出框中的：搜索出来的产品列表展示 -->
    <div>
        <van-dropdown-menu>
            <van-dropdown-item disabled v-model="value1" :options="option1" title="综合"/>
            <van-dropdown-item @change="changePrice" v-model="value1" :options="option1" title="价格"/>
            <van-dropdown-item @change="changeCategory" v-model="categoryVal" :options="filterCategory" title="分类"/>
        </van-dropdown-menu>

        <van-empty v-if="goodsList.length==0" image="search" description="没有您搜索的产品" />
        <Products v-else :goodsList="goodsList"/>
    </div>
</template>

<script>
/* category 分类
需求： 修改 categoryVal  的值为   checked这一项为true 的id值
0: {id: 0, name: "全部", checked: false}
1: {id: 1005001, name: "餐厨", checked: false}
2: {id: 1005000, name: "居家", checked: false}
3: {id: 1008000, name: "配件", checked: false}
4: {id: 1010000, name: "服装", checked: false}
5: {id: 1013001, name: "洗护", checked: true}
6: {id: 1011000, name: "婴童", checked: false}
7: {id: 1012000, name: "杂货", checked: false}
8: {id: 1005002, name: "饮食", checked: false}
9: {id: 1019000, name: "志趣", checked: false}

*/
import Products from "./Products"
export default {
    props:['goodsList', 'filterCategory'],
    components:{
        Products
    },
    data () {
        return {
            value1: "desc",
            categoryVal:"",
            option1: [
                { text: '价格由高到低', value: "desc" },
                { text: '价格由低到高', value: "asc" },
            ],
            // option2: [
            //     { text: '全部', value: 'a' },
            //     { text: '居家', value: 'b' },
            // ],
        }
    },
    beforeUpdate(){
        // 修改 categoryVal  的值为   checked这一项为true 的id(id已经被改成value)值
        // setTimeout(()=>{
            // 渲染分类的项的勾选
            this.filterCategory.map(item=>{

                if(item.checked){
                    this.categoryVal = item.value
                }
            })   
        // },10)
    },
    methods:{
        changeCategory(val){
            // val就是这个id值
            // 当点击分类中的选项导致这个值发生变化的时候执行这里的代码
            // console.log("changeCategory----------",val);
            // 发送请求
            this.$emit("changeCategory", val)
        },
        changePrice(val){
            // val 就是desc 或者asc
             this.$emit("changePrice", val)
        }
    }
}
</script>
 
<style lang = "less" scoped>
    
</style>