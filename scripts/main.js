

window.onload=function(){
	travelLogtrigger();
	carousel();
	weChatCodeTrigger();
	menuTrigger();
	researchDowm();
	hoisting();
	moivePlay();
}

/* 微信二维码淡入淡出效果 */
function weChatCodeTrigger(){
	var wechatTrigger=document.getElementById("wechat_trigger");
	var wechatCode=document.getElementById("wechat_code");
	/* 点击按钮次数 */
	var countValue=0;
	/* 将点击按钮次数处理为0和1 */
	var sum=function(){
		countValue+=1;
        countValue%=2;
	};
	/* 二维码不透明度 */
	var opaValue=0;
	/* 超时调用ID */
	var setTimeoutID=null;
	/* 二维码不透明度渐变处理 */
	var opacityGradual=function(){
		/* 二维码淡入 */
		if(countValue){
			/* 下一行是为了处理不兼容opacity属性的浏览器 */
            wechatCode.style.display="block";			
			if(opaValue<1){
				opaValue+=1/100;
			} else {
				opaValue=1;
				clearTimeout(setTimeoutID);
			};
		/* 二维码淡出 */	
	    } else {
			if(opaValue>0){
				opaValue-=1/100;
			} else {
				opaValue=0;
				/* 下一行是为了处理不兼容opacity属性的浏览器 */
				wechatCode.style.display="none";
				clearTimeout(setTimeoutID);
			};
	    };
		wechatCode.style.opacity=opaValue;
        /* 超时调用递归，模拟间歇调用 */		
        setTimeoutID=setTimeout(arguments.callee,20);			
	};	
	/* 事件处理程序 */
	var eventHandder=function(){
		sum();
        opacityGradual();		
	};
	/* 事件监听 */
	wechatTrigger.addEventListener("click",eventHandder);	
}



/* 我的足迹开关 */
function travelLogtrigger(){
    var travelLog=document.getElementById("my_travellog");
    var stepTrigger=document.getElementById("step_trigger");
    var h=0;
    var setIntervalID=null;
    function showHidden(i){
    	return function(){
    		if(h<(200-i/2)){
    			h=h+i;
    		} else {
    			clearInterval(setIntervalID);
    		};
    		travelLog.style.height=h+"px";
    	};
    };
    var showEventHandder=function(){
    	clearInterval(setIntervalID);
    	stepTrigger.setAttribute("style","border-bottom:3px solid red");
    	var show_trigger=showHidden(2);
    	setIntervalID=setInterval(show_trigger,5);
    };
    var hiddenEventHandder=function(){
    	clearInterval(setIntervalID);
    	stepTrigger.removeAttribute("style");	
    	var hidden_trigger=showHidden(-2);
    	setIntervalID=setInterval(hidden_trigger,5);
    };
    stepTrigger.addEventListener("mouseover",showEventHandder);
    travelLog.addEventListener("mouseover",showEventHandder);
    stepTrigger.addEventListener("mouseout",hiddenEventHandder);
    travelLog.addEventListener("mouseout",hiddenEventHandder);	
}

/* 向右滑出菜单开关 */
function menuTrigger(){
	var menuBtn=document.getElementById("menu-Icon");
	var menuContainer=document.getElementById("menu_Container");
	//var mobile=document.getElementById("mobile");
	var mobileBanner=document.getElementById("mobile_Banner"); 
    var mobileTop=document.getElementById("mobile_Top"); 
    //alert(mobileTop.style.marginLeft);  	
	var pageHeight=window.innerHeight;
	//alert(pageHeight);
	mobileBanner.style.height=(pageHeight-50)+"px";	
	menuContainer.style.height=pageHeight+"px";	
	var triggerToLeft=0;
	var countValue=0;
	var setTimeoutID=null;
	var sum=function(){
		countValue++;
        countValue%=2;		
	}
	var eventHandder=function(){
		sum();
		(function(){
		    if(countValue){			
			    if(triggerToLeft<200){
				    triggerToLeft++;
			    } else {
				    triggerToLeft=200;
				    clearTimeout(setTimeoutID);
			    };
		    } else {
			    if(triggerToLeft>0){
				    triggerToLeft--;
			    } else {
				    triggerToLeft=0;
				    clearTimeout(setTimeoutID);
			    };
		    };
		mobileTop.style.marginLeft=-triggerToLeft+"px";
		mobileBanner.style.marginLeft=-triggerToLeft+"px";
		menuContainer.style.marginTop=-pageHeight+"px";
		menuContainer.style.width=triggerToLeft+"px";
		setTimeoutID=setTimeout(arguments.callee,10);			
		})();
	}
	menuBtn.addEventListener("click",eventHandder);
};

