
(function($){
	$(window).ready(function(){
		
		(function(){			
			var dom=$("span",".aftBan");
			var getJson=function(index){
				var _json={};
				_json.initial_val=0;
				_json.frequent=33;
				_json.final_val=parseFloat(dom[index].innerHTML);
				_json.speed=Math.ceil(_json.final_val/100);
				return _json
			};						
			var numberCopter=function(json,dom){
 	            (function(){
					json.initial_val+=json.speed;
	                if(json.initial_val<=json.final_val){	                    
	                    dom.innerHTML=json.initial_val;
	                    setTimeout(arguments.callee,json.frequent);
	                }else{
	                    dom.innerHTML=json.final_val;
	                };
	            })();		
            };
			for(var i=0;i<dom.length;i++){
			    numberCopter(getJson(i),dom.get(i));
		    };
		})();
		
		
		$(window).scroll(function(){
			//alert(document.documentElement.scrollTop);
			
			if(document.documentElement.scrollTop >= 150 ||
			  document.body.scrollTop >= 150){
				$(".p2p_toLeftA1").addClass("p2p_toLeftAnimate1");
			}else{
				$(".p2p_toLeftA1").removeClass("p2p_toLeftAnimate1");
			};
			
			if(document.documentElement.scrollTop >= 430 ||
			  document.body.scrollTop >= 430){
				$(".p2p_toLeftA2").addClass("p2p_toLeftAnimate2");
			}else{
				$(".p2p_toLeftA2").removeClass("p2p_toLeftAnimate2");
			};
			
			if(document.documentElement.scrollTop >= 780 ||
			  document.body.scrollTop >= 780){
				$(".coverA1").addClass("cover_div1");
				$(".coverA2").addClass("cover_div2");
				$(".coverA3").addClass("cover_div3");
			}else{
				$(".coverA1").removeClass("cover_div1");
				$(".coverA2").removeClass("cover_div2");
				$(".coverA3").removeClass("cover_div3");
			};
						
		});
		

		(function(){
			var triLi=$(".p2p_more_li");
			var showLi=$(".hover_show");
			triLi.each(function(i){
				$(this).hover(
				    function(){
						showLi.each(function(j){
							if(j == i){
								$(this).stop().animate({height:"120px"},300);
							};
						})
					},
					function(){
						showLi.each(function(k){
							if(k == i){
								$(this).stop().animate({height:"0px"},300);
							};
						})
					}
				);
			});
		})();
		
		
		
	});
})($);
