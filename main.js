var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var img1 = new Image();
img1.src = 'Dino.png';

var dino = {
  x: 600,
  y: 200,
  width: 50,
  height: 50,
  draw(){
    ctx.fillStyle = 'white';
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(img1, this.x, this.y)
  }
}

var img2 = new Image();
img2.src = 'Cactus.png';

class Cactus {
  constructor() {
    this.x = 1200;
    this.y = 200;
    this.width = 50;
    this.height = 50;
  }
  draw(){
    ctx.fillStyle = 'red';
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(img2, this.x, this.y)
  }
}

var timer = 0;
var cactuses = [];
var jumptimer = 0;
var animation;

function frameStart(){
  animation = requestAnimationFrame(frameStart);
  timer++;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (timer % 200 === 0){         // 200프레임마다 장애물 생성
    var cactus = new Cactus();
    cactuses.push(cactus);        // array에 집어넣음
  }

  cactuses.forEach((a, i, o)=>{   
    if (a.x < 0){                 // x좌표가 0미만이면 제거
      o.splice(i, 1)
    }  
    a.x--;

    collision(dino, a);       

    a.draw();                     // array에 있던거 draw()
  })

  if (jumping == true){
    dino.y--;
    jumptimer++;
  }
  if (jumping == false){
    if (dino.y < 200){
    dino.y++;
    }
  }
  if (jumptimer > 100){
    jumping = false;
    jumptimer = 0;
  }

  dino.draw()
}

frameStart();

// 충돌체크
function collision(dino, cactus){
  var xdifference = cactus.x - (dino.x + dino.width);
  var ydifference = cactus.y - (dino.y + dino.height);
  if (xdifference < 0 && ydifference < 0){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cancelAnimationFrame(animation);
  }
}


var jumping = false;
document.addEventListener('keydown', function(e){
  if (e.code === 'Space'){
    jumping = true;
  }
})