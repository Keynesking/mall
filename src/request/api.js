import request from "./request"

// 请求首页数据
export const GetHomeData = () => request.get("/index/index")

// 请求搜索页面的数据
export const GetSearchPopupData = () => request.get("/search/index")


// 请求搜索提示的列表数据
// 带参数的get请求的写法：
export const GetSearchTipsListData = (params) => request.get("/search/helper", {params})



// 请求搜索产品列表的数据
export const GetGoodsListData = (params) => request.get("/goods/list", {params})

// 清除历史记录请求
export const clearHistorySearch = () => request.post("/search/clearhistory")

// 发送登录请求
export const GoLogin = (params) => request.post("/auth/loginByWeb", params)


// 请求商品详情数据
export const GetProductDetailData = (params) => request.get("/goods/detail", {params})


// 相关产品
export const GetGoodsRelatedData = params => request.get("/goods/related",{params})

// 请求购物车数量
export const GetGoodsCountData = () => request.get("/cart/goodscount")


// 请求加入购物车
export const AddToCart = (params) => request.post("/cart/add", params)


// 获取购物车数据
export const GetCartData = () => request.get("/cart/index")



// 购物车单项商品的点击的请求 
export const changeGoodsChecked = (params) => request.post("/cart/checked", params)


// 步进器事件的请求
export const changeStepper = (params) => request.post("/cart/update", params)


// 删除商品请求
export const DelGoods = (params) => request.post("/cart/delete", params)

// 带参数的post请求的写法：
// export const GetSearchTipsListData = (params) => request.post("/search/helper", params)
// export const GetSearchTipsListData = (params) => request.get("/search/helper", {params})