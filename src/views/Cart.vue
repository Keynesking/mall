<template>
  <div>
    <!-- Tips组件 -->
    <Tips />

    <!-- 每一项商品 -->
    <van-checkbox-group v-model="result">
        <van-checkbox
            :name="item.id"
            v-for="item in cartList"
            :key="item.id"
            @click="goodsItemClick(item)"
            :disabled="isEditing"
        >
        <van-swipe-cell>
            <van-card
            :num="item.number"
            :price="item.retail_price"
            :title="item.goods_name"
            :thumb="item.list_pic_url"
            />
            <van-stepper @change="changeStepperVal(item)" v-model="item.number" v-show="isEditing" />
            <template #right>
            <van-button @click="delClick(item)" square text="删除" type="danger" class="delete-button" />
          </template>
          </van-swipe-cell>
        </van-checkbox>
    </van-checkbox-group>

    <!-- 编辑栏和提交栏 -->
    <van-submit-bar
      :price="checkedGoodsAmount * 100"
      button-text="提交订单"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checkedAll" :disabled="isEditing">全选</van-checkbox>
      <template #tip>
        累计共<span>{{ goodsCount }}</span
        >件商品，可点击
        <van-button :type="isEditing?'danger':'primary'" size="small" @click="isEditing=!isEditing">{{isEditing?'完成编辑':'编辑'}}</van-button>
        按钮进行商品数量修改
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
import { GetCartData, changeGoodsChecked,changeStepper, DelGoods} from "@/request/api";
import Tips from "@/components/Tips";
export default {
  data() {
    return {
      /* 全选的value值 */
      checked: true,
      /* 每个元素是checkbox-group的每一个checkbox的name属性 */
      result: [],
      // 购物车列表数据
      cartList: [],
      // 商品总数
      goodsCount: 0,
      // 选中的总价
      checkedGoodsAmount: 0,
      // 是否为编辑状态
      isEditing: false
    };
  },
  components: {
    Tips,
  },
  created() {
    // 发起请求获取购物车列表数据
    GetCartData().then((res) => {
        // console.log(res.data);
        this.renderData(res.data);
    });
  },
  computed: {
    checkedAll:{
        get(){
            return this.cartList.length == this.result.length;
        },
        set(val){
          if(this.isEditing){
            return
          };
            let ids = this.cartList.map(item=>{
                return item.product_id
            })
            console.log(ids.join());

            // checkedAll的值变化了时候会执行这里的代码，val就是新的值
            console.log(val);
            changeGoodsChecked({
                isChecked: val == false ? 0 : 1,
                productIds: ids.join(),
            }).then((res) => {
                console.log(res.data);
                this.renderData(res.data);
            });
        }
    },
  },
  methods: {
    delClick(item){
        /* console.log(item); */
      DelGoods({
        productIds:item.product_id.toString()
      }).then((res) => {
          console.log(res.data);
          this.renderData(res.data);
      });
    },
    changeStepperVal(item){
      /* console.log(item); */
        
        changeStepper({
          goodsId:item.goods_id,
          id:item.id,
          number:item.number,
          productId:item.product_id
        }).then((res) => {
            console.log(res.data);
            this.renderData(res.data);
        });
    },
    renderData(data) {
      // 清空 this.result (否则每次点击商品项，都push，this.result就会越来越长)
      this.result = [];
      // 数据渲染
      this.cartList = data.cartList;
      this.goodsCount = data.cartTotal.goodsCount;
      this.checkedGoodsAmount = data.cartTotal.checkedGoodsAmount;

      // 拿到数据之后，把checked为1的这一项的id， push 到result这个数组里面去
      // 遍历
      this.cartList.map((item) => {
        // 为1就勾上， 不为1，就不勾上
        // id在this.result里面就表示勾上
        item.checked ? this.result.push(item.id) : "";
      });
    },
    onSubmit() {},
    goodsItemClick(item) {
      /* 如果isEditing为true，就return */
      if(this.isEditing){
        return
      };
        // 发起请求
        changeGoodsChecked({
            isChecked: item.checked == 1 ? 0 : 1,
            productIds: item.product_id.toString(),
        }).then((res) => {
            console.log(res.data);
            this.renderData(res.data);
        });
    },
  },
};
</script>
 
<style lang="less" scoped>
.delete-button{
  height: 100%;
}
.van-submit-bar {
  bottom: 0.5rem;
}
/deep/.van-checkbox__label {
  flex: 1;
}
.van-submit-bar__tip {
  display: flex;
  align-items: center;
  .van-button {
    margin: 0 0.06rem;
  }
}
.van-checkbox-group {
  background-color: #fff;
  padding: 0.1rem;
  border-bottom: 1px solid #ccc;
}
.van-checkbox {
    padding-bottom: .08rem;
    padding-top: .08rem;
  border-bottom: 1px solid #ccc;
}
.van-checkbox:last-of-type {
  border: 0;
}
.van-stepper{
    text-align: right;
}
</style>