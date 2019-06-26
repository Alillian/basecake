<template>
  <div id="edit">
    <div>
        <div v-if="loginNum==0">
            <div class="title">
                <div class="btn" @click="back"><p></p></div>
                <span>用户注册</span>
            </div>
            <label for="" >
                <p>用户名:</p>
                <input type="text" v-model="uname">
            </label>
            <label for="">
                <p>密码:</p> 
                <input type="password" v-model="upwd">
            </label>  
             <label for="">
                <p>昵称:</p> 
                <input type="text" v-model="name">
            </label>  

            <button class="butpoto" v-fileUpload="{multiple:false,fn:'fileUpload'}">头像上传</button>
            <img :src="imgUrl" alt="" class="toux">
            
            
        </div> 
              
        <button @click="edit" class="edit">立即注册</button>
         
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
       name:"",
       userInfo:{},
       loginNum:0,

       imgUrl:"",
      
    }
  },
  mounted(){
     this.pageInit();
  },
  methods: {
      pageInit(){
          this.userInfo=this.$store.state.userInfo;
      },
      back(){
          this.$router.push({
              path:"/user"
          });
      },
      edit(){
          var data={
              id: 1,
              username: this.uname,
              password: this.upwd,
              avatar: this.imgUrl,
              name: this.name
          };
          this.$apis.edit(data).then(res=>{
            // console.log(res);
              if(res.data.code==1){
                // this.$store.commit("saveInfo",res.data.reqdata)
                 Toast({
                    message: '注册成功',
                    duration: 1000
                 });
                  this.$router.push({
                     path:"/user"
                  });
              }else if(res.data.code==-1){
                  Toast({
                    message: '用户名不能为空',
                    duration: 1000
                 });
              }
          })
      },

      fileUpload(str){
        // console.log(str);
        this.imgUrl=str;
      }
      



  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#edit{

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
  .butpoto{
      float: left;
      text-align: center;
      font-size:r(18*2);
      width:r(124*2);
      height: r(32*2);
      margin: 5% 0 0 30%;
      line-height: r(32*2);
      border:1px solid #fff;
      outline:none;
      color: #fff;
      background: none;
  }
  .toux{
      display: block;
      width: 30%;
      height:r(110*2);
      margin:20% 0 0 32%; 
      border-radius:100%; 
  }
  .edit{
    text-align: center;
    font-size:r(18*2);
    width:r(124*2);
    height: r(32*2);
    line-height: r(32*2);
    margin:5% 0 35% 30%;
    border:1px solid #fff;
    outline:none;
    border-radius: 20px;
    color: #fff;
    background: none;
  }
}
</style>