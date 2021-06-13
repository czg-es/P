const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];
let adjustX = canvas.width / 1500;
let adjustY = canvas.height / 1500;

let color = getComputedStyle(document.documentElement).getPropertyValue('--bg_color');
let dark_color = getComputedStyle(document.documentElement).getPropertyValue('--dark_color');

// Get mouse position
let mouse = {
    x: null,
    y: null,
    radius: 150 //(canvas.height/80) * (canvas.width/80)
}

window.addEventListener('pointermove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

let font_size = canvas.width / 100 + 10;
ctx.fillStyle = 'white';
ctx.font = font_size + 'px Arial';
ctx.fillText('CZG.', 2, 20);

const coordinates = ctx.getImageData(0, 0, canvas.width / 2, canvas.height / 2);

class Particle {
    constructor(x, y) {
        this.x = x; //= x + 100;
        this.y = y;
        this.size = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30);
        this.color = dark_color //'#' + (Math.floor(Math.random()*16777215).toString(16));
    }
    draw() {
        ctx.fillStyle = this.color; //ctx.fillStyle = '#' + (Math.floor(Math.random()*16777215).toString(16));
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;
        if (distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
        } else {
            if (this.x !== this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx / 50;
            }
            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy / 50;
            }

        }
    }
}
function init() {
    particleArray = [];
    
    for (let y = 0, y2 = coordinates.height; y < y2; y++) {
        for (let x = 0, x2 = coordinates.width; x < x2; x++) {
            if (coordinates.data[(y * 4 * coordinates.width) + (x * 4) + 3] > 128) {
                let positionX = x + adjustX;
                let positionY = y + adjustY;
                particleArray.push(new Particle(positionX * 10, positionY * 10));
            }
        }
    }
}


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].draw();
        particleArray[i].update();
    }
    requestAnimationFrame(animate);
    connect();
}

function go(){
    color = getComputedStyle(document.documentElement).getPropertyValue('--bg_color');
    dark_color = getComputedStyle(document.documentElement).getPropertyValue('--dark_color');
    init();
    animate();

}

go();

function connect() {
    let rgbc = "140, 85, 31,";
    let opacityValue = 1;
    //let lineColor = 'rgba(140, 85, 31,'+ opacityValue + ')';
    for (let a = 0; a < particleArray.length; a++) {
        for (let b = a; b < particleArray.length; b++) {
            let distance = ((particleArray[a].x - particleArray[b].x) * (particleArray[a].x - particleArray[b].x)) +
                ((particleArray[a].y - particleArray[b].y) * (particleArray[a].y - particleArray[b].y));
            if (distance < 600) {
                opacityValue = 1 - (distance / 20000 * 2);
                let lineColor = 'rgba(' + rgbc + opacityValue + ')';

                ctx.strokeStyle = color;

                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particleArray[a].x, particleArray[a].y);
                ctx.lineTo(particleArray[b].x, particleArray[b].y);
                ctx.stroke();
            }
        }
    }
}
// Resize event
window.addEventListener('resize',
    function() {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        mouse.radius = ((canvas.width / 80) * (canvas.height / 80));
        init();
    })
window.addEventListener('pointerout',
    function() {
        mouse.x = undefined;
        mouse.y = undefined;
    })
// remove mouse position periodically
setInterval(function() {
    mouse.x = undefined;
    mouse.y = undefined;
}, 1000)

