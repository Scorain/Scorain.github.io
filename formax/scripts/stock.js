
(function($){
	$(window).ready(
	    function(){
			
						
		    $(window).scroll(function(){
				//alert(document.documentElement.scrollTop);
				if(document.documentElement.scrollTop >= 850 ||
				  document.body.scrollTop >= 850){
					$(".value_animate1").addClass("animateBegin1");
					$(".value_animate2").addClass("animateBegin2");
					$(".value_animate3").addClass("animateBegin3");
					$(".value_animate4").addClass("animateBegin4");
					$(".value_animate5").addClass("animateBegin5");
				}else{
					$(".value_animate1").removeClass("animateBegin1");
					$(".value_animate2").removeClass("animateBegin2");
					$(".value_animate3").removeClass("animateBegin3");
					$(".value_animate4").removeClass("animateBegin4");
					$(".value_animate5").removeClass("animateBegin5");
				};
				
				if(document.documentElement.scrollTop >= 1500 ||
				  document.body.scrollTop >= 1500){
					$(".invest_animate1").addClass("investAB1");
					$(".invest_animate2").addClass("investAB2");
					$(".invest_animate3").addClass("investAB3");
					$(".invest_animate4").addClass("investAB4");
					$(".invest_peo").addClass("investAB5");
					$(".invest_hand").addClass("investAB6");
				}else{
					$(".invest_animate1").removeClass("investAB1");
					$(".invest_animate2").removeClass("investAB2");
					$(".invest_animate3").removeClass("investAB3");
					$(".invest_animate4").removeClass("investAB4");
					$(".invest_peo").removeClass("investAB5");
					$(".invest_hand").removeClass("investAB6");
				};
			});
			
			
			
			(function(){
				var titleLi=$("li",".advan_top");
				var contentLi=$("li",".advan_bottom");				
				contentLi.each(function(k){
					if(k == 0){
						$(this).css("left","0");
					};
				}); 				
				titleLi.each(function(i){
					$(this).click(function(){						
						for(var n=0;n<titleLi.length;n++){
							if(n == i){
								titleLi[n].style.color="blue";
							    titleLi[n].style.borderBottomColor="blue";
								$(".advan_top_pic")[n].style.backgroundPosition="-40px -"+40*n+"px";
							}else{
								titleLi[n].style.color="#999";
							    titleLi[n].style.borderBottomColor="grey";
								$(".advan_top_pic")[n].style.backgroundPosition="0px -"+40*n+"px";
							};
						};						
						contentLi.each(function(j){
							if(j==i){
								$(this).animate({left:"0px",opacity:1},1000,"swing");	
							}else{
								$(this).stop().css({left:"500px",opacity:0});
							};
						});
					})
				});
			})();
			
			
			
	    }
	);
	
})($);