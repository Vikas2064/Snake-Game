let board = document.getElementById('main');
let score1 = document.getElementById('score');
let high_score1 = document.getElementById('high_score');
console.log(board);
let inputdir = { x: 0, y: 0 };
let snakearr = [{ x: 13, y: 10 }];
let fi_time = 0, speed =document.getElementById('speed');
let food_loc = { x: 6, y: 3 };
let score = 0, high_score = 0; a = 2, b = 16;
function main1(ctime) {
    window.requestAnimationFrame(main1);
    let quanta= parseInt(speed.value);     
    if ((ctime - fi_time) / 1000 < 1 / quanta) {
        return;
    }
    fi_time = ctime;
    GameEngine();
}
function iscollide(snake) {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
    return false;
}
function GameEngine() {
    if (iscollide(snakearr)) {
        high_score = Math.max(high_score, score);
        high_score1.innerHTML = high_score;
        score1.innerHTML = 0;
        score = 0;
        snakearr = [{ x: 8, y: 12 }];
        inputdir = { x: 0, y: 0 };
        score = 0;
    }
    if (snakearr[0].x === food_loc.x && snakearr[0].y === food_loc.y) {
        snakearr.unshift({ x: snakearr[0].x + inputdir.x, y: snakearr[0].y + inputdir.y });
        food_loc = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
        score++;
        score1.innerHTML = score;
    }
    let n = snakearr.length;
    for (let i = n - 2; i >= 0; i--) {
        snakearr[i + 1] = { ...snakearr[i] };
    }
    snakearr[0].x += inputdir.x;
    snakearr[0].y += inputdir.y;
    board.textContent = "";
    snakearr.forEach((e, index) => {
        let snake_part = document.createElement('div');
        snake_part.style.gridColumnStart = e.x;
        snake_part.style.gridRowStart = e.y;
        if (index === 0) {
            snake_part.classList.add('head');
        }
        else {
            snake_part.classList.add('snake');
        }
        board.appendChild(snake_part);
    });

    let foode = document.createElement('div');
    foode.style.gridColumnStart = food_loc.x;
    foode.style.gridRowStart = food_loc.y;
    foode.classList.add('food');
    board.appendChild(foode);
}
window.addEventListener('keydown', e => {
    switch (e.key) {
        case "ArrowUp":
            {
                inputdir.x = (0);
                inputdir.y = (-1);
                break;
            }
        case "ArrowDown":
            {
                inputdir.x = (0);
                inputdir.y = (1);
                break;
            }
        case "ArrowLeft":
            {
                inputdir.x = (-1);
                inputdir.y = (0);
                break;
            }
        case "ArrowRight":
            {
                inputdir.x = (1);
                inputdir.y = (0);
                break;
            }
        default:
            break;
    }
})
window.requestAnimationFrame(main1);

