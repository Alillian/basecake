<template>
  <div id="user">
    <div v-show="bool" class="mylogin">
        <div v-if="loginNum==0">
          <div class="title">
            <div class="btn" @click="back"><p></p></div>
            <span>用户登录</span>
          </div>
          <label for="" >
              <p>用户名:</p>
              <input type="text" v-model="uname">
          </label>
          <label for="">
              <p>密码:</p> 
              <input type="password" v-model="upwd">
          </label> 
          <div class="resgit">没有账号?<i @click="res">立即注册</i></div>        
          <div @click="login" class="login">登录</div>
        </div>   
    </div>


    
    <div v-show="!bool" class="myinfo">
        <div class="top_box">
            <div>
              <img :src="userInfo.avatar" alt="">
            </div>
        </div>
        <div class="name">
            <span>{{userInfo.name}}</span>
        </div>

        <div class="center_box">
            <div class="font">
                <div class="">会员等级</div>
                <div class="">V0</div>                
            </div>
            <div class="font">
                <div class="">吉致币</div>
                <div class="">0</div>
            </div>
            <div class="font">
                <div class="">优惠券</div>
                <div class="">0</div>
            </div>
            <div class="font">
                <div class="">兑换券</div>
                <div class="">0</div>
            </div>
        </div>
        

        <div class="bot_box">
            <div class="b_box b_box1">
                <div class="">
                  <img src="https://res.bestcake.com\m-images\order\mw-person-dd.png">
                </div>
                <div class="">我的订单</div>
                <div class="" style="">
                  <img src="https://res.bestcake.com\m-images\order\mw_firm_right.jpg">
                </div>
            </div>
            <div class="b_box">
                <div class="">
                  <img src="https://res.bestcake.com\m-images\order\mw_firm_ad.jpg">
                </div>
                <div class="">收货地址</div>
                <div class="" style="">
                  <img src="https://res.bestcake.com\m-images\order\mw_firm_right.jpg">
                </div>
            </div>
        </div>

        <div class="kf">
            <span>客服热线：400-627-5757</span>
        </div>

    </div>
    
  </div>

  
</template>

