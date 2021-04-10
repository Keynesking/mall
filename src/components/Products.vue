<template>
    <ul>
        <li v-for="item in goodsList" :key="item.id" @click="toProductDetail(item.id)">
            <img :src="item.list_pic_url" style="display:block;" width="100%" alt="" />
            <div class="van-ellipsis">{{item.name}}</div>
            <div class="price">{{item.retail_price | RMBformat}}</div>
        </li>
    </ul>
</template>

<script>
export default {
    props:["goodsList"],
    data () {
        return {
            imgSrc:require("@/assets/logo.png")
 
        }
    },
    methods:{
        toProductDetail(val){
            // 跳转到商品详情页
            this.$router.push("/productDetail?id="+val)

            /* ！！！针对详情页的“大家都在看模块”，点击跳转的是自己的路由，就需要加一个go(0)操作 */
            setTimeout(()=>{
                this.$router.go(0)
            },10)

        }
    }
}
</script>
 
<style lang = "less" scoped>
ul{
    padding: .1rem 2%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    li{
        width: 49%;
        margin-bottom: .1rem;
        background: #fff;
        text-align: center;
        line-height: .3rem;
        .price{
            color: darkred;
        }
    }
}
</style>