var board = document.getElementById("canvas");
var context = board.getContext("2d");
var lastPoint = {x:undefined,y:undefined}
fullScreen();
window.onresize = function(){
  fullScreen();
}
function fullScreen(){
  var pageWidth = document.documentElement.clientWidth;
  var pageHeight = document.documentElement.clientHeight;
  board.width = pageWidth;
  board.height = pageHeight;
}
function drawCircle(x,y,R){
  context.beginPath();
  context.arc(x, y, R, 0, 2 * Math.PI);
  context.fill();
}
var using = false;
//按下鼠标
board.onmousedown = function(a){
  var x = a.clientX;
  var y = a.clientY;
  if(eraserEnabled){
    using = true;
    context.clearRect(x-5,y-5,10,10);
  }else{
    using = true;
    drawCircle(x,y,1);
    lastPoint = {"x":x,"y":y}
  }
}
//动鼠标
board.onmousemove = function(a){
  var x = a.clientX;
  var y = a.clientY;
  if(eraserEnabled){
    if(using){
      context.clearRect(x-5,y-5,10,10);
    }
  }else{
    if(using){
      using = true;
      var newPoint = {"x":x,"y":y}
      drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
      lastPoint = newPoint;
    }else{
  
    }
  }
  }
//松开鼠标
board.onmouseup = function(a){
  using = false;
}
function drawLine(x1,y1,x2,y2){
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineWidth = 5;
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
}
var eraser = document.getElementById('eraser');
var eraserEnabled = false;
eraser.onclick = function(){
  eraserEnabled = !eraserEnabled;
}

