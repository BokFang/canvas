var board = document.getElementById("canvas")
var context = board.getContext("2d")
autoCanvasSet(board)
userListening(board)
model(board)
var lineWidth = 5
function drawCircle(x,y,R){
  context.beginPath()
  context.arc(x, y, R, 0, 2 * Math.PI)
  context.fill()
}
function drawLine(x1,y1,x2,y2){
  context.beginPath()
  context.moveTo(x1, y1)
  context.lineWidth = lineWidth
  context.lineTo(x2, y2)
  context.stroke()
  context.closePath()
}
var using = false
var lastPoint = {x:undefined,y:undefined}
function userListening(board){
//特性检测
if(document.body.ontouchstart !== undefined){
  //触屏设备
  //按下屏幕
  document.body.style.overflow='hidden';  
  board.ontouchstart = function(a){
  var x = a.touches[0].clientX
  var y = a.touches[0].clientY
  using = true
  if(eraserEnabled){
    context.clearRect(x-5,y-5,10,10);
  }else{
    drawCircle(x,y,1)
    lastPoint = {"x":x,"y":y}
  }
}
//移动手指
board.ontouchmove = function(a){
  var x = a.touches[0].clientX
  var y = a.touches[0].clientY
  if(!using){ return }
  if(eraserEnabled){
    context.clearRect(x-5,y-5,10,10)
  }else{
    using = true
    var newPoint = {"x":x,"y":y}
    drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
    lastPoint = newPoint
  }
}
//松开手指
board.ontouchend = function(a){
  using = false
}
}else{
//非触屏设备
//按下鼠标
board.onmousedown = function(a){
  var x = a.clientX
  var y = a.clientY
  using = true
  if(eraserEnabled){
    context.clearRect(x-5,y-5,10,10)
  }else{
    drawCircle(x,y,1)
    lastPoint = {"x":x,"y":y}
  }
}
//动鼠标
board.onmousemove = function(a){
  var x = a.clientX
  var y = a.clientY
  if(!using){ return }
  if(eraserEnabled){
    context.clearRect(x-5,y-5,10,10)
  }else{
    using = true
    var newPoint = {"x":x,"y":y}
    drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
    lastPoint = newPoint
  }
}
//松开鼠标
board.onmouseup = function(a){
  using = false
}
}
}
var eraser = document.getElementById('eraser')
var eraserEnabled = false
eraser.onclick = function(){
  eraserEnabled = !eraserEnabled;
}
function autoCanvasSet(board){
  fullScreen()
window.onresize = function(){
  fullScreen()
}
function fullScreen(){
  var pageWidth = document.documentElement.clientWidth
  var pageHeight = document.documentElement.clientHeight
  board.width = pageWidth
  board.height = pageHeight
}
}
//工具选择
var pen = document.getElementById('pen')
var actions = document.getElementById('actions')
function model(board){
  window.onload = function(){
    eraser.onclick = function(){
      eraserEnabled = true
      eraser.classList.add('active')
      pen.classList.remove('active')
    }
    pen.onclick = function(){
      eraserEnabled = false
      pen.classList.add('active')
      eraser.classList.remove('active')
    }
  }
}
//颜色选择
black.onclick = function(){
  context.fillStyle = 'black'
  context.strokeStyle = 'black'
  black.classList.add('active')
  red.classList.remove('active')
  green.classList.remove('active')
  blue.classList.remove('active')
}
red.onclick = function(){
  context.fillStyle = 'red'
  context.strokeStyle = 'red'
  black.classList.remove('active')
  red.classList.add('active')
  green.classList.remove('active')
  blue.classList.remove('active')
}
green.onclick = function(){
  context.fillStyle = 'green'
  context.strokeStyle = 'green'
  black.classList.remove('active')
  red.classList.remove('active')
  green.classList.add('active')
  blue.classList.remove('active')
}
blue.onclick = function(){
  context.fillStyle = 'blue'
  context.strokeStyle = 'blue'
  black.classList.remove('active')
  red.classList.remove('active')
  green.classList.remove('active')
  blue.classList.add('active')
}
thin.onclick = function(){
  lineWidth = 5
}
thick.onclick = function(){
  lineWidth = 8
}
clear.onclick = function(){
  context.clearRect(0, 0, board.width, board.height)
}

