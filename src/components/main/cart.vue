<template>
  <div id="cart">
    <div class="kong" v-if="$store.state.cartList.length==0">购物车是空的哦~</div>
    <div class="list" v-if="$store.state.cartList.length>0">
      <ul>
        <li v-for="(item,index) in $store.state.cartList" :key="index">
          <div class="dui">
            <img @click="quanx($event,item)"  src="https://res.bestcake.com/m-images/order/mw_firm_duihao_2.jpg" >
            <!-- <img @click="quanx"  src="https://res.bestcake.com/m-images/order/mw_firm_duihao_2.jpg" > -->
          </div>
          <div class="info">
            <div class="imgs">
              <img :src="item.url" alt>
            </div>

            <div class="right">
              <p>{{item.Name}}</p>
              <div class="jisuan">
                <span>{{item.Size}}</span>
                <div class="nright">
                  <span>
                    <img
                      @click="del(item,item.num)"
                      src="https://res.bestcake.com\m-images\order\reduce-1.png"
                      alt
                    >
                  </span>
                  <i>{{item.num}}</i>
                  <span>
                    <img
                      @click="add(item,item.num)"
                      src="https://res.bestcake.com/m-images/ww/detail/add.png"
                      alt
                    >
                  </span>
                </div>
              </div>

              <p class="price">{{item.CurrentPrice*item.num|setPrice}}</p>
            </div>
          </div>
          <div class="huod">
            <span>优惠方式</span>不参与活动
          </div>
        </li>
      </ul>
    </div>
    <section>
      <div class="other">
        <div class="title">
          <span>Hot Recommend</span>
          <div>
            <p></p>
          </div>
          <p>热销新品推荐</p>
        </div>
        <div class="othinfo">
          <ul>
            <li>
              <img src="https://res.bestcake.com\m-images\cart\mw_firm_sq.jpg" alt>
              <p>伴手礼系列-吉致生巧</p>
              <div>
                <span>168.00/1盒</span>
                <img src="https://res.bestcake.com\m-images\order\mw_firm_gwc.jpg" alt>
              </div>
            </li>
            <li>
              <img src="https://res.bestcake.com\m-images\cart\mw_firm_nzt_v1.jpg" alt>
              <p>伴手礼系列-吉致牛轧糖</p>
              <div>
                <span>68.00/16粒装</span>
                <img src="https://res.bestcake.com\m-images\order\mw_firm_gwc.jpg" alt>
              </div>
            </li>
            <li>
              <img src="https://res.bestcake.com\m-images\cart\mw_firm_pf_v1.jpg" alt>
              <p>伴手礼系列-吉致泡芙</p>
              <div>
                <span>88.00/0.8磅</span>
                <img src="https://res.bestcake.com\m-images\order\mw_firm_gwc.jpg" alt>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <footer>
      <div class="xuanz" @click="xuanz">
        <img v-if="allSel" src="https://res.bestcake.com/m-images/order/mw_firm_duihao_1.jpg">
        <img v-else src="https://res.bestcake.com/m-images/order/mw_firm_duihao_2.jpg">
      </div>
      <span class="sele">全选</span>

      <p @click="qingk">清空</p>
      <div class="price">
        <div class="hej">
          合计：
          <p>{{allPrice|setPrice}}</p>
        </div>
        <div class="yh">已优惠：0.00</div>
      </div>
      <div class="js" @click="jies">结算</div>
    </footer>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import Store from "storejs";
