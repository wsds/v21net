function DynamicLoad()
{
	//属性
	var Self = this; //对象自身
	
	//功能：加载指定的文件
	//参数：src——需要被加载的文件
	//返回：（无）
	var callbackFunction;
	this.Load = function (src, callbackFunction)
	{
			this.callbackFunction=callbackFunction;
			var objDynamic; //动态创建的对象
			
			objDynamic = document.createElement("script");
			objDynamic.src = src;
			objDynamic.type = "text/javascript";
			objDynamic.language = "javascript";

			document.getElementsByTagName("head")[0].appendChild(objDynamic); //将创建的对象插入到HEAD节中
			objDynamic.onload = objDynamic.onreadystatechange = function () //加载过程中状态改变引发的事件
			{
				//在此函数中this指针指的是s结点对象，而不是JsLoader实例，
				//所以必须用self来调用onsuccess事件，下同。
				if (this.readyState && this.readyState == "loading")
					return;
				else
					Self.OnLoaded(src);
			};
			objDynamic.onerror = function () //加载过程中发生错误引发的事件
			{
				document.getElementsByTagName("head")[0].removeChild(objDynamic);
				Self.OnFailed(src);
			};
		
	};

	this.OnLoaded = function (src)
	{
		//result obtained by server's javascript auto excution
		this.callbackFunction(result);
	};

	this.OnFailed = function (src)
	{
		result={"failed":"unable connect to server!"};
		this.callbackFunction(result);
	};

}


//DynamicLoad
// d.Load("http://127.0.0.1:8061/api2/test/1", function (result) {alert(JSON.stringify(result));});