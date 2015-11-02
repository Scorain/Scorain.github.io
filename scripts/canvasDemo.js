
/* function getElementLeft(element){
	var actualLeft=element.offsetLeft;
	var current=element.offsetParent;
	while(current !=null){
		actualLeft+=current.offsetLeft;
		current=current.offsetParent;
	};
	return actualLeft;
};
function getElementTop(element){
	var actualTop=element.offsetTop;
	var current=element.offsetParent;
	while(current !=null){
		actualTop+=current.offsetTop;
		current=current.offsetParent;
	};
	return actualTop;
}; */


/* 取色器效果实现函数 */
function getCol(){
	var getColorCan=document.getElementsByClassName("canvas_body")[0];
	var getColor=getColorCan.getContext("2d");	
	var offsetP=document.getElementsByClassName("canvas_content")[0];
	
	var r=0,g=0,b=0;
	var image=new Image();
	image.src="images/color.jpg";
	getColor.drawImage(image,0,0,231,232,0,0,400,400);
	getColorCan.onclick=function(e){
		var x=Math.floor(e.pageX-getColorCan.offsetLeft-offsetP.offsetLeft);
		var y=Math.floor(e.pageY-getColorCan.offsetTop-offsetP.offsetTop);
		var imageData=getColor.getImageData(x,y,1,1);
		var pixel=imageData.data;
		r=pixel[0];
		g=pixel[1];
		b=pixel[2];
        clickResponse();		
	};
		
	var colorDiv=document.getElementsByClassName("color_value");
	var colorValue=colorDiv[0].getElementsByTagName("span");
	var lastCV=document.getElementsByClassName("last_cv");
    var colorShow=document.getElementById("show_div");
    var colorChart=document.getElementById("color_chart");
	var chart=colorChart.getContext("2d");
	
	chart.strokeStyle="black";
	chart.lineWidth=1;
	chart.beginPath();
	chart.moveTo(5,205);
	chart.lineTo(205,205);
		
	chart.moveTo(5,205);
	chart.lineTo(5,5);
	chart.stroke();
		
	var clickResponse=function(){
		colorValue[0].innerText=r;
        colorValue[1].innerText=g;
        colorValue[2].innerText=b;
	    lastCV[0].innerText="rgb("+r+","+g+","+b+")";		
		
		colorShow.style.backgroundColor="rgb("+r+","+g+","+b+")";
		
		chart.clearRect(5,5,200,200);
				
		chart.beginPath();
		chart.lineWidth=40;
		chart.strokeStyle="blue";
		chart.save();
		chart.strokeStyle="green";
	    chart.save();
	    chart.strokeStyle="red";
		
		chart.beginPath();
	    chart.moveTo(45,205);
	    chart.lineTo(45,(205-r*200/255));
		chart.stroke();
		chart.closePath();
		
		chart.restore();
		chart.beginPath();		
	    chart.moveTo(105,205);
	    chart.lineTo(105,(205-g*200/255));
		chart.stroke();
		chart.closePath();
				
		chart.restore();
		chart.beginPath();
		chart.strokeStyle="blue";
	    chart.moveTo(165,205);
	    chart.lineTo(165,(205-b*200/255));
		chart.stroke();
		chart.closePath();		
	};    	
};
/* 手绘台效果实现函数 */
function drawPic(){	
	var drawPicCan=document.getElementsByClassName("canvas_body")[1];
	var drawPicture=drawPicCan.getContext("2d");
	var offsetP=document.getElementsByClassName("canvas_content")[0];
	var oul=document.getElementsByClassName("set_lists");
	var oliColor=oul[0].getElementsByTagName("li");
	var oliWeight=oul[1].getElementsByTagName("li");
	var clearButton=document.getElementById("clear_button");
	/*var showButton=document.getElementById("show_button");*/
	var setColor=["black","red","blue","green","orange","grey"];
	var setWeight=[1,2,5,10,15,20];
	for(var i=0;i<oliColor.length;i++){
		oliColor[i].onclick=(function(i){
			return function(){
			    oliColor[i].style.backgroundColor="red";
				for(var m=0;m<oliColor.length;m++){
					if(m!=i){
						oliColor[m].style.backgroundColor="rgb(144,144,144)";
					};
				};
			    drawPicture.strokeStyle=setColor[i];
		    };
		})(i);
	};
	for(var j=0;j<oliWeight.length;j++){
		oliWeight[j].onclick=(function(i){
			return function(){
			    oliWeight[i].style.backgroundColor="red";
				for(var m=0;m<oliWeight.length;m++){
					if(m!=i){
						oliWeight[m].style.backgroundColor="rgb(144,144,144)";
					};
				};
			    drawPicture.lineWidth=setWeight[i];
		    };
		})(j);
	};
	drawPicture.clearRect(0,0,400,400);
	document.onmousedown=function(e){
		var x=e.pageX-drawPicCan.offsetLeft-offsetP.offsetLeft;
		var y=e.pageY-drawPicCan.offsetTop-offsetP.offsetTop;
		drawPicture.beginPath();
		drawPicture.moveTo(x,y);
		document.onmousemove=function(e){
			var x=e.pageX-drawPicCan.offsetLeft-offsetP.offsetLeft;
		    var y=e.pageY-drawPicCan.offsetTop-offsetP.offsetTop;
			drawPicture.lineTo(x,y);
			drawPicture.stroke();
		};
	};
	document.onmouseup=function(){
		drawPicture.closePath();
		document.onmousemove=null;
	};
	clearButton.onclick=function(){
        drawPicture.clearRect(0,0,400,400);
	};
	/*var dataURL=drawPicCan.toDataURL("image/png");   	
	showButton.onclick=function(){
		var img=document.createElement("img");
		img.src=dataURL;
		img.setAttribute("class","dataURL_img");
		document.getElementsByClassName("control_disp")[1].appendChild(img);
	};*/	
};
/* 取色器与手绘台切换实现函数 */
(function(){
	var chooseCanvas=document.getElementsByClassName("choice_canvas")[0];
	var oliChoose=chooseCanvas.getElementsByTagName("li");
	var controlDisp=document.getElementsByClassName("control_disp");
	var canvasBody=document.getElementsByClassName("canvas_body");
	function init(){
		controlDisp[1].style.display="block";
		controlDisp[0].style.display="none";
		canvasBody[1].style.display="block";
		canvasBody[0].style.display="none";
		drawPic();
	};
	init();
	oliChoose[0].onclick=init;
	oliChoose[1].onclick=function(){
		controlDisp[0].style.display="block";
		controlDisp[1].style.display="none";
		canvasBody[0].style.display="block";
		canvasBody[1].style.display="none";
		getCol();
	};
})();
/* canvas窗帘效果实现函数 */
(function(){
	var canvasWin=document.getElementById("canvas_win");
	var totalValue=0;
	var sum=function(){
		totalValue+=1;
		totalValue%=2;
	};
	canvasWin.onclick=function(){
		sum();
		if(totalValue){
			canvasWin.style.marginLeft="98%";
		}else{
			canvasWin.style.marginLeft="0%";
		};
	};
})();