import { setTimeout } from "timers";
var vm = "";
export default {
  name: "HelloWorld",
  data() {
    return {
      cartList: [],
      selList: [],
      allSel: false
    };
  },
  mounted() {
    vm = this;
    vm.pageInit();
  },
  methods: {
    pageInit() {
      var cartList=this.$store.state.cartList;
      // console.log(cartList);
      cartList.forEach(item=>{
          item.bool=false;
        this.cartList=cartList;

      })
      
    },

    quanx(e,ele) { 
         
          var selList=[];

          this.cartList.forEach((item)=>{
           
            if(item.id==ele.id){    
              item.bool=!item.bool;             
                e.target.src="https://res.bestcake.com/m-images/order/mw_firm_duihao_1.jpg"
              if(!item.bool){        
                e.target.src="https://res.bestcake.com/m-images/order/mw_firm_duihao_2.jpg"      
              }         
            } 
            //  console.log(item.bool);
            if(item.bool){
                selList.push(item);       
            }
            //  console.log(selList);        
          })
           this.selList=selList;
    },


     xuanz(){
        console.log(this.cartList);
        this.cartList.forEach((item)=>{ 
          if(item.bool){
            item.bool=!item.bool;
              this.allSel=false;
            
          }else{
              item.bool=true;
              this.allSel=true;     
          }

        })
       console.log(this.cartList);
      
        
    },

    add(item, num) {
      this.$store.state.cartList.forEach(ele => {
        var price = 0;
        if (ele.id == item.id) {
          ele.num++;
          price = ele.CurrentPrice * ele.num;
        }
      });
      this.$store.state.count++;
      // Store.set("cartList",this.$store.state.cartList)
    },
    del(item) {
      if (item.num == 1) {
        item.num = 1;
        return;
      }
      this.$store.state.cartList.forEach(ele => {
        if (ele.id == item.id) {
          ele.num--;
        }
      });
      this.$store.state.count--;
      // Store.set("cartList",this.$store.state.cartList)
    },

   
     qingk() {
      MessageBox.confirm("确定要清除购物车吗?").then(action => {
        window.location.reload();
      });
    },

    jies(){
        console.log(this.$store.state.userInfo);
       if(this.$store.state.userInfo!=""){
           this.$router.push({
                path:"/user",
                
           });
       }
    }



  },
    
    
  computed: {

    allPrice() {
      var num = 0;
      this.selList.map(item => {
        num += item.num * item.CurrentPrice;
      });
      if (this.selList.length == this.cartList.length) {
        this.allSel = true;
      } else {
        this.allSel = false;
      }
      return num;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#cart {
  .kong {
    height: r(60 * 2);
    line-height: r(60 * 2);
    color: #141414;
    font-size: 3.2%;
    background: #fff;
    text-align: center;
  }
  .list {
    overflow: hidden;

    ul {
      padding: 0;
      margin: 0;
      margin-bottom: 4%;
      li {
        list-style: none;
        height: 100%;

        .dui {
          float: left;
          display: inline-block;
          margin: 0 3% 0 4%;
          width: 5.33%;
          padding-top: 17%;
          img {
            width: 100%;
          }
        }
        .info {
          float: left;
          width: 87%;
          .imgs {
            float: left;
            width: r(114 * 2);
            padding-top: 4.26%;
            margin-right: 4%;
            height: r(121 * 2);
            img {
              width: 100%;
              height: 100%;
            }
          }

          .right {
            float: left;
            width: 60%;
            padding-top: 5.06%;
            p {
              margin: 0;
              font-size: r(17 * 2);
              color: #000;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            .jisuan {
              height: 20%;
              width: 100%;
              margin: 1.2% 0;
              height: r(25 * 2);
              span {
                display: inline-block;
                float: left;
                // height: r(12*2);
                width: 30%;
                color: #ccc;
                margin-top: 1.69%;
              }
              .nright {
                float: right;
                margin-right: 3%;
                width: 40%;
                display: inline-block;
                span {
                  font-size: r(15 * 2);
                  height: r(17 * 2);
                  width: 30%;
                  img {
                    height: r(10 * 2);
                    width: r(10 * 2);
                  }
                }
                i {
                  margin-top: 3%;
                  font-style: normal;
                  float: left;
                  display: inline-block;
                  width: 30%;
                  font-size: r(16 * 2);
                }
              }
            }
            .price {
              font-size: r(12 * 2);
              color: #030303;
              font-weight: bold;
              margin-top: 2.66%;
            }
          }
        }

        .huod {
          float: left;
          padding-left: 12%;
          height: r(50 * 2);
          width: 100%;
          line-height: r(50 * 2);
          font-size: r(14 * 2);
          border-bottom: r(15 * 2) solid #f7f7f7;
          span {
            display: inline-block;

            color: #f2495e;
            margin-right: 1.333%;
            font-weight: bold;
          }
        }
      }
    }
  }
  section {
    padding-top: 14%;
    background-color: #f7f7f7;
    height: 100%;
    .other {
      padding: 17.2% 0 0 3.6%;
      overflow: hidden;
      .title {
        margin-bottom: 12.26%;
        span {
          display: block;
          height: r(27 * 2);
          line-height: r(27 * 2);
          text-align: center;
          color: #333;
          font-weight: bold;
          font-size: r(23 * 2);
        }
        div {
          padding: 2% 0 2% 22.6%;
          p {
            margin: 0;
            width: 70%;
            height: 2px;
            background: #333;
          }
        }
        p {
          margin: 0;
          font-size: r(16 * 2);
          color: #333;
          text-align: center;
          font-weight: bold;
        }
      }
      .othinfo {
        padding-bottom: 22.66%;
        ul {
          padding: 0;
          margin: 0;
          padding-bottom: 5%;
          overflow: hidden;
          li {
            padding: 0 1.73% 8.26% 0;
            list-style: none;
            width: 48%;
            float: left;
            img {
              width: 95%;
            }
            p {
              margin: 0;
              font-size: r(14 * 2);
              color: #333;
              margin: 1.2% 0 2.4% 0;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              font-weight: bold;
            }
            div {
              img {
                width: 13%;
                float: right;
              }
            }
          }
        }
      }
    }
  }

  footer {
    background-color: #fff;
    height: 8%;
    position: fixed;
    bottom: 9%;
    left: 0;
    right: 0;
    overflow: hidden;
    color: #333;
    .xuanz {
      display: inline-flex;
      align-items: center;
      height: 100%;
      width: 5%;
      margin: 0 1.33% 0 3%;
      float: left;
      //  text-align: center
      img {
        width: 100%;
        height: 40%;
        margin-top: 4.34%;
      }
    }
    .sele {
      display: inline-flex;
      align-items: center;
      font-size: r(15 * 2);
      margin: 0;
      margin-right: 4%;
      float: left;
      padding-top: 4.53% 0;
      color: #333;
      width: 9%;
      height: 100%;
    }
    p {
      display: inline-flex;
      align-items: center;
      font-size: r(14 * 2);
      margin: 0;

      float: left;
      padding-top: 4.53% 0;
      color: #333;
      width: 9%;
      height: 100%;
    }
    .price {
      float: left;
      margin: 2.53% 1.74% 0 0;
      width: 35%;
      height: 100%;
      .hej {
        width: 50%;
        height: r(20 * 2);
        display: inline-block;
        margin: 0;
        text-align: right;
        p {
          margin: 0;
          padding-right: 9%;
          font-size: r(17 * 2);
          font-weight: bold;
          color: red;
          float: right;
        }
      }
      .yh {
        padding-right: 4%;
        float: left;
        width: 100%;
        height: r(30 * 2);
        text-align: right;
      }
    }
    .js {
      float: right;
      width: 30%;
      text-align: center;
      padding: 4.3478% 0;
      background: #02d4d7;
      color: white;
      font-weight: bolder;
      font-size: r(16 * 2);
    }
  }
}
</style>


