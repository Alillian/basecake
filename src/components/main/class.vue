<template>
  <div id="sclass">
      <div class="tab">
        <span @click="oneTab" :class="{acty:active==1}">自营</span>
        <span @click="two" :class="{acty:active==2}">贝式严选</span>
      </div>
      <div v-show="active==1" class="zy">
          <div class="title">
            <span v-for="(item,index) in one" :key="index" @click="optionData(index)" :class="{actived:oneTabNum==index}">{{item.name}}</span>
          </div>
          
          <ul>
            <li v-for="(item,index) in activeList" :key="index">
              <img :src="item.ImgUrl" @click="toshow(item)">
             
                <span>{{item.Name}}</span>
                <p>{{item.Means}}</p>
                <div>
                  <span class="CurrentPrice">￥{{item.CurrentPrice|setPrice}}</span>
                  <span class="Size">/{{item.Size}}</span>
                  <img src="https://res.bestcake.com\m-images-2\list-cart.png?v=1" @click="add(item)">
                </div>
             
            </li>

          </ul>        
        
      </div>
      <div class="bs" v-show="active==2">
          <span class="xtitle">乳品</span>
          <div class="tit"> </div>
          <ul>
            <li v-for="(item,index) in activeList" :key="index">
                <img :src="item.ImgUrl" @click="toshow(item)">
                <span>{{item.Name}}</span>
                <p>{{item.Means}}</p>
                <div>
                  <span class="CurrentPrice">￥{{item.CurrentPrice|setPrice}}</span>
                  <span class="Size">/{{item.Size}}</span>
                   <img src="https://res.bestcake.com\m-images-2\list-cart.png?v=1" @click="add(item)">
                </div>
            </li>
          </ul>
      </div>
    
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
     

  </div>
</template>

