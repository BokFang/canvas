let board = document.getElementById("canvas")
let context = board.getContext("2d")
autoCanvasSet()
listenToUser(board)
model(board)
window.onresize = ()=>{
  let changeCanvas = window.confirm('改变窗口大小会导致画板清空！请确定是否改变？')
  if(changeCanvas){
    autoCanvasSet()
  }else {}
}
let lineWidth = 4
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
function listenToUser(board){
  let using = false
  let lastPoint = {x:undefined,y:undefined}
  //特性检测
  if(document.body.ontouchstart !== undefined){
    //触屏设备
    console.log('触屏设备')
    board.addEventListener('touchstart',(a)=>{
      let x = (a.touches[0].clientX)
      let y = (a.touches[0].clientY)
      using = true
      if(eraserEnabled){
        context.clearRect(x-5,y-5,10,10)
      }else{
        drawCircle(x,y,1)
        lastPoint = {"x":x,"y":y}
      }
    })
    board.addEventListener('touchmove',(a)=>{
      let x = (a.touches[0].clientX)
      let y = (a.touches[0].clientY)
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
    board.addEventListener('touchend',()=>{
      using = false
    })
  }else{
    console.log('非触屏设备')
    //非触屏设备
    //按下鼠标
    board.addEventListener('mousedown',(a)=>{
      let x = (a.clientX + 14)
      let y = (a.clientY + 29)
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
      let x = (a.clientX + 14)
      let y = (a.clientY + 29)
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

//橡皮功能
let eraser = document.getElementById('eraser')
let eraserEnabled = false
eraser.onclick = function(){
  eraserEnabled = !eraserEnabled;
}
//窗口重置
function autoCanvasSet(){
  let pageWidth = document.documentElement.clientWidth
  let pageHeight = document.documentElement.clientHeight
  board.width = pageWidth
  board.height = pageHeight
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
      board.style.cursor = 'url(./images/eraser.ico),auto'
    })
    pen.addEventListener('click',()=>{
      eraserEnabled = false
      pen.classList.add('active')
      eraser.classList.remove('active')
      board.style.cursor = 'url(./images/pen.ico),auto'
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
  let clear = confirm('是否清屏？')
  if(clear){
    context.clearRect(0, 0, board.width, board.height)
  }else{}
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
//工具栏收放
let toolbar = false
setting.addEventListener('click',()=>{
  if(!toolbar){
   tools.style.zIndex = '2'
    tools.style.opacity = '1'
    toolbar = !toolbar
  }else{
    tools.style.opacity = '0'
    toolbar = !toolbar
    setTimeout(()=>{
      tools.style.zIndex = '-1'
    },500)
  }
})












































