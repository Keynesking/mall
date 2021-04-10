<template>
<!-- 商品详情页面 -->
    <div class="detailPage">
        <!-- 轮播图 -->
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="blue">
            <van-swipe-item v-for="item in detailBanner" :key="item.id">
                <img
                :src="item.img_url"
                width="100%"
                :style="{ display: 'block' }"
                alt=""
                />
            </van-swipe-item>
        </van-swipe>
        <!-- Tips组件 -->
        <Tips />
        <!-- 产品信息渲染和展示弹出层 -->
        <div class="info">
            <h3>{{info.name}}</h3>
            <p>{{info.goods_brief}}</p>
            <div>{{info.retail_price | RMBformat}}</div>
        </div>
        <van-cell title="展示弹出层" is-link @click="isShowSku=true"/>
        <!-- 商品参数 -->
        <div class="attribute">
            <h4>商品参数</h4>
            <ul>
                <li v-for="(item, index) in attribute" :key="index">
                    <span>{{item.name}}</span>
                    <section class="van-ellipsis">{{item.value}}</section>
                </li>
            </ul>
        </div>
        <!-- 产品详情图片 -->
        <div class="goods_desc" v-html="info.goods_desc"></div>
        <!-- 常见问题 -->
        <div class="title">
            <span>常见问题</span>
        </div>
        <ul class="issue">
            <li v-for="item in issue" :key="item.id">
                <h3>{{item.question}}</h3>
                <p>{{item.answer}}</p>
            </li>
        </ul>
        <!-- 大家都在看 -->
        <div class="title">
            <span>大家都在看</span>
        </div>
        <Products :goodsList="goodsList"/>
        

        <!-- sku组件 -->
        <van-sku
            ref="sku"
            v-model="isShowSku"
            :sku="sku"
            :goods="goods"
            :hide-stock="sku.hide_stock"
        />
        <!-- 商品导航 -->
        <AppGoodAction @changeIsShowSku="addToCart" :goodscount="goodscount"/>
    </div>
</template>

<script>
import {GetProductDetailData,GetGoodsRelatedData,GetGoodsCountData,AddToCart} from "@/request/api"
import Tips from "@/components/Tips"
import AppGoodAction from "@/components/AppGoodAction"
import Products from "@/components/Products"
export default {
    components:{
        AppGoodAction,Tips,Products
    },
    data () {
        return {
            // sku组件的数据
            isShowSku:false,
            sku:{
                tree:[],
                hide_stock: false,   // 设置库存不隐藏
                price: '1.00', // 默认价格（单位元）
                stock_num: 227, // 商品总库存
            },
            goods:{
                picture:""
            },
            
            //------------------------------
            // 渲染详情页时候的数据
            detailBanner:[],
            info:{},
            attribute:[],
            issue:[],
            goodsList:[],
            // 购物车数量
            goodscount:0,
            // productList保存
            productList:[]
        }
    },
    methods:{
        addToCart(){
            // 点击的时候，如果sku是显示着的，那么直接把商品加入购物车
            if(this.isShowSku){
                // 执行加入购物车的操作

                // 1、获取sku中的步进器中的数字
                console.log(this.$refs.sku.getSkuData().selectedNum);
                let selectedNum = this.$refs.sku.getSkuData().selectedNum
                // 2、发送加入购物车的请求
                AddToCart({
                    goodsId:this.$route.query.id,
                    productId:this.productList[0].id,
                    number:selectedNum
                    
                }).then(res=>{
                    // console.log(res.data.cartTotal.cartTotal);
                    // 购物车的图标上的数字有变化
                    this.goodscount = res.data.cartTotal.cartTotal
                    // 跳转到购物车页面
                    this.$toast.success("添加成功！")
                    setTimeout(()=>{
                        this.$router.push("/cart")
                    },1000)
                    

                })


            }
            this.isShowSku = !this.isShowSku
        },
    },
    created(){
        
        // 发送请求，请求这个商品的详情数据
        GetProductDetailData({
            id:this.$route.query.id
        }).then(res=>{
            console.log(res);
            if(res.errno=="0"){
                console.log(res.data);

                this.detailBanner = res.data.gallery
                this.info = res.data.info;
                this.attribute = res.data.attribute;
                this.issue=res.data.issue

                // 接收Sku数据，渲染到页面上
                this.sku.price = res.data.info.retail_price
                this.sku.stock_num = res.data.info.goods_number
                this.goods.picture = res.data.info.list_pic_url

                // 保存productList
                this.productList = res.data.productList
            }
        })

        // 发送请求，获取相关产品数据(大家都在看模块)
        GetGoodsRelatedData({
            id:this.$route.query.id
        }).then(res=>{
            console.log(res.data);
            this.goodsList = res.data.goodsList
        })

        // 发送购物车数量的请求
        GetGoodsCountData().then(res=>{
            // console.log("res 购物车数量数据：", res.data.cartTotal.goodsCount);
            this.goodscount = res.data.cartTotal.goodsCount
        })
    }
}
</script>
 
<style lang = "less" scoped>
.detailPage{
    padding-bottom: .5rem;
}
.info{
    background: #fff;
    text-align: center;
    padding: .2rem 0;
    h3{
        font-weight: normal;
        font-size: .2rem;
        line-height: .5rem;
    }
    p{
        color: #999;
        font-size: .14rem;
        line-height: .3rem;
    }
    div{
        color: darkred;
        font-size: .14rem;
        line-height: .3rem;
    }
}
.attribute{
    margin-top: .2rem;
    background: #fff;
    padding: .2rem 4%;
    h4{
        font-weight: normal;
        font-size: .16rem;
        margin-bottom: 0.2rem;
    }
    ul{
        li{
            background: #efefef;
            line-height: .4rem;
            height: .4rem;
            margin-bottom: .1rem;
            border-radius: 4px;
            display: flex;
            justify-content: space-between;
            span{
                width: 30%;
                text-align: right;
            }
            section{
                flex: 1;
                padding-left: .2rem;
            }
        }
    }
}
/* 如果样式无法替换，可以试试/deep/ 深度样式写法 */
/deep/.goods_desc{
    img{max-width:100%; display: block;}
}
.title {
  width: 100%;
  background: #fff;
  height: 0.5rem;
  position: relative;
  &::before {
    content: "";
    width: 50%;
    height: 2px;
    background: #ccc;
    position: absolute;
    top: 50%;
    margin-top: -1px;
    left: 50%;
    margin-left: -25%;
  }
  span {
    width: 30%;
    position: relative;
    background: #fff;
    display: block;
    text-align: center;
    margin: 0 auto;
    height: 0.5rem;
    line-height: 0.5rem;
  }
}
.issue {
  padding: 0 4%;
  background: #fff;
  li {
    h3 {
      height: 0.3rem;
      line-height: 0.3rem;
      padding-left: 0.2rem;
      position: relative;
      font-weight: normal;
      &::before {
        content: "";
        width: 4px;
        height: 4px;
        background: darkred;
        display: inline-block;
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -2px;
      }
    }
    p {
      font-size: 0.12rem;
      line-height: 0.2rem;
      padding-left: 0.2rem;
    }
  }
}
</style>