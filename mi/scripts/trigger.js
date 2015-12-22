function trigger(obj1,obj2){
	var gradualValue=0;
	var sum=function(speed){
		gradualValue+=speed;
	};
	var timeroverID=null;
	var timeroutID=null;
	var property=function(method){
		switch(method){
			case "toggleHeight":
				obj1.style.height=gradualValue+"px";
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
		toggleHeight:toggleProgress("toggleHeight"),		
	};	
};

