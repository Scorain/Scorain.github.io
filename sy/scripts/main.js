

//时钟
(function clock(){
	var canvas=document.getElementById("myClock");
	if(canvas.getContext){
//		alert("hello")
    var ctx=canvas.getContext("2d");
    function drawClock(){
		var d=new Date();
//		alert(d);
        var h=d.getHours();
		var m=d.getMinutes();
		var s=d.getSeconds();
		h=(h>12)?(h-12):h;
		h=h+m/60;
//			alert(s);	
//清理画布	
   ctx.clearRect(0,0,canvas.width,canvas.height);	
//大圈	
	ctx.strokeStyle="#00FFFF";
	ctx.lineWidth=3;
	ctx.beginPath();
	ctx.arc(50,50,45,0,Math.PI*2,true);
	ctx.closePath();
	ctx.stroke();
//时钟刻度	
	for(i=0;i<12;i++){
		ctx.save();
		ctx.translate(50,50);
		ctx.rotate(i*30*Math.PI/180);
		ctx.strokeStyle="#000FFF"
		ctx.beginPath();
		ctx.lineWidth=3;
		ctx.moveTo(0,-38.5);
		ctx.lineTo(0,-43.5);
		ctx.closePath();
		ctx.stroke();	
		ctx.restore();
	}
//分钟刻度	
    for(i=0;i<60;i++){
		ctx.save();
		ctx.strokeStyle="#0FFFFF";
		ctx.lineWidth=2;
		ctx.translate(50,50);
		ctx.rotate(6*i*Math.PI/180);
		ctx.beginPath();
		ctx.moveTo(0,-43.5);
		ctx.lineTo(0,-41);
		ctx.closePath();
		ctx.stroke();
		ctx.restore();		
		}
//时针		
   ctx.save();
   ctx.strokeStyle="#00EEFF";
   ctx.lineWidth=3;
   ctx.translate(50,50);
   ctx.rotate(h*30*Math.PI/180);
   ctx.beginPath();
   ctx.moveTo(0,4);
   ctx.lineTo(0,-15);
   ctx.closePath();
   ctx.stroke();
   ctx.restore();
//分针 	
   ctx.save();
   ctx.strokeStyle="#FFFE00";
   ctx.lineWidth=2;
   ctx.translate(50,50);
   ctx.rotate(m*6*Math.PI/180);
   ctx.beginPath();
   ctx.moveTo(0,4);
   ctx.lineTo(0,-22.5);
   ctx.closePath();
   ctx.stroke();
   ctx.restore();
 //秒针  
   ctx.save();
   ctx.strokeStyle="#FFEEEE";
   ctx.lineWidth=1;
   ctx.translate(50,50);
   ctx.rotate(s*6*Math.PI/180);
   ctx.beginPath();
   ctx.moveTo(0,4);
   ctx.lineTo(0,-30);
   ctx.closePath();
   ctx.stroke();
   ctx.restore();	
//中心小圆圈  
   ctx.save();
   ctx.beginPath();
   ctx.fillStyle="#F000F0";
   ctx.arc(50,50,2.5,0,Math.PI*2,true)
   ctx.closePath();
   ctx.fill();
   ctx.restore();
//阿拉伯时间   
   ctx.save();
   ctx.font="16px 微软雅黑";
   ctx.textAlign="center";
   ctx.textBaseline="middle";
   ctx.fillStyle="white";
   h=d.getHours();
   var str0=h>=10?h:("0"+h);
   var str1=m>=10?m:("0"+m);
   var str=str0+":"+str1;
   ctx.fillText(str,50,25);
   ctx.restore();  
		};			
   drawClock();
 //计时器  	
   setInterval(drawClock,1000);			
		}
})();