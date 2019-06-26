import Vue from "vue";
import Vuex from "vuex";
import apis from "@/core/api/index"
import Store from "storejs"
// console.log("OK");
Vue.use(Vuex);



//定义属性值  data
const state={
	// state.cartList
	cartList: [],
	count: 0,
	isLogin: false,
	userInfo:""
	
}
//定义同步方法
const mutations = {
	vuexInit(state) {
		// console.log("ok");
		// state.cartList=Store.get("cartList")||[];
		
	},


	add(state,data){
		// console.log(Store)	
		if (state.cartList.length != 0) {
			var bool = true;
			var n = 0;
			state.cartList.forEach((item) => {
				 
				if (data.id==item.id) {
					item.num++;
					bool = false;
					return;
				}
			});

			if (bool) {
				data.num =data.num||1;
				state.cartList.push(data);
			}
			
			state.cartList.forEach(item => {
				n += item.num;
			})
			state.count = n;

		} else {
			state.count = 1;
			data.num = 1;
			state.cartList.push(data);
		}
		// console.log(state.cartList);
		// Store.set("cartList", state.cartList)
		// Store.set("count", state.count)
	
	},

	saveInfo(state, data) {
		state.userInfo = data;
		// console.log(state.userInfo);
	}




}
//定义 computed(属性计算)
const getters={
	count(state){
		return state.num*state.price;
	}
}

//定义异步方法,可以在这个里面做一些异步操作,比如调用通用数据接口
const actions={
	syFn(context){
		// context.state  可以取 state 属性
		// context.commit  可以调用 mutations 同步方法 属性
		// context.dispatch可以调用 actions 异步方法 属性
		// 在组件里面调用 也是一样,同上面的方法一直 
	},
	test(context,data){
		console.log(data)
	}	
}

export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})
