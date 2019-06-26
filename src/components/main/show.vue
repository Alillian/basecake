<template>
  <div id="show">
    <!-- 详情轮播图 -->
    <div class="swipe">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(item,index) in bannerList" :key="index">
          <img class="imgs" :src="item">
        </mt-swipe-item>
      </mt-swipe>
    </div>

    <div class="swipe-name" v-for="(item,index) in infoList" :key="index">{{item.Name}}</div>

    <div class="info">
      <div class="td">
        <span>甜度</span>
        <div>
          <img src="https://res.bestcake.com/m-images/ww/jz/tiandu_3.png" alt>
        </div>
      </div>
      <div class="kw" >
        <span>口味</span>
        <div v-for="(item,index) in infoList" :key="index">{{item.CategoryName}}</div>
      </div>
      <div class="ycail">
        <span>原材料</span>
        <div v-for="(item,index) in infoList" :key="index">{{item.Resource}}{{item.Resourse}}</div>
      </div>
      <div class="shih">
        <span>适合人群</span>
        <div >所有人群</div>
      </div>
      <div class="baox">
        <span>保鲜条件</span>
        <div>最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时。5月1日~10月31日建议2天内食用 11月1日~翌年4月30日建议3天内食用。</div>
      </div>
    </div>

    <div class="pingj">
      <div class="left">
        <img src="https://res.bestcake.com/m-images/ww/detail/evaluate-a.png" alt>
        <span>商品评价</span>
      </div>
      <div class="right">
        <span>(4条)</span>
        <img src="https://res.bestcake.com/m-images/ww/detail/evaluate-b.png" alt>
      </div>
    </div>

    <div class="bgw">

      <div class="size">
        <span v-for="(item,index) in sizeList" :key="index" @click="selSize(index)" :class="{active:selNum==index}">{{item.Size}}</span>
      </div>

      <div class="other">
        <div class="other-a"> 
          <img src="https://res.bestcake.com/m-images/ww/detail/icon-custom-1.png?v=112" alt="">
          <span>直径13.5cm</span>
        </div>
        <div class=" other-b">
          <img src="https://res.bestcake.com/m-images/ww/detail/icon-custom-2.png" alt="">
          <span>适合4-5人分享</span>
        </div>
        <div class=" other-c">
          <img src="https://res.bestcake.com/m-images/ww/detail/icon-custom-3.png" alt="">
          <span>含五人份餐具</span>
        </div>
        <div class=" other-d">
          <img src="https://res.bestcake.com/m-images/ww/detail/icon-custom-4.png" alt="">
          <span>至少需提前一天预约</span>
        </div>
      </div>
    </div>

    <div class="buynum">
      <span>购买数量</span>
      <div class="nright">
          <span><img @click="del" src="https://res.bestcake.com\m-images\order\reduce-1.png" alt=""></span> 
          {{num}}
          <span><img @click="jia" src="https://res.bestcake.com/m-images/ww/detail/add.png" alt=""></span>
      </div>
    </div>

    <div class="gonggao">
      <div class="gat">
        <div class="text-z">划线价格</div>
        <div class="text-y">商品的专柜价、吊牌价、正品零售价、厂商指导价或该商品的曾经展示过的销售价等，并非原价，仅供参考。</div>
      </div>
      <div class="gat">
        <div class="text-z">未划线价格</div>
        <div class="text-y">商品的实时标价，不因表述的差异改变性质。具体成交价格根据商品参加活动，或会员使用优惠券、积分等发生变化，最终以订单结算页价格为准。</div>
      </div>
    </div>

    <div class="footer">
      <div class="price"> 
        <!-- <span>{{sizePrice.CurrentPrice*num|setPrice}}</span> -->
        <span>{{sizePrice.CurrentPrice*num|setPrice}}</span>
        <p>已优惠：0.00</p>
      </div>
      <div class="jrcart" @click="add">
        <p @click="cartjia">加入购物车</p>
      </div>
      <div class="jiesuan">立即购买</div>
    </div>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
  name: "HelloWorld",
  data() {
    return {
      bannerList: [],

      infoList: [],
      goodsList:{},
      sizeList:[],
      showData:{},
      selNum:0,
      sizePrice:{},
      num:1
    };
  },
  mounted() {
     Indicator.open();
    this.pageInit();
    // console.log(this.$route);
  },
  methods: {
    pageInit() {
      if (this.$route.query.c.indexOf("NS") != -1) {
        this.GetNSCakeByName(res => {
          // console.log(res);
         
          // console.log(res.data.Tag);
          res.data.Tag.forEach(item => {
            if (item.City == "上海") {
              this.infoList.push(item);
            }
            
          });
           this.goodsList=res;
            // console.log(this.infoList);
        });
        this.setBannerList("ns-detail");
      } else if (this.$route.query.c.indexOf("KSK") != -1) {
        this.GetCakeByName(res => {
          // console.log(res);     
           
          //  console.log(this.infoList); 
            this.infoList.push(res.data.Tag.infos);
            
            //  console.log(this.infoList);
          // });
           this.goodsList=res;
        });
        this.setBannerList("jd-detail");
      } else if (this.$route.query.c.indexOf("RP") != -1) {
        this.GetRuPCakeByName(res => {
          // console.log(res);
          var infoLists=[];
          res.data.Tag.forEach(item => {
            if (item.City == "上海") {
              infoLists=item;
            } 
          });
           this.infoList.push(infoLists);

            console.log(this.infoList);
          
           this.goodsList=res;
        });
        this.setBannerList("rp-detail");
      } else {
        this.GetjzCakeInfo(res => {
          // console.log(res);
          this.infoList=res.data.Tag;        
         console.log(this.infoList);
          this.goodsList=res;
        });
        this.setBannerList("jz-detail");
       
      }
      // console.log(this.infoList);
       
    },
    

    jia(num){
      this.num++;
    },
    del(num){
      if(this.num!=1){
         this.num--;
      }    
    },

    cartjia(){
        MessageBox.confirm('成功加入购物车').then(action => {
         
      });
    },


    selSize(index){
      // console.log(index);
      this.selNum=index;

      this.sizePrice=this.sizeList[index]
      console.log(this.sizePrice);
    },

    add(){
      var data={
        id: this.sizeList[this.selNum].ID||this.sizeList[this.selNum].Id,  //产品ID
        Name: this.showData.Name, //产品详情图片拼接,//贝利
        CurrentPrice:this.sizeList[this.selNum].CurrentPrice, //产品价格
        Size: this.sizeList[this.selNum].Size, //产品规格
        url: this.bannerList[0], //产品购物车显示图片
        SupplyNo:this.sizeList[this.selNum].SupplyNo,  //产品货号类型
        // num:this.sizeList[index].num
     }
      // console.log(data);
      this.$store.commit("add",data)
    },

    setBannerList(path) {
      for (var i = 0; i < 4; i++) {
        var str = `https://res.bestcake.com/m-images/${path}/${
          this.$route.query.key
        }/${this.$route.query.key}-${i + 1}.jpg`;
        this.bannerList.push(str);
      }
      // console.log(this.bannerList);
    },

    //----------------------------接口

    GetNSCakeByName(callback) {
      //3张图详情接口
      var data = {
        Name: this.$route.query.key
      };
      this.$apis.GetNSCakeByName(data).then(res => {
        callback(res);
      });
    },

    GetCakeByName(callback) {
      var data = {
        ProName: this.$route.query.key
      };
      this.$apis.GetCakeByName(data).then(res => {
        callback(res);
      });
    },

    GetjzCakeInfo(callback) {
      var data = {
        ProName: this.$route.query.key
      };
      this.$apis.GetjzCakeInfo(data).then(res => {
        callback(res);
      });
    },

    GetRuPCakeByName(callback) {
      var data = {
        Name: this.$route.query.key
      };
      this.$apis.GetRuPCakeByName(data).then(res => {
        callback(res);
      });
    }
  },
  watch: {
    goodsList:{
      handler(){
        var city="上海";
        // console.log(this.infoList.data.Tag);
        if(this.goodsList.data.Tag.length){
         
          this.goodsList.data.Tag.forEach((item)=>{
            //  console.log(this.infoList.data.Tag);
            // console.log(item);
            if(city==item.City){
              this.sizeList.push(item);
            }

          })

          if(this.sizeList.length==0){
                this.sizeList.push(this.goodsList.data.Tag[0]);
                // console.log(this.sizeList);
          }
          // console.log(this.sizeList);
          //  console.log(this.sizeList);         
          this.showData=this.sizeList[0];
          this.sizePrice=this.sizeList[0];

          // console.log(this.showData);

          // console.log(this.sizePrice);
          
 
        }else{  
          // console.log(this.infoList.data.Tag.infos.CakeType);
          this.sizeList=this.goodsList.data.Tag.infos.CakeType;
          this.showData=this.goodsList.data.Tag.infos;
          this.sizePrice=this.sizeList[0];
        // }
        // console.log(this.showData);
           
        // console.log(this.sizeList)
        
        }

       deep:true
       Indicator.close();
      }  
    }
  }
}
</script>

