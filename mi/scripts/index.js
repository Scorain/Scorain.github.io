
window.onload=function(){
	MI.categoryList();
	MI.navList();
}

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
	for(var i=0;i<oliTri.length;i++){
		trigger(oliShow[i],oliTri[i]).toggleHeight(0,230,10,33);
	};	
};




