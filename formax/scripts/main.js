
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
				var bannerC=$("li",".banner_content");
				var bannerB=$("div",".banner_btn");
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
					i=(i+1)%6;
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
			
			
			(function(){
				var conCerCon=$(".container_certificate_content");
				var conCerBtn=$("li",".container_certificate_btn");
				conCerBtn[1].style.opacity=0.3;
				conCerBtn[0].style.opacity=1;
				conCerBtn.each(function(i){
					$(this).bind("click",function(){
						if(conCerBtn.index($(this))==1){
							conCerCon.animate({marginLeft:"-1240px"},1000);
							conCerBtn[0].style.opacity=0.3;
							conCerBtn[1].style.opacity=1;
						}else if(conCerBtn.index($(this))==0){
							conCerCon.animate({marginLeft:"0px"},1000);
							conCerBtn[1].style.opacity=0.3;
							conCerBtn[0].style.opacity=1;
						};
					});
				});
			})();
			
			
			(function(){
				var mediaL=$("li",".bgc_media_left");
				var mediaR=$("li",".bgc_media_right");
				mediaL.each(function(i){
					$(this).bind("mouseenter",function(){
						$(this).css({backgroundColor:"#333"});
						mediaR[i].style.display="block";
						mediaL.each(function(j){
							if(j != i){
								mediaL[j].style.backgroundColor="white";
							};
						});
						mediaR.each(function(k){
							if(k != i){
								mediaR[k].style.display="none";
							};
						});
					})
				})
				
			})();
			

		}
	);
	
	
})($);