<template>
  <div id="warp">
      <div class="swipe">
        <mt-swipe :auto="4000" :flxed="true">
          <mt-swipe-item v-for="(item,index) in bannerList" :key="index">
            <img class="imgs" :src="item.ImgUrl">
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="ico">
        <a href="#">
          <div v-for="(item,index) in iconList" :key="index">
            <img :src="item.ImgUrl" alt="">
            <p>{{item.ActName}}</p>
          </div>
        </a>
      </div>
      <div class="imgClass">
        <div v-for="(item,index) in imgList" :key="index" @click="toshow(item)">
          <img :src="item.ImgUrl" alt="">
        </div>
      </div>

      <!-- 魔法猜心 -->
      <img class="mflogo" src="https://res.bestcake.com/m-images-2/mofa.png" alt="">
      <div class="special-title">任选一款，走进你的心</div>  
        
      <div class="tabs">
        <div class="mofa-tab">
           <span v-for="(item,index) in tabClass" :key="index" @click="setTab(index)" :class="{active:tabActive==index}">{{item}}</span>
        </div>     
        <ul>
          <li v-for="(item,index) in activeList" :key="index" @click="toshow(item)">
            <img :src="item.ImgUrl" alt="">
            <p>{{item.Name}}</p>
            <div>
              <span class="CurrentPrice">￥{{item.CurrentPrice}}</span>
              <span class="Size">/{{item.Size}}</span>
            </div>
          </li>
        </ul>
      </div>

      <!-- 品质臻选 -->
      <img class="pz" src="https://res.bestcake.com/m-images-2/pinzhi.png" alt="">
      <div class="special-title1">没尝过这些美味的人生，是不完美的</div> 

      <div class="goodsList">
        <ul>
          <li v-for="(item,index) in goodsList" :key="index">
            <img v-lazy="item.ImgUrl"  @click="toshow(item)">
            <div class="info">
              <div class="names">{{item.Name}}</div>
              <p class="more-info">{{item.MoreUrl}}</p>
              
              <span></span>

              <div class="price">
                <span class="CurrentPrice">￥{{item.CurrentPrice|setPrice}}</span>
                <span class="Size">/{{item.Size}}</span>
              </div>
              <img src="https://res.bestcake.com/m-images-2/pinzhi-cart.png" alt="" @click="add(item,$event) ">
            </div>

          </li>
          <div class="gonggao">
            <div class="gat">
              <div class="text-z">划线价格</div>          
              <div class="text-y">
                商品的专柜价、吊牌价、正品零售价、厂商指导价或该商品的曾经展示过的销售价等，并非原价，仅供参考。 
              </div>
            </div>
            <div class="gat">
              <div class="text-z">未划线价格</div>          
              <div class="text-y">
                商品的实时标价，不因表述的差异改变性质。具体成交价格根据商品参加活动，或会员使用优惠券、积分等发生变化，最终以订单结算页价格为准。
              </div>
            </div> 
          </div>
        </ul>
      </div>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui';
