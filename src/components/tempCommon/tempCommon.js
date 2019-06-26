import { Tabbar, TabItem } from 'mint-ui';
import { Swipe, SwipeItem } from 'mint-ui';
export default (Vue)=>{
	// console.log(Vue);
	// 定义全局组件	
	
	//首页轮播
	Vue.component(Swipe.name, Swipe);
	Vue.component(SwipeItem.name, SwipeItem);
	//底部导航
	Vue.component(Tabbar.name, Tabbar);
	Vue.component(TabItem.name, TabItem);
		
}