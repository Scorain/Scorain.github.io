
(function($){
	$(document).ready(
	    function(){


		
			(function(){
			    var navLi=$("li.header_tri","nav");
			    var asistantList=$(".assistantList");	
                navLi.each(function(i){
					$(this).hover(function(){
						asistantList[i].style.display="block";
					},function(){
						asistantList[i].style.display="none";
					});
				});
				asistantList.each(function(i){
					$(this).hover(function(){
						$(this).show();
					},function(){
						$(this).hide();
					});
				});				
			})();
			
			
			(function(){
				var bannerC=$("li",".banRe_con");
				var bannerB=$("div",".banRe_btn");
				var i=0;
				var timeoutId=null;
				var cycle=function(){
					bannerC[i].style.display="block";
					bannerB[i].style.backgroundColor="white";
					bannerC.each(function(j){
						if(j != i){
							bannerC[j].style.display="none";
							bannerB[j].style.backgroundColor="#333333";
						};
					});
					i=(i+1)%bannerC.length;
					timeoutId=setTimeout(arguments.callee,5000);
				};
				cycle();
				bannerB.each(function(m){
					$(this).bind("click",function(){
						clearTimeout(timeoutId);
						i=bannerB.index($(this));
						cycle();
					});
				});
			})();

			

		}
	);
	
	
})($);