window.onload=function(){
	previewChange();
    messageChange();
    skillChange();
    bannerCycle();
    hoistsCarousel();
    scaleTirgger();	
	wechatChange();
};
 
/*     复用demo函数：change(obj),trigger(obj1,obj2),carousel(obj)    开始      */
function change(obj){
	var graduateValue=0;
	var sum=function(speed){
		graduateValue+=speed;
	};
	var perporty=function(method){
		switch(method){
			case "changeHeight":
				obj.style.height=graduateValue+"px";
				break;
			case "changeWidth":
				obj.style.width=graduateValue+"px";
				break;
			case "changeOpacity":
				obj.style.opacity=graduateValue;
				break;	
            case "changeMarginLeft":
				obj.style.marginLeft=graduateValue+"px";
				break;
            case "changeMarginTop":
				obj.style.marginTop=graduateValue+"px";
				break;	
            case "changeRotate":	
                obj.style.transform="rotate("+graduateValue+"deg)";
				break;			
		}
	};
	var dealProgress=function(method){
	    return function(Fparas,Lparas,granularity,frequentness){
			graduateValue=Fparas;
			if(graduateValue<Lparas){
				(function(){
				    sum(granularity);
				    if(graduateValue<Lparas){
					    perporty(method);
					    setTimeout(arguments.callee,frequentness);
				    } else {
					    graduateValue=Lparas;
					    perporty(method);
				    };
				})();
			} else if(graduateValue>Lparas){
				(function(){
				    sum(-granularity);
				    if(graduateValue>Lparas){
				    	perporty(method);
				    	setTimeout(arguments.callee,frequentness);
				    } else {
				    	graduateValue=Lparas;
				        perporty(method);
				    };
			    })();
		    };
	    };
	};	
	return {
		changeHeight:dealProgress("changeHeight"),
		changeWidth:dealProgress("changeWidth"),
		changeOpacity:dealProgress("changeOpacity"),
		changeMarginLeft:dealProgress("changeMarginLeft"),
		changeMarginTop:dealProgress("changeMarginTop"),
        changeRotate:dealProgress("changeRotate")		
	};
};
function trigger(obj1,obj2){
	var gradualValue=0;
	var sum=function(speed){
		gradualValue+=speed;
	};
	var timeroverID=null;
	var timeroutID=null;
	var property=function(method){
		switch(method){
			case "toggleWidth":
				obj1.style.width=gradualValue+"px";
				break;
			case "toggleHeight":
				obj1.style.height=gradualValue+"px";
				break;
			case "toggleMarginLeft":
				obj1.style.marginLeft=gradualValue+"px";
				break;
            case "toggleMarginTop":
				obj1.style.marginTop=gradualValue+"px";
				break;
			case "toggleOpacity":
				obj1.style.opacity=gradualValue;
				break;	
            case "toggle_Opacity":
				obj1.style.opacity=1-gradualValue;
				break;
            case "toggleRotate":
				obj1.style.transform="rotate("+gradualValue+"deg)";
				break;				
            case "toggleScale":
				obj1.style.transform="scale("+gradualValue+")";
				break;								
		};		
	};
    var overProgress=function(Fparas,Lparas,granularity,frequentness,method){
		return function(){
			clearTimeout(timeroutID);
		    (function(){
			    if(gradualValue<Lparas){
			        sum(granularity);
			        property(method);
			        timeroverID=setTimeout(arguments.callee,frequentness);
		        } else {
			    	gradualValue=Lparas;
			    	property(method);
			    };
		    }());
        };		
	};	
	var outProgress=function(Fparas,Lparas,granularity,frequentness,method){
		return function(){
			clearTimeout(timeroverID);
			(function(){
				if(gradualValue>Fparas){
				    sum(-granularity);
				    property(method);
				    timeroutID=setTimeout(arguments.callee,frequentness);
			    } else {
			    	gradualValue=Fparas;
			    	property(method);
			    };
			}());			
		};
	};
	var toggleProgress=function(method){
		return function(Fparas,Lparas,granularity,frequentness){
		    gradualValue=Fparas;
		    obj2.onmouseover=overProgress(Fparas,Lparas,granularity,frequentness,method);
	        obj2.onmouseout=outProgress(Fparas,Lparas,granularity,frequentness,method);
			obj1.onmouseover=overProgress(Fparas,Lparas,granularity,frequentness,method);
	        obj1.onmouseout=outProgress(Fparas,Lparas,granularity,frequentness,method);
		};
	};
	return {
		toggleWidth:toggleProgress("toggleWidth"),
		toggleHeight:toggleProgress("toggleHeight"),
		toggleMarginLeft:toggleProgress("toggleMarginLeft"),
		toggleMarginTop:toggleProgress("toggleMarginTop"),
		toggleOpacity:toggleProgress("toggleOpacity"),
		toggle_Opacity:toggleProgress("toggle_Opacity"),
		toggleRotate:toggleProgress("toggleRotate"),
		toggleScale:toggleProgress("toggleScale")		
	};	
};
function carousel(obj){
	var oli=obj.getElementsByTagName("li");
	var gradualValue=0;
	var setFloat=function(lr){
		if(lr){
			for(var i=0;i<oli.length;i++){				
			oli[i].style.float="left";
		    };
		};		    
	};
	var property=function(marginWhat,orient){
		if(marginWhat=="left"){
			obj.style.marginLeft=orient+gradualValue+"px";
		} else if(marginWhat=="top"){
			obj.style.marginTop=orient+gradualValue+"px";
		};
	};
	var setStep=function(marginWhat,orient,granularity){
		gradualValue+=granularity;
		property(marginWhat,orient);
	};
	var setSteps=function(steps,delayF,delay){
		if(steps){
		    setTimeout(delayF,delay);
		};
	};
    var ltProgress=function(lr,marginWhat,orient,steps){
	    return function(divDimension,granularity,frequentness,delay){
		    setFloat(lr);
			(function delayF(){
			    (function(){
		            if(gradualValue<divDimension){
			            setStep(marginWhat,orient,granularity);
						setTimeout(arguments.callee,frequentness);
		            } else {
			            gradualValue=divDimension;
			            property(marginWhat,orient);
				        var separate=obj.removeChild(oli[0]);
						gradualValue=0;
				        property(marginWhat,orient);
				        obj.appendChild(separate);
				        setSteps(steps,delayF,delay);
		            };
		        })();	
			})();		    			
	    };
	};
	var rbProgress=function(lr,marginWhat,orient,steps){
		return function(divDimension,granularity,frequentness,delay){
			setFloat(lr);
			(function delayF(){
				var separate=obj.removeChild(oli[(oli.length-1)]);
		        gradualValue=-divDimension;
		        property(marginWhat,orient);
		        obj.insertBefore(separate,oli[0]);
				(function(){
					if(gradualValue<0){
				        setStep(marginWhat,orient,granularity);
						setTimeout(arguments.callee,frequentness);
			        } else {
				        gradualValue=0;
				        property(marginWhat,orient);
				        setSteps(steps,delayF,delay);
			        };
				})();
			})();
		};		
	};	
	return {
		leftStep:ltProgress(1,"left","-",0),
		rightStep:rbProgress(1,"left","",0),
		topStep:ltProgress(0,"top","-",0),
		bottomStep:rbProgress(0,"top","",0),
		leftSteps:ltProgress(1,"left","-",1),
		rightSteps:rbProgress(1,"left","",1),
		topSteps:ltProgress(0,"top","-",1),
		bottomSteps:rbProgress(0,"top","",1)		
	};	
};
/*     复用demo函数：change(obj),trigger(obj1,obj2),carousel(obj)    结束     */