<style scoped lang="scss">
body {
  height: 0;
  #show {
    overflow: hidden;
    .swipe {
      width: 100%;
      height: r(445 * 2);
      .imgs {
        width: 100%;
        height: auto;
      }
    }
    .swipe-name {
      height: r(98.5 * 2);
      text-align: center;
      margin-top: r(7 * 2);
      font-size: r(17 * 2);
      font-weight: bold;
      color: #333;
      border-bottom: r(15 * 2) solid #f7f7f7;
    }
    .info {
      height: r(300 * 2);
      margin: 0 r(15 * 2) 0 r(15 * 2);
      overflow: hidden;
      color: #333;
      font-size: r(13 * 2);
      span {
        display: inline-block;
        width: r(60 * 2);
        float: left;
        color: #9a9a9a;
      }
      .td {
        height: r(22 * 2);
        margin: r(34 * 2) 0 r(11 * 2) 0;
        div {
          float: left;
          height: r(22 * 2);
          line-height: 1.6;
          margin-left: r(15 * 2);
          img {
            width: r(84 * 2);
            height: r(16 * 2);
            margin-top: r(2.5 * 2);
          }
        }
      }
      .kw {
        height: r(22 * 2);
        margin-bottom: r(15 * 2);
        div {
          float: left;
          height: r(22 * 2);
          line-height: 1.6;
          margin-left: r(15 * 2);
          color: #252525;
        }
      }
      .ycail {
        height: r(44 * 2);
        margin-bottom: r(15 * 2);
        div {
          display: inline-block;
          float: left;
          height: r(44 * 2);
          width: r(270 * 2);
          line-height: 1.6;
          margin-left: r(15 * 2);
          color: #252525;
        }
      }
      .shih {
        height: r(22 * 2);
        margin-bottom: r(15 * 2);
        div {
          float: left;
          height: r(22 * 2);
          line-height: 1.6;
          margin-left: r(15 * 2);
          color: #252525;
        }
      }
      .baox {
        height: r(66 * 2);
        margin-bottom: r(15 * 2);
        div {
          display: inline-block;
          float: left;
          height: r(66 * 2);
          width: r(270 * 2);
          line-height: 1.6;
          margin-left: r(15 * 2);
          color: #252525;
        }
      }
    }

    .pingj {
      height: r(22 * 2);
      padding: r(15 * 2) 0;
      border-top: r(15 * 2) solid #f7f7f7;
      border-bottom: r(15 * 2) solid #f7f7f7;
      .left {
        padding-left: r(15 * 2);
        display: inline-block;
        img {
          float: left;
          height: r(17 * 2);
          width: r(21 * 2);
          margin: r(4.5 * 2) r(10 * 2) 0 0;
        }
        span {
          display: inline-block;
          height: r(22 * 2);
          font-size: r(14 * 2);
          float: left;
        }
      }
      .right {
        display: inline-block;
        height: r(22 * 2);
        padding-right: r(15 * 2);
        float: right;
        span {
          display: inline-block;
          font-size: r(14 * 2);
          height: r(22 * 2);
          line-height: r(22 * 2);
          color: #9a9a9a;
          //  float:right;
        }
        img {
          float: right;
          height: r(14 * 2);
          width: r(9 * 2);
          margin: r(4.8 * 2) 0 0 r(10 * 2);
        }
      }
    }

    .bgw {
      height: r(195 * 2);
      overflow: hidden;
      border-bottom: r(15 * 2) solid #f7f7f7;

      .size{
        margin-top:r(30*2);
        height:r(30*2);
        span{
          text-align: center;
          display:inline-block;
          height: r(30 * 2);
          line-height:  r(30 * 2);
          width:13%; 
          border: 1px solid #ddd;        
          border-radius: 2px;
          font-size:r(12*2); 
          margin-left: r(15*2);
          padding:0 r(13.5*2);
        }
        .active{
          background: #02d3d6;
           color: #fff;
           border: 1px solid #02d3d6; 
        }
      }
      .other{
         height: r(93 * 2);
         margin-top:r(42*2); 
          div{
            display: inline-block;
            height: r(24 * 2);
            width: r(180* 2);
            margin-bottom: r(15*2);
             img{
              height: r(22.5 * 2);
              width: r(22.5* 2);  
              float: left;
             }
             span{
               float: left;
               height: r(24*2);
               line-height: r(24*2);
               font-size: r(13*2);
             }
         }
         .other-a,.other-c{
           img{
             margin:0 r(10*2) 0 r(15*2);
           }
            
         }
         .other-b,.other-d{
           img{
             margin-right: r(5*2);
           }    
         }
         .other-c,.other-d{
          margin-bottom: r(30*2);
         }

      }
    }

    .buynum {
      height: r(22 * 2);
      padding: r(15 * 2) 0;
      border-bottom: r(15 * 2) solid #f7f7f7;
       font-size:r(14*2);
       
       span{
         padding-left:r(15*2);
          display: inline-block;
         font-size:r(14*2);
       }
       .nright{
         float: right;
         padding-right:r(15*2);
         display: inline-block;
         
          span{
            font-size:r(15*2);
            height: r(17 * 2);
            width: r(25* 2);
            img{
              height: r(10 * 2);
            width: r(10* 2);
            }
          }
       }
    }
    .gonggao{
          padding:r(7.5*2) 0;
          height:r(255*2);
          background-color:#f7f7f7;
         
          .gat{
              height:r(66*2);
              margin:0 r(15*2) r(15*2) r(15*2);
              font-size:r(14.3*2);
              .text-z{
                display: inline-block;
                width:r(101*2);
                height:r(22*2);
                color: #181818;
              }
              .text-y{
                width:r(243*2);
                height:r(66*2);
                line-height: 1.6;
                color: #a2a2a2;
                float: right;
              }
          }
    }

    .footer{
      margin-top:4%;
      height: 8.3%;
      background-color: #fff;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      div{
         display: inline-block;
      }
      .price{
        float: left;
        margin:1.4492% 0 2.4%  4%;
        width: 36%;
        overflow: hidden;
        span{
          font-size: r(17*2);
          color: #f2495e;
          font-weight: bolder;
          font-weight: bolder;
          line-height: 1.6;
        }
        p{
         margin:0;
          font-size: r(12*2);
          color:#333;
        }
      }
      .jrcart{
        // float: right;
        width: 29.335%;
        text-align: center;
        line-height: 1.6;
        color: #333;
        font-size: r(16*2);
        padding: 4.3478% 0;
        p{
          margin: 0;
        }
      }
      .jiesuan{
        float: right;
        width: 30.667%;
        text-align: center;
        padding: 4.3478% 0;
        background: #02d4d7;
        color: white;
        font-weight: bolder;
        line-height: 1.6;
        font-size: r(16*2);
      }
    }
  }
}
</style>


