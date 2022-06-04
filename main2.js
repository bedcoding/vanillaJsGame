var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = 700; 
canvas.height = 700; 

var dino_left = new Image();
dino_left.src = './image/among1.png';

var dino_right = new Image();
dino_right.src = './image/among2.png';

var knifeImage = new Image();
knifeImage.src = './image/knife.png';

var backgraoundImage = new Image();
backgraoundImage.src = './image/space1.jpg';

// 주인공
var dino = {
    x: 10,
    y: 180,
    jumpSpeed: 30,
    isJumpStart: false,
    characterSizeX: 77,
    characterSizeY: 90,

    // 충돌범위
    getRangeX() {
        return {
            start: this.x,
            end: this.x + this.characterSizeX - 15  // 안 닿았는데 자꾸 닿았다고 판정되서 조절
        }
    },

    getRangeY() {
        return {
            start: this.y - 10,  // 머리에 닿았는데 안 닿았다고 인식해서 조절
            end: this.y + this.characterSizeY
        }
    },

    draw(f) {
        if(this.isJumpStart) {
            this.y -= this.jumpSpeed;
            this.jumpSpeed -= 2;

            if(this.y >= 180) {
                this.isJumpStart = false;
                this.jumpSpeed = 30;
            }
        }

        if(f % 10 < 5) {
            ctx.drawImage(dino_left, this.x, this.y);
            // ctx.drawImage(knifeImage, 110, 110);
        } else {
            ctx.drawImage(dino_right, this.x, this.y);
            // ctx.drawImage(knifeImage, 220, 220);
        }
    },
}

class background {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw() {
        ctx.drawImage(backgraoundImage, this.x, this.y);
    }

    move() {
        this.x -= 10;

        if(this.x < -700) {
            this.x = 700;
        }
    }
}

class knife {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      ctx.drawImage(knifeImage, this.x, this.y);
    }

    move() {
        this.x -= 8;
    }

    draw() {
        ctx.drawImage(knifeImage, this.x, this.y);
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }
}

let f = 0;
let knifeList = [];
let isGameOver = false;

// 배경 2개
const background1 = new background(0, 0);
const background2 = new background(700, 0);

function frame() {
    // 게임오버인 경우 종료
    if(isGameOver) {
        return;
    }

    f++;
    animation = requestAnimationFrame(frame);
    ctx.clearRect(0,0, canvas.width, canvas.height);  // 화면 초기화 (이거 안하면 이전 그림들 다 화면에 잔상처럼 남음)
    
    // 배경 그리기
    background1.draw();
    background2.draw();
    background1.move();
    background2.move();

    // 캐릭터 그리기
    dino.draw(f);

    // 현재 칼이 없는 경우
    if(knifeList.length <= 0) {
        let heightRandom = Math.random() * 200 + 1;  // y좌표는 랜덤
        knifeList.push(new knife(550, heightRandom));
    } else {
        // 칼이 있는 경우 칼을 그려주고 움직인다
        knifeList[0].draw();
        knifeList[0].move();

        // 칼과 캐릭터가 닿은 경우 게임오버
        const isRangeX = dino.getRangeX().start < knifeList[0].getX() && dino.getRangeX().end > knifeList[0].getX();
        const isRangeY = dino.getRangeY().start < knifeList[0].getY() && dino.getRangeY().end > knifeList[0].getY();
        if(isRangeX && isRangeY) {
            isGameOver = true;
            console.log("닿았음");
        }

        // 칼이 화면 끝까지 간 경우 제거
        if(knifeList[0].getX() < -30) {
            knifeList.pop();
        }
    }
}

frame();

document.addEventListener('keydown', function(e) {
    if (e.code === 'KeyA' && !dino.isJumpStart) {
        console.log("점프시작");
        dino.isJumpStart = true;
    }
})