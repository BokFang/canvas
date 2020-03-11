let board = document.getElementById("canvas")
let context = board.getContext("2d")
autoCanvasSet(board)
userListening(board)
model(board)
let lineWidth = 6
let initialColor = 'black'
function drawCircle(x,y,R){
  context.beginPath()
  context.arc(x, y, R, 0, 2 * Math.PI)
  context.fill()
}
function drawLine(x1,y1,x2,y2){
  context.strokeStyle = initialColor
  context.beginPath()
  context.moveTo(x1, y1)
  context.lineWidth = lineWidth
  context.lineTo(x2, y2)
  context.stroke()
  context.closePath()
  context.stroke()
}
let using = false
let lastPoint = {x:undefined,y:undefined}
function userListening(board){
//特性检测
if(document.body.ontouchstart !== undefined){
  //触屏设备
  //按下屏幕
  document.body.style.overflow='hidden';  
  board.ontouchstart = function(a){
  let x = a.touches[0].clientX
  let y = a.touches[0].clientY
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
  let x = a.touches[0].clientX
  let y = a.touches[0].clientY
  if(!using){ return }
  if(eraserEnabled){
    context.clearRect(x-5,y-5,10,10)
  }else{
    using = true
    let newPoint = {"x":x,"y":y}
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
board.addEventListener('mousedown',(a)=>{
  let x = (a.clientX - 40)
  let y = (a.clientY - 60)
  using = true
  if(eraserEnabled){
    context.clearRect(x-5,y-5,10,10)
  }else{
    drawCircle(x,y,1)
    lastPoint = {"x":x,"y":y}
  }
})
//动鼠标
board.addEventListener('mousemove',(a)=>{
  let x = (a.clientX - 40)
  let y = (a.clientY - 60)
  if(!using){ return }
  if(eraserEnabled){
    context.clearRect(x-5,y-5,10,10)
  }else{
    using = true
    let newPoint = {"x":x,"y":y}
    drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
    lastPoint = newPoint
  }
}) 
//松开鼠标
board.addEventListener('mouseup',(a)=>{
  using = false
})
}
}
let eraser = document.getElementById('eraser')
let eraserEnabled = false
eraser.onclick = function(){
  eraserEnabled = !eraserEnabled;
}
function autoCanvasSet(board){
  board.width = '900'
  board.height = '600'
}
//工具选择
let pen = document.getElementById('pen')
let actions = document.getElementById('actions')
function model(board){
  window.onload = function(){
    pen.classList.add('active')
    eraser.addEventListener('click',()=>{
      eraserEnabled = true
      eraser.classList.add('active')
      pen.classList.remove('active')
    })
    pen.addEventListener('click',()=>{
      eraserEnabled = false
      pen.classList.add('active')
      eraser.classList.remove('active')
    })
  }
}
//颜色选择
let allColor = ['red','orange','yellow','green','aqua','blue','purple','black','white']
for(let i = 0; i < allColor.length;i++){
  let li = document.createElement('li')
  li.className = allColor[i]
  color.appendChild(li)
  li.addEventListener('click',()=>{
    context.fillStyle = allColor[i]
    context.strokeStyle = allColor[i]
    initialColor = allColor[i]
    liveColor.style.background = allColor[i]
  })
}


//画笔粗细选择
let allSize = [1,2,3,4]
for(let i = 0;i < allSize.length;i++){
  let li = document.createElement('li')
  li.className = `size${allSize[i]}`
  li.textContent = i+1
  size.appendChild(li)
  li.addEventListener('click',()=>{
    lineWidth = (i+1)*2
    liveSize.innerText = i+1
  })
}
//清屏
clear.addEventListener('click',()=>{
  context.clearRect(0, 0, board.width, board.height)
})
//下载图画
download.addEventListener('click',()=>{
  let url = board.toDataURL("image/png")
  let a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url 
  a.download = 'image'
  a.click()
})
