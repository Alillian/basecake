<template>
  <div id="ico">
    <mt-tabbar v-model="selected" :fixed="true" >
      <mt-tab-item class="ico" v-for="(item,index) in routePath" :id="item.key" :key="index" @click.native="tab(index)" >
        <p><i :class="item.ico"></i></p>
        {{item.name}}
        </mt-tab-item>
        <div class="cartnum">{{$store.state.count}}</div>
    </mt-tabbar>
   
  </div>
</template>

<script>
import classVue from '../main/class.vue';
import Store from 'storejs';
// var n=Store.get("count");

export default {
  name: "HelloWorld",
  data() {
    return {
      selected: "",
    
      routePath: [
        { name: "首页", path: "/index",key:"index",ico:['fa','fa-home','fa-lg']},
        { name: "分类", path: "/class",key:"class",ico:['fa','fa-align-justify','fa-lg']},
        { name: "购物车", path: "/cart",key:"cart",ico:['fa','fa-shopping-cart','fa-lg','fly']},
        { name: "我的", path: "/user",key:"user",ico:['fa','fa-user','fa-lg']}
      ]
    };
  },
  mounted () {
  
  },
  methods: {

    tab(index){
      this.$router.push({
        path:this.routePath[index].path
      })
    }
  },


};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.ico{
  color:darkgray;
}
.cartnum{
    position: absolute;
    right: 31%;
    bottom: 60%;
    background: #f2495e;
    border-radius: 50%;
    width: 5%;
    height: 32%;
    text-align: center;
    line-height: 150%;
    font-size: r(14*2);
    color: #fff;
    z-index: 999;
}
  
</style>


