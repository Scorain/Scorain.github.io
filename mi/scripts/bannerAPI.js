
var bannerApi=function(oul,choul,pnul){
	var oli=oul.getElementsByTagName("li");
	if(choul){
		var choli=choul.getElementsByTagName("li");
	};	
	if(pnul){
		var lr=pnul.getElementsByTagName("li");
	};
	var gValue=0;
	var idLeft=null,idRight=null;
	var sum=function(speed){
	    gValue+=speed;
	};
	var toLeft=function(para,granularity,frequent,callback){
	    var separate=null;		
        (function(){
	        clearTimeout(idRight);
            if(gValue<para){
	            sum(granularity);
	            oul.style.marginLeft=-gValue+"px";
	            idLeft=setTimeout(arguments.callee,frequent);
            }else{
	            separate=oul.removeChild(oli[0]);
		        gValue=0;
	            oul.style.marginLeft=gValue+"px";
	            oul.appendChild(separate);
                if(callback){
			        callback();
			        };			
            };	
        })();		
    };
	var toRight=function(para,granularity,frequent,callback){
        var separate=oul.removeChild(oli[oli.length-1]);
        oul.insertBefore(separate,oli[0]);
        gValue=-para;
        oul.style.marginLeft=gValue+"px";		
        (function(){
	        clearTimeout(idLeft);
	        if(gValue<0){
		        sum(granularity);
		        oul.style.marginLeft=gValue+"px";
		        idRight=setTimeout(arguments.callee,frequent);
	        }else{
		        if(callback){
			        callback();
		        };
	        };
        })();		
    };
	var lrR=function(para,granularity,frequent){
		lr[0].addEventListener("click",function(){
            toRight(para,granularity,frequent);
        },false);
        lr[1].addEventListener("click",function(){
            toLeft(para,granularity,frequent);
        },false);
	};
	var choR=function(para,granularity,frequent){
		(function(){
    		for(var i=0;i<choli.length;i++){			
    			choli[i].onclick=(function(i){
    				return function(){
    					var minis=choli[i].index-oli[0].index;
    				    var f=function(n){
    						if(n>0){
    						    if(n==1){
    							    return null;
    						    }else if(n>=2){
    							    return function(){
    									toLeft(para,granularity*n,frequent,f(n-1));
    								};
    						    };							
    						}else if(n<0){
    							if(n==-1){
    							    return null;
    						    }else if(n<=-2){
    							    return function(){
    									toRight(para,granularity*(-n),frequent,f(n+1));
    								};
    						    };	
    						};
    					}; 
    					if(minis>0){
    						toLeft(para,granularity*minis,frequent,f(minis));
    					}else if(minis<0){
    						toRight(para,granularity*(-minis),frequent,f(minis));
    					};
    				};
    			})(i);			
    		};
    	})();
	};
	var cycL=function(para,granularity,frequent,delay){
		var timer=setTimeout(function(){
			toLeft(para,granularity,frequent);
			setTimeout(arguments.callee,delay);
		},delay);		
	};
	var cycR=function(para,granularity,frequent,delay){
		var timer=setTimeout(function(){
			toLeft(para,granularity,frequent);
			setTimeout(arguments.callee,delay);
		},delay);
	};
	(function(){
        for(var i=0;i<oli.length;i++){
            oli[i].index=i;
            choli[i].index=i;
        };
    })(); 
	return {
		lrR:function(para,granularity,frequent){
			lrR(para,granularity,frequent);
		},
		choR:function(para,granularity,frequent){
			choR(para,granularity,frequent);
		},
		cycL:function(para,granularity,frequent,delay){
			cycL(para,granularity,frequent,delay);
		},
		cycR:function(para,granularity,frequent,delay){
			cycR(para,granularity,frequent,delay);
		}
	};		
};
