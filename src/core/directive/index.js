export default (Vue)=>{
	Vue.directive("fileUpload",(el, binding, vnode, oldVnode)=>{
	   var data=binding.value;//拿到了组件传过来的参数
		 createNode(data) 
		 function createNode(data) {
			 var node = document.createElement("input");
			 node.type = "file";
			 node.accept = " image/jpeg, image/png, image/jpg";
			
			 node.multiple = data.multiple ? "multiple" : "";
			 node.style.display = "none";
			 el.prepend(node);
			
			 el.onclick = function() {
			   el.children[0].click();
			 }
		   }
		  //告一段落
		  //当file文件表单内容发生变化
		  //选中 button>input_file表单
		   var inputFile = el.children[0];
	  
		inputFile.onchange = function(event) {
				 //当用户上传图片了,拿到事件对象
			 var event = event || window.event;
				// 在事件对象下面去求  file文件对象
			 var file=event.target.files[0]
			 
			 //去调用当前组件组件里面 
			 var fn=data.fn; //fileUpload
			//  vnode.context.fileUpload(window.URL.createObjectURL(file))
			 vnode.context[fn](window.URL.createObjectURL(file))
		   }
	  })

	  Vue.directive("fileUploadTest",(el, binding, vnode, oldVnode)=>{
		var data=binding.value;//拿到了组件传过来的参数
		  createNode(data) 
		  function createNode(data) {
			  var node = document.createElement("input");
			  node.type = "file";
			  node.accept = " image/jpeg, image/png, image/jpg";
			 
			  node.multiple = data.multiple ? "multiple" : "";
			  node.style.display = "none";
			  el.prepend(node);
			 
			  el.onclick = function() {
				el.children[0].click();
			  }
			}
		   //告一段落
		   //当file文件表单内容发生变化
		   //选中 button>input_file表单
			var inputFile = el.children[0];
	   
		 inputFile.onchange = function(event) {
				  //当用户上传图片了,拿到事件对象
			  var event = event || window.event;
				 // 在事件对象下面去求  file文件对象
			  var file=event.target.files;
			  
			  //去调用当前组件组件里面 
			  var fn=data.fn; //fileUpload
			//   vnode.context.fileUpload(window.URL.createObjectURL(file))
			  vnode.context[fn](file)
			}
	   })
	
}
