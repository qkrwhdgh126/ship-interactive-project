const canvas = document.querySelector('#c');
const ctx = canvas.getContext("2d");


// 리사이즈

let stageWidth, stageHeight, centerX, centerY;

function resize() {
    stageWidth = document.body.clientWidth * 2;
    stageHeight = document.body.clientHeight * 2;

    canvas.width = stageWidth;
    canvas.height = stageHeight;

    centerX = stageWidth / 2;
    centerY = stageHeight / 2;

    canvas.style.background = 'linear-gradient(to top, #ffffff, 55%, rgb(136, 198, 255))';
    canvas.style.backgroundSize = centerX + 'px ' + centerY + 'px';
}

resize();
window.addEventListener('resize', resize);



// 그리기 관련 좌표들

const wavecolor = ['rgba(0,170,255,0.5', 'rgba(0,190,255,1)', 'rgba(0,225,255,0.5)'];
const pointX = [0.2, 0.6, 1, 1.4, 1.8, 2.2]
const pointY = [0, 1, 2, 3, 4, 0];
const speed = 0.05;
let cur = 0;

const ship = document.querySelector('.ship');
let dec = 0;

const cloud = document.querySelector('.cloud');
let cloudX = [0.68, 1.10, 0.92, 0.25, -0.05, 1.45, 1.3, 1.7, 2.2];
const cloudY = [0.8, 0.58, 0.45, 0.45, -0.25, -0.2, 0.3, 0.8, 0.55];
const cloudsizeX = [190, 250, 100, 430, 680, 680, 430, 300, 400];
const cloudsizeY = [130, 190, 70, 300, 400, 400, 300, 200, 300];



// 그리기

function draw() {
    ctx.clearRect(0, 0, stageWidth, stageHeight);


    // 값 변화
    cur += speed;
    dec += 0.0015;


    // 물결들
    for (let i=0; i<3; i++) {
        ctx.beginPath();
        ctx.fillStyle = wavecolor[i];
        ctx.moveTo(0, centerY+300);
        for (let j=0; j<5; j++) {
            const preX = pointX[j] * centerX;
            const preY = centerY + 300 + Math.sin(cur+pointY[j]+(0.25*i))*100;

            const cx = (pointX[j+1] * centerX + preX) / 2;
            let cy = (centerY + 300 + Math.sin(cur+pointY[j+1]+(0.25*i))*100 + preY) / 2;
            if (j==4) {
                cy = centerY + 300;
            }

            ctx.quadraticCurveTo(preX, preY, cx, cy);
        }
        ctx.lineTo(2*centerX, 2*centerY);
        ctx.lineTo(0,2*centerY);
        ctx.lineTo(0,centerY);
        ctx.fill();
        ctx.closePath();
    }


    // 배
    const a = Math.cos(cur+2.25);  // 미분 기울기
    const deg = Math.tan(a) / 10;  // 기울기를 각도로

    ctx.save();
    ctx.translate(centerX, centerY+190);
    ctx.rotate(deg);
    ctx.drawImage(ship, -150, -150+Math.sin(cur+2.25)*100, 300, 300);
    ctx.restore();


    // 구름들
    for (let m=0; m<9; m++) {
        if ((cloudX[m]-dec)*centerX+cloudsizeX[m] < 0) {
            cloudX[m] += 2.5;
        }
        ctx.save();
        ctx.drawImage(cloud, (cloudX[m]-dec)*centerX, cloudY[m]*centerY, cloudsizeX[m], cloudsizeY[m]);
        ctx.restore();
    }


    requestAnimationFrame(draw);
}

draw();