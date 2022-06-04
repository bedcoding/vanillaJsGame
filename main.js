var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d');

canvas.width = 700; 
canvas.height = 700; 

ctx.fillStyle = 'green';
ctx.fillRect(100, 100, 50, 50); 

let x = 100;
let y = 100;

function frame(code) {
   animation = requestAnimationFrame(frame)
    ctx.clearRect(0,0, canvas.width, canvas.height);  // 초기화
    ctx.fillRect(x, y++, 50, 50);  // 이동
}

window.onkeydown = (e) => {
    console.log(e.code);
    frame(e.code);
}
