var aqi={};

//给string类型重写strim方法去掉包括全角空格的所有空白符
String.prototype.trim=function(){
	return this.replace(/^(\s|\u00A0)+/,"").replace(/(\s|\u00A0)+$/,"");
}


/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
 function addAqiData(){
	 var city_input=document.getElementById("aqi-city-input").value.trim();
     var value_input=document.getElementById("aqi-value-input").value.trim();
	 if(city_input==""){
		 alert("城市名称不能为空!");
		 document.getElementById("aqi-city-input").focus();
		 return;
		 console.log("abc");
	 }else{
		 var reg1=/^[a-zA-Z\u4e00-\u9fa5]+$/;
		 if(!reg1.test(city_input)){
			alert("城市名称必须为中英文字符!");
			 document.getElementById("aqi-city-input").focus();
			 return;
		 }
	 }
	  if(value_input==""){
		  alert("空气质量指数不能为空!");
		  document.getElementById("aqi-value-input").fucus();
		  return;
	  }else{
		  var reg2=/^\d+$/;
		  if(!reg2.test(value_input)){
			  alert("空气质量指数必须为整数");
			  document.getElementById("aiq-value-input").focus();
			  return;
		  }
	  }
	  //将空气质量指数存入aqiData
	  aqiData[city_input]=value_input;
 }
 
 
   //渲染aqi-table表格
   function renderAqiList(){
	   var tr='<tr><td>'+'城市'+'</td><td>'+'空气质量指数'+'</td><td>'+'操作'+'</td></tr>';
	   for(var city in aqiData){
		   tr+='<tr><td>'+city+'</td><td>'+aqiData[city]+"</td><td><button class='del' type='button'>删除</button></td></tr>";
	   }
	   document.getElementById("aqi-table").innerHTML=tr;
	   
   }
  /**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
   function  addBtnHandle(){
	   addAqiData();
	   renderAqiList();  
   }
   
/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
   function delBtnHandle(city){
	   delete aqiData[city];
	   renderAqiList();
   }
   function init(){
	   document.getElementById("add-btn").addEventListener("click",addBtnHandle);
	   document.getElementById("aqi-table").addEventListener("click",function(e){
		 if(e.target.className.indexOf('del') > -1){
  		var vCity=e.target.parentNode.previousSibling.previousSibling.firstChild.nodeValue;
  		delBtnHandle(vCity);
  	}
	   
   });
  }
 
    window.onload=function(){
	init();
}
   
