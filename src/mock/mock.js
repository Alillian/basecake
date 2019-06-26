import axios from 'axios'
import MockAdapter from 'axios-mock-adapter';
import {userList} from './data/userList' 
import Store from "storejs";
import { Toast } from 'mint-ui';

let mock = new MockAdapter(axios);

mock.onPost('/test').reply(config => {
  // console.log(config.data);
  var reqdata = JSON.parse(config.data).data;
  // console.log(reqdata);
  if (reqdata.username=="") {
    return [200,{ code: -1,msg:"用户名不能为空"}]
  } else {
    userList.push(reqdata);
    Store.set("userList",userList);
    return [200,{ code: 1,msg:"注册成功",reqdata}];
  }
 
  
// 做一个数据效验
});




mock.onPost('/login').reply(config => {

    var reqdata=JSON.parse(config.data).data;
        // var bool=true;
      //  console.log(reqdata);
        //  console.log(userList);
        for(var i=0;i<userList.length;i++){
            if(userList[i].username==reqdata.uname){
              if (userList[i].password == reqdata.upwd) {

                    return [200,{ code: 1,data:userList[i],msg:"success"}];
                }else{
                    return [200,{ code: 2,msg:"密码错误"}];
                }
            }
        }
        return [200,{ code: 0,msg:"账号不存在"}];
        // console.log("OK")

});



// 例子
/*
  login(data){
    return mock.post("/login",{
      data: data
    })
  }
   login(data){
    return mock.get("/login",{
      params: data
    })
  }
*/
export default axios;	//注意暴露axios