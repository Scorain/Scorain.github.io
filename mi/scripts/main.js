
window.onload=function(){	
	MI.categoryList();		
	MI.navList();
	MI.bannerApi.topPart();
	MI.bannerApi.bottomPart();
	MI.hover();
};

var MI={};
MI.categoryList=function(){
	var categoryOul=document.getElementsByClassName("nav-left-btn")[0];
	var category=categoryOul.getElementsByTagName("li");
	var categoryDiv=document.getElementsByClassName("leftlist_div_list");	
	for(var i=0;i<categoryDiv.length;i++){
		category[i].onmouseover=(function(i){
			 return function(){
				categoryDiv[i].style.display="block";
			};		
		})(i);
		category[i].onmouseout=(function(i){
			 return function(){
				categoryDiv[i].style.display="none";
			};		
		})(i);
		categoryDiv[i].onmouseover=(function(i){
			 return function(){
				categoryDiv[i].style.display="block";
			};		
		})(i);
		categoryDiv[i].onmouseout=(function(i){
			 return function(){
				categoryDiv[i].style.display="none";
			};		
		})(i);
	};
};
MI.navList=function(){
	var oulTri=document.getElementsByClassName("nav-top-list")[0];
	var oliTri=oulTri.getElementsByTagName("li");
	var oliShow=document.getElementsByClassName("toplist-div");	
	for(var i=0;i<oliShow.length;i++){	
		trigger(oliShow[i],oliTri[i]).toggleHeight(0,230,10,33);
	};	
};
MI.bannerApi={
	topPart:function(){
		var oul=document.getElementsByClassName("nav-middle-oul")[0];
	    var choul=document.getElementsByClassName("nav-banner-btn")[0];
		//alert(oul);
		bannerApi(oul,choul).cycL(1225,49,33,5000);
	    bannerApi(oul,choul).choR(290,10,33);
	},
	bottomPart:function(){
	    var oul=document.getElementsByClassName("main-content-oul");
	    var choul=document.getElementsByClassName("main-content-choul");
	    var pnul=document.getElementsByClassName("main-content-pnul");
	    for(var i=0;i<oul.length;i++){
	      bannerApi(oul[i],choul[i],pnul[i]).lrR(290,10,33);
	      bannerApi(oul[i],choul[i],pnul[i]).choR(290,10,33);	
	    };	
	}	
};
MI.hover=function(){
	var innerObj=document.getElementsByClassName("inner");
	var outerObj=document.getElementsByClassName("outer");
	var innerObjL=document.getElementsByClassName("nav-bottom-left-inner");
	//alert(innerObjL.offsetHeight);
	var outerObjL=document.getElementsByClassName("nav-bottom-left-outer");
	for(var j=0;j<innerObjL.length;j++){
		hover(innerObjL[j],outerObjL[j]);
	};
	
	for(var i=0;i<innerObj.length;i++){
			hover(innerObj[i],outerObj[i]);
	};			
};