<script>
import Store from "storejs";
import { Toast } from 'mint-ui';
export default {
  name: 'HelloWorld',
  data () {
    return {
       uname:"",
       upwd:"",
       userInfo:{},
       loginNum:0,
       bool:true

       
    }
  },
  mounted(){
    // console.log(this.$route)
    this.pageInit();
  },
  methods: {
    pageInit(){
      //  console.log(this.$store.state.userInfo);
      //  this.userInfo=this.$store.state.userInfo;
       
      if (!Store.get("userInfo")) {
        this.loginNum=0;
      }else{
        this.loginNum=1;
        this.userInfo=Store.get("userInfo");
      }

      this.userInfo=this.$store.state.userInfo;
    },

    login(){
      var data={
        uname:this.uname,
        upwd:this.upwd
      }
      // console.log(data);

      this.$apis.login(data).then(res=>{

        if(res.data.code==0){
          Toast({
              message: '账号不存在',
              duration: 1000
          });
      
        }else if(res.data.code==1){
          // console.log(res.data.data);
           this.userInfo=res.data.data;
          this.$store.commit("saveInfo",res.data.data)
          Toast({
              message: '登录成功',
              duration: 1000
          });
          this.bool=false;
        }else{
          Toast({
              message: '密码错误',
              duration: 1000
          });
         
          // console.log(res.data.msg);
        }
      })
    },

    back(){
      this.$router.push({
          path:"/index"
      });
    },
    res(){
      this.$router.push({
            path:"/edit"
          });
    }
    

    

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#user{
  .mylogin{
    background: -webkit-linear-gradient(-90deg,rgba(54,209,220,1),rgba(9,152,154,1));
    color:#fff;
    padding-left:4%;
    overflow: hidden;
    p{
      margin: 0;
    }
    .title{
      
      .btn{
        width: 100%;
        height:  r(42*2);
        line-height: r(42*2);  

        p{
          display: inline-block;
          width: r(10*2);
          height: r(10*2);
          border-left: r(2*2) solid;
          border-bottom: r(2*2) solid;
          transform: rotate(45deg);
          
        }    
      }
      span{
          font-size: r(32*2);
          display: inline-block;
          height:r(45*2);
      }

    }
    label{

      p{
        height: 5%;
        font-size: r(14*2);
        padding-top:2%;
      }
      input{
          background: none;
          color: #fff;
          border-bottom-color: #fff;
          height: r(42*2);
          width: 92%;
          border: none;
          border-bottom: 1px solid #ddd;
          outline:none;
          font-size:r(20*2);
      }
    }
    .resgit{
       font-size:r(16*2);
       margin:3% 0 0 0;
       float: right;
       width: 50%;
       i{
         color: blueviolet;
         padding-left:3%;
         font-style: normal;
       }
    }
    .login{
      text-align: center;
      font-size:r(18*2);
      width:r(124*2);
      height: r(32*2);
      line-height: r(32*2);
      margin:15% 0 96% 30%;
      border:1px solid #fff;
      outline:none;
      border-radius: 20px;
      color: #fff;
    }
  }
  
  

  .myinfo{
    background: #fff;
    color:#fff;
    .top_box{
      width: 100%;
      padding-top: 6.66vw;
      text-align: center;
      img{
         width: 30%;
        height:r(110*2);
        border-radius: 100%;
      }
    }
    .name{
        width: 100%;
        text-align: center;
        padding-top: 1.33vw;
        line-height: 5.33vw;
        font-size: 3.73vw;
        color: #333;
    }
    .center_box{
        overflow: hidden;
        padding-top: 8.66vw;
        background: #fff;
        padding-bottom: 4vw;
        text-align: center;
        border-bottom: 4vh solid #f4f4f4;
        .font{
          float: left;
          width: 25%;
          line-height: 6vh;
          color: #333;
          font-size: r(32);
        }
    }
    .bot_box{
        padding-left: 5vw;
        color:#333;
        .b_box1{
          border-bottom: 1px solid #ccc;
        }
        .b_box{
          margin-top: 4vw;
          padding-bottom: 2vh;
          float: left;
          width: 100%;
          height: 8vh;
          div:nth-child(1){
            padding-top: 3vw;
            float: left;
            img{
              width : 4vw;
            }

          }
          div:nth-child(2){
            float: left;
            padding-left: 2.66vw;
            padding-top: 3.86vw;
            padding-bottom: 3.86vw;
            font-size: r(24);
          }
          div:nth-child(3){
            padding-top: 2.8vw;
            float: right;
            width: 2.4vw;
            margin-right: 6vw ;
          }
        }
      }
      .kf{
        position: absolute;
        bottom: 11vh;
        left: 30%;
        color: #999;
        font-size: 3vw;
      }
  }


}

//     @keyframes ident {
//         0% {
//             left: 100vw;
       
//         }
//         100% {
//             left: 0;
         
//         }
//     }
//        @keyframes identx {
//         0% {
//             left: 0vw;
            
//         }
//         100% {
//             left: 100;
     
//         }
//     }
// #lr{height:100vh;
// animation: ident 1s;
// // animation: identx 1s;
// background:linear-gradient(rgba(54,209,220,1),rgba(9,152,154,1));
// position: relative;
//     .table{
//             height:r(100);
//             display: flex;
//             .tables_l{
//                 flex: 1;
//                 font-size:r(40);
//                 line-height:r(100); 
//                 color: #fff
//             }
//             .tables_r{
//                 flex: 1;
//                 font-size:r(40);
//                 line-height:r(100); 
//                 color: #fff
//             }
//     }
//     .actived{
//          border-bottom:2px solid   #fff;
//     }
//      .login{
//         overflow: hidden;
//         color:#fff;
//         form{
//             margin-top:r(52);
//             overflow: hidden;
//             p{
//             overflow: hidden;
//             margin-top:r(50);
//             font-size:r(32);
//             float: left;
//             width: 100%;
//             input{
//                 height:r(40);   
//                 border-bottom-color: #fff;  
//                 border-style:none none solid none; 
//                 outline: none;
//                  width: 80%;
//                  background-color:transparent;
//             }
//               button{
//                  font-size:r(40);
//              width:r(600);
//              height:r(80);
//              float:left;
//              margin-left:r(100);
//              outline:none;
//               border:1px solid #fff;
//               border-radius: 20px;
//              color: #fff;
//             background-color:transparent;
//          }
//          }
        

//         }
//     }
//     .register{
//         color:#fff;
//         overflow: hidden;
//         form{
//             overflow: hidden;
//             margin-top:r(52);
//             p{
//             overflow: hidden;
//             margin-top:r(50);
//             font-size:r(32);
//             float: left;
//             width: 100%;
//             input{
//                     height:r(40);   
//                 border-bottom-color: #fff;  
//                 border-style:none none solid none; 
//                 outline: none;
//                  width: 80%;
//                  background-color:transparent;
//             }
//              button{
//             font-size:r(40);
//              width:r(600);
//              height:r(80);
//              float:left;
//              margin-left:r(100);
//             background-color:transparent;
//             border:1px solid #fff;
//              outline:none;
//              border-radius: 20px;
//              color: #fff;
//          }
//             }
//         }
//     }
// }
</style>


