import request from "./http"
import param from "./params"
import mock from "@/mock/mock"

var url1="/json1811.ashx";
class Apls{
//首页轮播接口
	GetBannerList(data){
		return request({
			method:"get",
			url:url1,
			params:data
		})
	}
	//首页商品数据
	GetIndexCakeList() {
		return request({
		  method: "get",
		  url: url1,
		  params: {
			m: "GetIndexCakeList",
			param,
			c: "Index"
		  }
		})
	}
	//  3张图详情接口
	GetNSCakeByName(data) {
		return request({
		  method: "get",
		  url: url1,
		  params: {
			Name: data.Name,
			c: "NsCakeCenter",
			m: "GetNSCakeByName",
			param
		  }
		})
	  }
	// 商品详情接口
	GetCakeByName(data) {
	  return request({
		method: "get",
		url: url1,
		params: {
		  City:"上海" ,
		  ProName:data.ProName,
		  c: "Product",
		  m: "GetCakeByName",
		  param
		}
	  })
	}

	//分类数据接口
	GetJdListNew() {
		return request({
			method: "get",
			url: url1,
			params: {
				c: "NsCakeCenter",
				m: "GetJdListNew",
				param
      		}
		})
	}

	GetjzCakeInfo(data) {
		return request({
			method: "get",
			url: url1,
			params: {
				City: "上海",
				ProName: data.ProName,
				c: "IndexCenter",
				m: "GetjzCakeInfo",
				param
			}
		})
	}

	GetRuPCakeByName(data) {
		return request({
			method: "get",
			url: url1,
			params: {
				Name: data.Name,
				c: "NsCakeCenter",
				m: "GetRuPCakeByName",
				param
			}
		})
	}

	login(data) {
		return mock.post("/login", {
			data
		})
	}
	
	edit(data) {
		return mock.post("/test", {
			data
		})
	}


}


export default new Apls();