/* 微信，语言效果函数 */
function wechatChange(){
	var topTrigs=document.getElementsByClassName("top_trig");
	var topShows=document.getElementsByClassName("top_show");
	var langChoiUl=document.getElementsByClassName("lang_choi")[0];
	var langChoi=langChoiUl.getElementsByTagName("li");
	langChoi[0].onmouseover=function(){
		langChoi[0].style.backgroundColor="rgb(90,95,100)";
	};
	langChoi[1].onmouseover=function(){
		langChoi[1].style.backgroundColor="rgb(90,95,100)";
	};
	langChoi[0].onmouseout=function(){
		langChoi[0].style.backgroundColor="rgb(120,140,160)";
	};
	langChoi[1].onmouseout=function(){
		langChoi[1].style.backgroundColor="rgb(120,140,160)";
	};
	var showLists=function(i){
		var totalValue=0;
	    var sum=function(){
		    totalValue+=1;
		    totalValue%=2;
		};
        topTrigs[i].onclick=function(){
		    sum();
			if(totalValue){
			    change(topShows[i]).changeHeight(0,100,5,20);
			}else{
				change(topShows[i]).changeHeight(100,0,5,20);
		    };	
		};		
	};
	showLists(0);
	showLists(1);			
};
/* 我的足迹展开效果函数 */
function previewChange(){
	var previews=document.getElementsByClassName("preview_trigger");
	var contents=document.getElementsByClassName("preview_content");
    var stepBack=document.getElementsByClassName("step_back");	
	for(var i=0;i<previews.length;i++){
        previews[i].onclick=(function(j){
		    return function(){
				change(contents[j]).changeHeight(0,250,5,3);
				for(var m=0;m<previews.length;m++){
					if(m!=j){
						if(contents[m].style.height=="250px"){
							change(contents[m]).changeHeight(250,0,5,3);					
						};
					};
				};
				stepBack[j].onclick=function(){
			        change(contents[j]).changeHeight(250,0,5,3);
			    };
			};
	    })(i);
	};
};
/* 我的简历展开效果函数 */
function messageChange(){
    var messages=document.getElementsByClassName("outer_message");
 	for(var i=0;i<messages.length;i++){
        messages[i].onmouseenter=(function(j){
		    return function(){
				change(messages[j]).changeMarginTop(0,-160,2,5);
				for(var m=0;m<messages.length;m++){
					if(m!=j){
						if(messages[m].style.marginTop=="-160px"){
							change(messages[m]).changeMarginTop(-160,0,2,5);
						};
					};
				};
			};
	    })(i);
	}; 	
};
/* 我的技巧展开效果函数 */
function skillChange(){
	var skills=document.getElementsByClassName("skill_rotate");
  	for(var i=0;i<skills.length;i++){
        skills[i].onmouseenter=(function(j){
		    return function(){
				change(skills[j]).changeRotate(0,360,2,5);
				for(var m=0;m<skills.length;m++){
					if(m!=j){
						if(skills[m].style.transform=="rotate(360deg)"){
							change(skills[m]).changeRotate(360,0,2,5);
						};
					};
				};
			};
	    })(i);
	}; 	 
};
/* 横幅轮播效果函数 */
function bannerCycle(){
	var banCon=document.getElementsByClassName("banner_container");
	var prevArrow=document.getElementById("prevArrow");
	var nextArrow=document.getElementById("nextArrow");
	var btnOn=document.getElementById("btnOn");
	var btnOnChildren=btnOn.getElementsByTagName("img");
	var banText=document.getElementsByClassName("banner_text");
	var totalValue=0,lowerValue=0;
	var sum=function(speed){
		totalValue+=speed;
		if(totalValue<0){
			totalValue+=banCon.length;
		} else if(totalValue>=banCon.length){
			totalValue-=banCon.length;
		};
	};
	var chooseCon=function(blockIndex){
		change(banCon[blockIndex]).changeOpacity(0,1,0.01,5);
		setTimeout(function(){
			change(banText[blockIndex]).changeOpacity(0,1,0.01,10);
		},1000);
		btnOnChildren[blockIndex].style.opacity=1.0;
		for(var i=0;i<banCon.length;i++){
			if(i!=blockIndex){
			    if(banCon[i].style.opacity==1){
				    change(banCon[i]).changeOpacity(1,0,0.01,5);
					change(banText[i]).changeOpacity(1,0,0.01,5);
					btnOnChildren[i].style.opacity=0.3;
			    };			 					
			};
	    };
	};
	var eventHandder=function(speedpara){
		return function(){
			sum(speedpara);
		    lowerValue=totalValue%banCon.length;
		    chooseCon(lowerValue);
		};		
	};
	var loopCycle=function(){
		eventHandder(1)();
		setTimeout(arguments.callee,10000);
	};	
    (function(){
		for(var i=0;i<banCon.length;i++){
			banCon[i].style.opacity=0;	
			btnOnChildren[i].style.opacity=0.3;
		};
		change(banCon[0]).changeOpacity(0,1,0.04,10);
		setTimeout(function(){
			change(banText[0]).changeOpacity(0,1,0.01,10);
		},1000);
		btnOnChildren[0].style.opacity=1;
		setTimeout(loopCycle,10000);
	})();
    prevArrow.addEventListener("click",eventHandder(-1));
    nextArrow.addEventListener("click",eventHandder(1));
	prevArrow.addEventListener("mouseover",function(){
		change(prevArrow).changeOpacity(0,1,0.05,10);
	});
	prevArrow.addEventListener("mouseout",function(){
		change(prevArrow).changeOpacity(1,0,0.05,10);
	});
	nextArrow.addEventListener("mouseover",function(){
		change(nextArrow).changeOpacity(0,1,0.05,10);
	});
	nextArrow.addEventListener("mouseout",function(){
		change(nextArrow).changeOpacity(1,0,0.05,10);
	});
	btnOnChildren[0].addEventListener("click",function(){
		chooseCon(0);	
	});	
	btnOnChildren[1].addEventListener("click",function(){
		chooseCon(1);	
	});	
	btnOnChildren[2].addEventListener("click",function(){
		chooseCon(2);
	});		
};
/* 我去过哪里轮播展示 */
function hoistsCarousel(){
	var oul=document.getElementById("hoist_lists");
	var hoistSlibing=document.getElementById("hoist_slibing");
	var slibingLists=hoistSlibing.getElementsByTagName("li");
	setTimeout(function(){
		carousel(oul).topSteps(50,2,20,5000);
	},5000);
	slibingLists[1].addEventListener("click",function(){
		carousel(oul).topStep(50,2,20);
	});	
    slibingLists[0].addEventListener("click",function(){
		carousel(oul).bottomStep(50,2,20);
	});		
};
/* 图片放大效果函数 */
function scaleTirgger(){
	var pics=document.getElementsByClassName("tScale");
	for(var i=0;i<pics.length;i++){
		trigger(pics[i],pics[i]).toggleScale(1,1.1,0.002,20);
	};
};

