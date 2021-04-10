<template>
<!-- 详情页中的商品导航 -->
    <div>
        <van-goods-action>
            <van-goods-action-icon 
                :icon='isCollected?"star":"star-o"' 
                :text='isCollected?"已收藏":"未收藏"'
                color="darkred"
                @click="isCollected=!isCollected"
             />
            <van-goods-action-icon icon="cart-o" text="购物车"  :badge="goodscount"/>
            <van-goods-action-button type="danger" text="立即购买" />
            <van-goods-action-button type="warning" text="加入购物车" @click="showOrHideSku" />
            
        </van-goods-action>
    </div>
</template>

<script>
export default {
    props:["goodscount"],
    data () {
        return {
            isCollected:false
        }
    },
    methods:{
        showOrHideSku(){
            this.$emit("changeIsShowSku")
        }
    }
}
</script>
 
<style lang = "less" scoped>
   .van-goods-action{
       z-index: 99999;
   }
</style>