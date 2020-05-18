const canvas = document.getElementById("snake");
const começar = document.querySelector('#comecar');
const context = canvas.getContext("2d");
const box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

let direction = 'right';

function criarBg() {
    context.fillStyle = '#a2c8ec';
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarSnake() {
    for (i=0; i < snake.length; i++) {
        context.fillStyle = 'pink';
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood() {
    context.fillStyle = 'white';
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update(event) {
    if(event.keyCode === 37 && event.keyCode !== 'right') direction = 'left';
    if(event.keyCode === 38 && event.keyCode !== 'down') direction = 'up';
    if(event.keyCode === 39 && event.keyCode !== 'left') direction = 'right';
    if(event.keyCode === 40 && event.keyCode !== 'up') direction = 'down';

    console.log(direction);
}

function iniciarJogo() {
    if(snake[0].x > 15 * box && direction === 'right') snake[0].x = 0;
    if(snake[0].x < 0 && direction === 'left') snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction === 'down') snake[0].y = 0;
    if(snake[0].y < 0 && direction === 'up') snake[0].y = 16 * box;

    for(i = 1; i < snake.length; i++) {
        if(snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            clearInterval(jogo);
            comecar.removeAttribute('disabled');
            alert('Game Over! Recarregue a página.');
        } 
    }
    
    criarBg();
    criarSnake();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    switch (direction) {
        case 'right': snakeX += box; break;
        case 'left': snakeX -= box; break;
        case 'up': snakeY -= box; break;
        case 'down': snakeY += box; break;
        default: break;       
    }

    if (snakeX !== food.x || snakeY !== food.y) {
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    const newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

function resetGame() {
    snake = [];
    snake[0] = {
        x: 8 * box,
        y: 8 * box
    };

    food = {
        x: Math.floor(Math.random() * 15 + 1) * box,
        y: Math.floor(Math.random() * 15 + 1) * box
    };
}

let jogo = '';
comecar.onclick = () => {
    resetGame();
    comecar.setAttribute('disabled', 'disabled');
    jogo = setInterval(iniciarJogo, 100);
}