import "@/common/js/fly"
export default {
  name: 'HelloWorld',
  data () {
    return {
      //轮播数据
     bannerList:[],
      // 8个ico数据
     iconList:[],
      //3张焦点图数据
     imgList:[
       {
         name:'宠爱少女',
         key:'宠爱少女',
         ImgUrl:"https://res.bestcake.com/m-images-2/guanggao1.png?v=0419"
       },
       {
         name: "小猪蛋糕-贝丽",
         key: "贝丽",
         ImgUrl:"https://res.bestcake.com/m-images-2/guangao22.png?v=0419"
       },
       {
         name: "星光游乐园",
         key: "星光游乐园",
         ImgUrl:"https://res.bestcake.com/m-images-2/guanggao3.png"
       }
     ],
     //魔法猜心
     tabClass:["送恋人","送挚友","送长者","送亲子"],

     activeList:[],

     tabActive:0,

     tabList:[],

     goodsList:[]
    }
  },
  mounted(){
    Indicator.open();

    this.GetBannerList(res=>{
      res.forEach(item => {
        item.ImgUrl="https://res.bestcake.com/"+item.ImgUrl;
      });
      this.bannerList=res;
    });

    this.GetIndexCakeList(res=>{
      // console.log(res);
      //8个图标数据
      res.iconList.forEach((item)=>{
        if(item.City.indexOf("上海")!=-1){
          this.iconList.unshift(item);
        }
      })
      
      
      res.list.forEach((item)=>{
        if(item.TabType==4){    //  type=4魔法猜心
          this.tabList.unshift(item);
        }else{
          this.goodsList.push(item);
        }
      })
      // console.log(this.goodsList);

      Indicator.close();

      this.setTab(0);
    })
     
  },
  methods:{
    //3张图跳转详情页
    toshow(item){
      // console.log(key);
      // console.log(item);
      // return;
      var data={
        key:item.Name||item.key,
        c:item.SupplyNo||'NS'
      }
      this.$router.push({
        path:"/show",
        query:{key:data.key,c:data.c}
      });
    },

    setTab(index){
      var activeList=[];
      this.tabList.forEach((item)=>{
        if(this.tabClass[index]==item.ActiveName){
          activeList.push(item);
        }
        
      })
        // console.log(activeList);
      this.activeList=activeList.slice(0,3);
      this.tabActive=index;
      
    },
    test(key){
      // console.log(key);
    },

     add(item,event){
      //  
      // console.log(item);

       var flyer=$(`<img class="flyer-img" src=${item.ImgUrl} style="width:50px;height:50px">` );
         var top=$(window).scrollTop();
         var dh=event.pageY;
         var newh=dh-top;
        //  购物车节点位置,决定图片飘的位置
         var oBtn=$(".fly").offset();
         var newdh=oBtn.top-top; 
        //  console.dir(flyer);

        flyer.fly({   
            start: {   
                left: event.pageX-20,//抛物体起点横坐标   
                top:newh //抛物体起点纵坐标   
            },   
            end: {   
                left: oBtn.left,//抛物体终点横坐标   
                top: newdh //抛物体终点纵坐标   
            },   
            onEnd: function() {   
                this.destory(); //销毁抛物体   
            }   
         })  
        

        var data={
          id: item.Pid,  //产品ID
          Name: item.Name, //产品详情图片拼接,//贝利
          CurrentPrice: item.CurrentPrice, //产品价格
          Size: item.Size, //产品规格
          url: item.ImgUrl, //产品购物车显示图片
          SupplyNo:item.SupplyNo  //产品货号类型
        }
        // console.log(data);
        this.$store.commit("add",data)

     },




    GetBannerList(callback){
      var data={
            v: '1559785164172',
            c: 'Index',
            m: 'GetBannerList',
            Type: '2',
            City: '上海'
          };
      this.$apis.GetBannerList(data).then((res)=>{
          callback(res.data.Tag.List);
      })
    },
    GetIndexCakeList(callback){
      this.$apis.GetIndexCakeList().then(res=>{
        callback(res.data.Tag);
      })
    },


           
            // console.log(e,$);
        

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
body{
  margin: 0;
  #warp {
    .swipe {
      width:100%;
      height: r(190 * 2);
      .imgs {
        width: 100%;
        height: auto;
      }
    }
    .ico{
      box-sizing: border-box;
      height:r(201*2);
      padding: 0 r(11*2) r(15*2) r(11*2);
      border-bottom: r(10*2) solid #fafafa;
     a{
       text-align: center;
       color: #333;
       text-decoration: none;
       display: inline-block;
       div{
         margin-top:r(12*2);
         display: inline-block;
         text-align: center;
         width:r(88*2);
         height:r(76*2);
         img{
           width:r(56*2);
           height:r(56*2);
         }
         p{
           margin:0;
           font-size:r(14*2)
         }
       }
     }
    }
    .imgClass{
      box-sizing: border-box;
      border-bottom: r(10*2) solid #fafafa;
      padding: r(15*2);
      div:nth-child(1){
        display: inline-block;
        width:r(168*2);
        img:nth-child(1){
          width:r(168*2);
          height:r(150*2);
        }
      }
      div:nth-child(2){
        display: inline-block;
        float: right;
        height: r(73*2);
        img{
          width:r(168*2);
          height: r(73*2);
        }
      }
      div:nth-child(3){
        display: inline-block;
        position: relative;
        height: r(73*2);
        img{
          width:r(168*2); 
          height: r(73*2); 
          position:absolute;
          left:r(10*2);
        }
      }
    }
    .mflogo{
      // width:100%;
      height:r(18*2);
      margin:r(25*2) 0 r(10*2) 0;
    }
    .special-title{
      text-align: center;
      color: #999;
      height: r(18*2);
      font-size:r(12*2);
      margin-bottom: r(16*2);
    }
    .tabs{
      // height:r(300*2);
      
      .mofa-tab{
        display: flex;
        justify-content: space-between;
        height:r(33*2);
        line-height:r(26*2);
        margin-bottom:r(10*2);
        padding: 0 r(15*2); 
        color: #333;
        span{
          font-size: r(14*2);
          display: inline-block;
          width:r(60*2);
          height:r(33*2);  
          text-align: center;
          background: url(https://res.bestcake.com/m-images-2/mofa-1.png) no-repeat center center;
          background-size: r(60*2) r(33*2);
        }
        .active{
          background:url(https://res.bestcake.com/m-images-2/mofa-2.png) no-repeat center center;
          background-size: r(60*2) r(33*2);
          color:#fff;
        }
      }
      ul{
        padding: 0 r(20*2) r(20*2) r(15*2);
        margin: 0;
        border-bottom: r(10*2) solid #fafafa;
        display:flex;
        justify-content: space-between;
        text-align: center;
        li{
          list-style: none;
          width:r(90*2);
          height:r(137*2);         
          img{
            width:r(106*2);
            height:r(90*2);
          }
          p{
            height:r(22*2);
            line-height:r(22*2);
            color:#333;
            font-size:r(15*2);
            margin:0;
            overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;    
          }
          div{
            height:r(25*2);
            .CurrentPrice{ 
              font-size: r(16*2);           
              color:red;
              
            }
            .Size{
              font-size: r(12*2);
              color: rgb(212, 212, 212);
              margin-left:r(4*2);
            }
          }

        } 
      }

    }
    .pz{
      height:r(20*2);
      width: 100%;
      margin:r(25*2) 0 r(10*2) 0;
    }
    .special-title1{
      margin-bottom: r(30*2);
      text-align: center;
      color: #999;
      height: r(18*2);
      font-size:r(12*2);
    }
    .goodsList{
      // height:r(200*2);
      ul{
        padding:0;
        margin: 0;
         
        li{
          display: flex;
          list-style: none;
          margin-bottom: r(12*2);
          padding: 0 r(15*2);
           position: relative;
          img{
            width:r(110*2);
            height:r(110*2);
            display: inline-block;
          }
          .info{
            display: inline-block;
            margin-left:r(15*2);
            width:r(187.5*2);
            height:r(100*2);
           

            .names{
              height:r(25*2);
              margin-top:r(4*2);
              font-size:r(15.5*2);
              color: #333;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .more-info{
              margin:0;
              margin-bottom:r(4*2);
              height:r(19*2);
              line-height: r(19*2);
              font-size:r(12*2);
              color: #999;
               overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .price{
              height:r(25*2);
              .CurrentPrice{ 
                font-size: r(16*2);           
                color:red;
                
              }
              .Size{
                font-size: r(12*2);
                color: rgb(212, 212, 212);
                margin-left:r(4*2);
              }
            }
            img{
              width:r(42*2);
              height:r(42*2);
             position: absolute;
             right:r(16*2);
             bottom: r(0.001*2);
            }
          }
        }
        .gonggao{
          padding:r(7.5*2) 0;
          height:r(255*2);
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
      }
    }
    
  }
 
}


</style>


