
var hover=function(innerObj,outerObj){

	/* 构建Inner类 */
	function Inner(obj){
		this.obj=obj;
	};
	/* Inner类获取鼠标所在区间的方法 */
	Inner.prototype.getMousePos=function(ev){
		var x=getOffsetLeft(this.obj)+this.obj.offsetWidth/2-ev.pageX;
		var y=getOffsetTop(this.obj)+this.obj.offsetHeight/2-ev.pageY;
		return Math.round((Math.atan2(y,x)*180/Math.PI+180)/90)%4;
	};
	/* 构建Outer类 */
	function Outer(obj){
		this.obj=obj;
		this.timer=null;
	};
	/* Outer类动画方法 */
	Outer.prototype.move=function(json,paras){
		var This=this;
		var start={};
		var dis={};
		for(var name in json){
			start[name]=parseFloat(getComputedStyle(this.obj,null)[name]);
			switch(name){
				case "left":
				    start[name]=this.obj.offsetLeft;
				break;
				case "top":
				    start[name]=this.obj.offsetTop;
				break;
			};
			
			dis[name]=json[name]-start[name];
		};
		var count=Math.round(paras[0]/paras[1]);
		var n=0;
		clearInterval(this.timer);
		this.timer=setInterval(function(){
			n++;
			for(var name in json){
				var cur=start[name]+dis[name]*n/count;
				This.obj.style[name]=cur+"px";
			};
			if(n==count){
				clearInterval(This.timer);
			};
		},paras[1]); 
	};
	/* 构建Glue类，把Inner和Outer联接起来 */
	function Glue(inner,outer){
		this.inner=inner;
		this.outer=outer;
	};
	/* 初始化Glue类,paras=[duringTimes,frequence] */
	Glue.prototype.init=function(paras){
		var This=this;
		this.inner.obj.onmouseenter=function(ev){
			var ev=ev||window.event;
			var zone=This.inner.getMousePos(ev);
			switch(zone){
				case 0:
				    This.outer.obj.style.left=this.offsetWidth+"px";
				    This.outer.obj.style.top="0px";
				break;
				case 1:
				    This.outer.obj.style.left="0px";
				    This.outer.obj.style.top=this.offsetHeight+"px";
				break;
				case 2:
				    This.outer.obj.style.left=-this.offsetWidth+"px";
				    This.outer.obj.style.top="0px";
				break;
				case 3:
				This.outer.obj.style.left="0px";
				This.outer.obj.style.top=-this.offsetHeight+"px";
				break;
			};
			This.outer.move({left:0,top:0},paras);
		};   
	    this.inner.obj.onmouseleave=function(ev){
			var ev=ev||window.event;
			var zone=This.inner.getMousePos(ev);
			switch(zone){
				case 0:
					This.outer.move({left:this.offsetWidth,top:0},paras);
				break;
				case 1:
					This.outer.move({left:0,top:this.offsetHeight},paras);
				break;
				case 2:
					This.outer.move({left:(-this.offsetWidth),top:0},paras);
				break;
				case 3:
				    This.outer.move({left:0,top:(-this.offsetHeight)},paras);
				break;
			};
		};  
	};
	/* offsetLeft兼容方法 */
	function getOffsetLeft(element){
		var actualLeft=element.offsetLeft;
		var current=element.offsetParent;
		while(current!==null){
			actualLeft+=current.offsetLeft;
			current=current.offsetParent;
		};
		return actualLeft;
	};
	/* offsetTop兼容方法 */
	function getOffsetTop(element){
		var actualTop=element.offsetTop;
		var current=element.offsetParent;
		while(current!==null){
			actualTop+=current.offsetTop;
			current=current.offsetParent;
		};
		return actualTop;
	};	
	
	return (new Glue(new Inner(innerObj),new Outer(outerObj))).init([300,1000/30]);
};	