/* 移动搜索框触发 */
function researchDowm(){
	var researchTrigger=document.getElementById("research_icon");
	var researchBox=document.getElementById("search_box");
	var countValue=0;
	var sum=function(){
		countValue++;
		countValue%=2;
	};
	//var toopacity=0;
	var eventHandder=function(){
		sum();
		if(countValue){
			researchBox.style.display="block";
		} else {
			researchBox.style.display="none";
		};
	};
	researchTrigger.addEventListener("click",eventHandder);
};

/* 图片轮播效果 */
function carousel(){
	var unorder=document.getElementById("unorder");
	var unorderList=unorder.children;
	var prevArrow=document.getElementById("prevArrow");
	var nextArrow=document.getElementById("nextArrow");
	var btnOn=document.getElementById("btnOn");
	var btnOnChildren=btnOn.getElementsByTagName("img");
	/* 箭头点击事件发生的总次数 */
    var totalValue=0;
	/* 点击左箭头总数减少，点击右箭头总数增加 */
    var sum=function(speed){
		totalValue+=speed;
		if(totalValue<0){
			totalValue+=unorderList.length;
		} else if(totalValue>=unorderList.length){
			totalValue-=unorderList.length;
		}; 
	};
	/* 图片索引数 */
	var lowerValue=0;
	/* 图片列表选择方法 */
	var chooseList=function(blockIndex){
		for(var i=0;i<unorderList.length;i++){
			if(blockIndex===i){
		 	unorderList[i].style.display="block";
			btnOnChildren[i].style.opacity=1.0;
		    } else {
		 	unorderList[i].style.display="none";
			btnOnChildren[i].style.opacity=0.3;			
			};
	    };
	};
	/* 左右箭头事件处理程序 */
    var eventHandder=function(speedpara){
		return function(){
			sum(speedpara);
		    lowerValue=totalValue%unorderList.length;
		    chooseList(lowerValue);
		};		
	};
	/* 左右箭头事件监听 */
    prevArrow.addEventListener("click",eventHandder(-1));
    nextArrow.addEventListener("click",eventHandder(1));
	/* 小圆点按钮事件监听，此处可以尝试抽象化 */
	btnOnChildren[0].addEventListener("click",function(){
		chooseList(0);	
		});	
	btnOnChildren[1].addEventListener("click",function(){
		chooseList(1);	
		});	
	btnOnChildren[2].addEventListener("click",function(){
		chooseList(2);	
		});
	/* 图片自动轮播 */	
    var loopCycle=function(){
		eventHandder(1)();
		setTimeout(arguments.callee,10000);
	}		
    setTimeout(loopCycle,10000);		
};

/* 向上连续轮播 */
function hoisting(){
	var oul=document.getElementById("hoist_lists");
	var oli=oul.getElementsByTagName("li");
	var toTop=0;
    var setID=null;
	var hoistOneStep=function(){
		if(toTop<oli[0].offsetHeight){
			/* 滑动速度 */
			toTop+=1;
		} else {
			/* 取消循环 */
			clearInterval(setID);
			/* 重置外边距 */
			toTop=0;
			/* 取得第一列 */
			var separate=oul.getElementsByTagName("li")[0];
			/* 移除第一列 */
			oul.removeChild(separate);
			/* 在列表最后插入第一列 */
			oul.appendChild(separate);
			/* 延时启动下一次循环 */
			setTimeout(timer,3000);			
		};
        /* 设置列表外边距 */
		oul.style.marginTop=-toTop+"px";
	};
	/* 定时器 */
    var timer=function(){
		setID=setInterval(hoistOneStep,20);
	}; 
	/* 启动定时器 */
    timer();		
};

/* 视频与图片二选一 */
function moivePlay(){
	var pictureSpace=document.getElementById("little_moive");
	var moiveSpace=pictureSpace.getElementsByTagName("video")[0];
	var countValue=0;
	var sum=function(){
		countValue++;
		countValue%=2;
	};	
	pictureSpace.addEventListener("click",function(){
		sum();
		if(countValue){
			/* 视频占位显示 */
			moiveSpace.style.visibility="visible";
		} else {
			/* 视频占位隐藏 */
			moiveSpace.style.visibility="hidden";
		};		
	});
};
