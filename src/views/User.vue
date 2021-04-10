<template>
    <div>
        <van-row @click="openModal">
            <van-col span="6">
                <img :src="avatarSrc" alt />
            </van-col>
            <van-col span="12">{{userNickname}}</van-col>
            <van-col span="6">
                <van-icon name="arrow" />
            </van-col>
        </van-row>
        <van-grid :column-num="3" square>
            <van-grid-item icon="phone" text="文字" />
            <van-grid-item icon="photo-o" text="文字" />
            <van-grid-item icon="photo-o" text="文字" />
            <van-grid-item icon="photo-o" text="文字" />
        </van-grid>

        <!-- 弹出层 -->
        <van-popup v-model="isShowmodal">
            <van-form @submit="onSubmit">
                <van-field
                    v-model="username"
                    name="用户名"
                    label="用户名"
                    placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]"
                />
                <van-field
                    v-model="password"
                    type="password"
                    name="密码"
                    label="密码"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
                />
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">登录</van-button>
                </div>
            </van-form>
        </van-popup>
    </div>
</template>

<script>
import {GoLogin} from "@/request/api"
export default {
    data () {
        return {
            avatarSrc:require("../assets/avatar.png"),
            isShowmodal:false,
            username: '',
            password: '',
            userNickname:"用户登录"
        }
    },
    created(){

        // 获取存储中的userInfo，  如果获取得到，就应该改变avatarSrc和userNickname
        let userInfo = localStorage.getItem("userInfo");
        if(userInfo){
            userInfo = JSON.parse(userInfo);
            this.avatarSrc = userInfo.avatar
            this.userNickname = userInfo.nickname
        }
    },
     methods: {
        openModal(){
            // 判断用户是不是已经登录，尝试获取token， 如果获取到，就直接return
            // 获取不到token，就表示没有登录， 就应该执行this.isShowmodal=true

            let token = localStorage.getItem("token")
            if(token){
                return
            }
            
            this.isShowmodal=true
        },
        onSubmit(values) {
            // 点击提交按钮执行这里的代码
            console.log('submit', values);
            let username = values["用户名"]
            let pwd = values["密码"]
            // 发送登录请求
            GoLogin({
                username,
                pwd
            }).then(res=>{
                console.log(res);
                if(res.errno=="0"){
                    // 能够成功返回data数据
                    // 1、提示登录成功
                    this.$toast.success("登录成功！")
                    // 2、保存token值， 和userInfo用户信息到本地存储
                    localStorage.setItem("token", res.data.token)
                    localStorage.setItem("userInfo",JSON.stringify(res.data.userInfo))
                    
                    setTimeout(()=>{
                        // 3、关闭模态窗口
                        this.isShowmodal = false

                        // 4、修改用户头像和登录昵称
                        this.avatarSrc = res.data.userInfo.avatar
                        this.userNickname =  res.data.userInfo.nickname
                    }, 800)
                    

                }else{
                    // 后端无法成功返回数据
                    // 打印后端给我们的错误信息
                    console.log(res.errmsg);
                }

            })
// data:
// token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyOTE1LCJpYXQiOjE2MTE5ODg2NTd9.GdSngHdYmh_78kAvDvqLQvXWeLexzudOrriChHtIbuk"
// userInfo: {id: 2915, username: "123123222", nickname: "默认用户1611988657", gender: 1, avatar: "https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3256100974,305075936&fm=26&gp=0.jpg", …}
// __proto__: Object
// errmsg: ""
// errno: 0
        },
    },
}
</script>
 
<style lang = "less" scoped>
.van-row {
  padding: 0.2rem 4%;
  background: #333;
  color: #fff;
  .van-col {
    line-height: 0.7rem;
    font-size: 0.18rem;
    img {
      width: 0.7rem;
      border-radius: 50%;
      display: block;
    }
    &:last-child {
      text-align: right;
    }
  }
}

.van-popup{
    width: 85%;
}
</style>