<script>
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
  name: 'HelloWorld',
  data () {
    return {
      active:1,
      goodsList:[],
      activeList:[],
      one:[
        {
          name:"经典",
          mark:"KSK"
        },
        {
          name:"女神",
          mark:"NS"
        },
        {
          name:"伴手礼",
          mark:"JZ"
        }
      ],
       oneTabNum:0,
     }
  },

  mounted(){
    Indicator.open();

   this.pageInit();
   this.oneTab();
   
  },

  methods:{
    pageInit(){
       
        this.GetJdListNew(res=>{
        var goodsList=res.data.Tag.cakelist;
        var url=`https://res.bestcake.com/m-images/ww/`;

        goodsList.forEach((item)=>{

          if(item.SupplyNo.indexOf("KSK")!=-1){
            item.ImgUrl=`${url}jd/${item.Name}.png`;
          }else if(item.SupplyNo.indexOf("NS")!=-1){
            item.ImgUrl=`${url}ns/${item.Name}.jpg`;
          }else if(item.SupplyNo.indexOf("JZ")!=-1){
            item.ImgUrl=`${url}jz/${item.Name}.png`;
          }else{
            item.ImgUrl=`${url}rp/${item.Name}.jpg`;
          }
        });
        
      this.goodsList=goodsList;
      
      this.optionData(0);

       Indicator.close();
      
      })

    },
     
    optionData(index){

      // console.log(index);
     
      var tabNow=this.one[index]?this.one[index].mark:"RP";

        //  var tabNow=this.one[index].mark;
          // console.log(tabNow);
      var activeList=[];
      // console.log(this.goodsList);

      this.goodsList.forEach((item) => {
        if(item.SupplyNo.indexOf(tabNow)!=-1){
          activeList.push(item);
        }
      });

      this.activeList=activeList;

      if (index!=4) {
        this.oneTabNum=index;
      }
      // console.log(this.activeList);
    },
    oneTab(){
      this.active=1;
      this.optionData(this.oneTabNum);
      // console.log(this.oneTabNum);
      //  this.optionData(0);
    },
     two(){
      this.active=2;
      this.optionData(4);
    },
    

    add(item){
      //  console.log(item);
        var data={
          id: item.ID,  //产品ID
          Name: item.Name, //产品详情图片拼接,//贝利
          CurrentPrice: item.CurrentPrice, //产品价格
          Size: item.Size, //产品规格
          url: item.ImgUrl, //产品购物车显示图片
          SupplyNo:item.SupplyNo  //产品货号类型
        }
        // console.log(data);
        this.$store.commit("add",data);

        MessageBox.confirm('成功加入购物车').then(action => {
         
        });

     },

   

    toshow(item){
      var data={
        key:item.Name,
        c:item.SupplyNo
      }
      this.$router.push({
        path:"/show",
        query:{key:data.key,c:data.c}
      })
    },
     
    GetJdListNew(callback){
      this.$apis.GetJdListNew().then(res=>{
        callback(res);
      })
     
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
body{
  #sclass{
    .tab{
      position: relative;
      border-bottom: r(2*2) solid #d9d9d9;
      height:r(48.75*2);
      // box-sizing: content-box;
      span{
        width: 50%;
        float: left;
        height:r(48.75*2);
        line-height:r(48.75*2);
        text-align: center;
        font-size:r(16*2); 
        border-bottom: r(2*2) solid #d9d9d9;  
      }
      .acty{
        border-bottom: r(2*2) solid #1fb1b9;
        color: #1fb1b9;
      }
    }
    .zy{
      overflow: hidden;
      .title{
        display: flex;
        justify-content: space-around;
        margin-top: 7.466%;
        height: r(22*2);
        text-align: center;
        span{
          display: inline-block;
          font-size: r(13*2);
          text-align: center;
          color: #333;
          line-height: r(23*2); 
          box-sizing: border-box;
         border-bottom:r(20*2) solid #fff;
        }
        .actived{
          font-weight: bold;
          line-height: r(23*2); 
          font-size:r(16*2);
          border-bottom:r(7*2) solid #1fb1b9;
        
        }
      }
      ul{
        margin: 0;
        padding:0 1.6%;
        overflow: hidden;
        li{
          list-style: none;
          float: left;
          width:44%;
          margin-bottom: 5.3345%;
          height:r(231*2);
          position: relative;
        

          img{
            height:71%;
            width:100%;
          }
          span{
            display: inline-block;
            font-size: r(15*2);
            color: #333;
            padding-left: r(7.5*2);
          }
          p{
            margin:0;
            line-height: r(20*2);
            font-size: r(12.5*2);
            color: #999;
            padding-left: r(7.5*2);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          div{
            .CurrentPrice{
              font-size: r(16*2);           
              color:red;
            }
            .Size{
              font-size: r(12*2);
              color: rgb(212, 212, 212);
              margin-left:r(4*2);
              padding: 0;
            }
            img{
              width: r(20*2);
              height: r(20*2);
              position: absolute;
              right: 0;
            }
          }
        
        }
        li:nth-child(2n+1){
          margin-right: 8.8%;
        }
      }
      
    }
    .bs{
      overflow: hidden;
      .xtitle{
        display: inline-block;
        width: 100%;
        // height:r(48.75*2);
        // line-height:r(48.75*2);
        text-align: center;
        font-size:r(16*2);
        font-weight: bold;
        margin-top: 7.466%;
        position: relative;
        z-index: 2;
      }
      .tit{
        display: inline-block;
        width: 10%;
        height:r(8*2);
        background-color:#1fb1b9;
        position: absolute;
        right:45%;
        top: 13.5%;
        z-index: 1;
      }
      ul{
        margin: 0;
        padding:0 1.6%;
        overflow: hidden;
        li{
          list-style: none;
          float: left;
          width:44%;
          margin-bottom: 5.3345%;
          height:r(231*2);
          position: relative;
        

          img{
            height:71%;
            width:100%;
          }
          span{
            display: inline-block;
            font-size: r(15*2);
            color: #333;
            padding-left: r(7.5*2);
          }
          p{
            margin:0;
            line-height: r(20*2);
            font-size: r(12.5*2);
            color: #999;
            padding-left: r(7.5*2);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          div{
            .CurrentPrice{
              font-size: r(16*2);           
              color:red;
            }
            .Size{
              font-size: r(12*2);
              color: rgb(212, 212, 212);
              margin-left:r(4*2);
              padding: 0;
            }
            img{
              width: r(20*2);
              height: r(20*2);
              position: absolute;
              right: 0;
            }
          }
        
        }
        li:nth-child(2n+1){
          margin-right: 8.8%;
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
</style>


