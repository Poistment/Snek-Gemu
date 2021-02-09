let gameRunning = true;
let hasFood = false;
let direction = "right";
let timeout = 100;
let score = 0;
let dx;
let dy;
let foodLoc = {
  x: 200,
  y: 50
};
let snake = [{
    x: 100,
    y: 200
  }, {
    x: 90,
    y: 200
  }, {
    x: 80,
    y: 200
  },
  {
    x: 70,
    y: 200
  }, {
    x: 60,
    y: 200
  }
];

function setup() {
  createCanvas(400, 400);
  textSize(32);

  moveSnek();
}

function moveSnek() {
  background(220);

  fill(255, 0, 0);
  square(foodLoc.x, foodLoc.y, 10);

  fill(50, 200, 200);
  for (let i = 0; i < snake.length; i++) {
    square(snake[i].x, snake[i].y, 10);
  }

  if (direction == "up") {
    dx = 0;
    dy = -10;
  } else if (direction == "right") {
    dx = 10;
    dy = 0;
  } else if (direction == "down") {
    dx = 0;
    dy = 10;
  } else if (direction == "left") {
    dx = -10;
    dy = 0;
  }

  if (gameRunning) {
    createHead();
  }

  displayScore();
  checkGameOver();
  setTimeout(moveSnek, timeout);
}

function createHead() {
  let head = {
    x: snake[0].x + dx,
    y: snake[0].y + dy
  };
  snake.unshift(head);

  if (head.x == foodLoc.x && head.y == foodLoc.y) {
    foodLoc.x = floor(random(2, 39)) * 10;
    foodLoc.y = floor(random(2, 39)) * 10;
    score += 10;
  } else {
    snake.pop();
  }

}

//wasd = 87,65,83,68
function keyPressed() {
  if (keyCode == 87 && direction != "down") {
    direction = "up";
  } else if (keyCode == 65 && direction != "right") {
    direction = "left";
  } else if (keyCode == 83 && direction != "up") {
    direction = "down";
  } else if (keyCode == 68 && direction != "left") {
    direction = "right";
  }
}

function displayScore() {
  fill(50, 200, 50, 100);
  text(str(score), 180, 70);
}

function checkGameOver() {
  if (snake[0].x > 400 ||
    snake[0].x < 0 ||
    snake[0].y > 400 ||
    snake[0].y < 0) {

    dieded();
  }

  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      dieded();
    }
  }
}

function dieded() {
  gameRunning = false;
  textSize(40);
  fill(0);
  text("もうファックですよー", 0, 210);
}