const gameBoard = document.querySelector("#snakeCanvas");
const gameContext = gameBoard.getContext("2d");

const boardCol = "lightgray";
const boardBdr = "lime";

const snakeCol = "black";
const snakeBdr = "lightblue";

const appleCol = "red";
const appleBdr = "lime";

let gamelost = false;
let score = 0;

let defaultSnakeSize = 5;
let initialized = false;

let snake = [

	{ x: 150, y: gameBoard.height / 2 },
	{ x: 120, y: gameBoard.height / 2 },
	{ x: 90, y: gameBoard.height / 2 },
	{ x: 60, y: gameBoard.height / 2 },
	{ x: 30, y: gameBoard.height / 2 }

]

let snakeChunkWidth  = Math.floor(gameBoard.width / 30);
let snakeChunkHeight = Math.floor(gameBoard.height / 30);

let snakehead;

let nextX = 0;
let nextY = 0;

let direction = "firstmove";

let applex;
let appley;

const drawBoard = () => {

	gameContext.fillStyle   = boardCol;
	gameContext.strokestyle = boardBdr;

	gameContext.fillRect(0, 0, gameBoard.width, gameBoard.height);
	gameContext.strokeRect(0, 0, gameBoard.width, gameBoard.height)

	gameContext.fillStyle   = snakeCol;
	gameContext.strokeStyle = snakeBdr;

	// left wall
	gameContext.fillRect(-28, 0, snakeChunkWidth, gameBoard.height);
	gameContext.strokeRect(-28, 0, snakeChunkWidth, gameBoard.height);

	// upper wall
	gameContext.fillRect(0, 0, gameBoard.width, 2);
	gameContext.strokeRect(0, 0, gameBoard.width, 2);

	// right wall
	gameContext.fillRect(gameBoard.width - 2, 0, snakeChunkWidth, gameBoard.height);
	gameContext.strokeRect(gameBoard.width - 2, 0, snakeChunkWidth, gameBoard.height);

	// down wall
	gameContext.fillRect(0, gameBoard.height, gameBoard.width, -2);
	gameContext.strokeRect(0, gameBoard.height, gameBoard.width, -2);

	/*
	gameContext.fillRect(30, 0, snakeChunkWidth, snakeChunkHeight);
	gameContext.strokeRect(30, 0, snakeChunkWidth, snakeChunkHeight);
	*/

}

const addSnakePart = (xcord, ycord, array) => {

	const slicedArray = Array.prototype.slice.call(array);
	array.unshift({x: xcord, y: ycord});

	// console.log(array);
}

const shiftSnakePos = (xcord, ycord, array) => {

	const slicedArray = Array.prototype.slice.call(array);
	array.unshift({x: xcord, y: ycord});

	snake.pop();

	//console.log(array);
}

const createRandomApplePos = () => {

	// xtry start

	let randAmount = Math.floor(Math.random() * 29);
	let xrandPos = (gameBoard.width / 30) * randAmount;

	let i = 0;

	while (xrandPos % 30 != 0 && snake[i].x != xrandPos && i < snake.length)
	{
		randAmount = Math.floor(Math.random() * 29);
		xrandPos = (gameBoard.width / 30) * randAmount;
		if(snake[i] != xrandPos)
		{
			i++;
		}
	}

	let appleX = xrandPos;

	// xtry end

	// ytry start

	randAmount = Math.floor(Math.random() * 29);
	let yrandPos = (gameBoard.height / 30) * randAmount;

	while(yrandPos % 30 != 0)
	{
		randAmount = Math.floor(Math.random() * 29);
		yrandPos = (gameBoard.height / 30) * randAmount;
	}

	let appleY = yrandPos;

	// ytry end

	console.log("applexpos : " + appleX);
	console.log("appleypos : " + appleY);

	const apple = [ { xpos: appleX, ypos: appleY } ];

	return apple;

}

const drawApple = () => {

	gameContext.fillStyle   = appleCol;
	gameContext.strokeStyle = appleBdr;

	applex = apple[0].xpos;
	appley = apple[0].ypos;

	gameContext.fillRect(applex, appley, snakeChunkWidth, snakeChunkHeight);
	gameContext.strokeRect(applex, appley, snakeChunkWidth, snakeChunkHeight);
}

const hasColidedFood = () => {

	if(snake[0].x == applex && snake[0].y == appley)
	{
		addSnakePart(snake[0].x + nextX, snake[0].y, snake);
		apple = createRandomApplePos();

		score += 1;
	}
}

const drawSnake = () => {
	gameContext.fillStyle   = snakeCol;
	gameContext.strokeStyle = snakeBdr;

	for(let i = 0; i < snake.length; i++)
	{
		gameContext.fillRect(snake[i].x, snake[i].y, snakeChunkWidth, snakeChunkHeight);
		gameContext.strokeRect(snake[i].x, snake[i].y, snakeChunkWidth, snakeChunkHeight);
	}
}

const moveSnake = (movex, movey) => {
	snakehead = { x: snake[0].x, y: snake[0].y }

	if(movex)
	{
		if(snakehead.x >= gameBoard.width)
		{
			console.log("GAME OVER!");
			snake = [];

			gamelost = true;
		}
		else if (snakehead.x <= -28)
		{
			console.log("GAME OVER!");
			snake = [];

			gamelost = true;
		}
		else
		{
			shiftSnakePos(snake[0].x + nextX, snake[0].y, snake);
		}
	}
	else if (movey)
	{
		if(snakehead.y >= 900)
		{
			console.log("GAME OVER!");
			snake = [];

			gamelost = true;
		}
		else if (snakehead.y <= -2)
		{
			console.log("GAME OVER!");
			snake = [];

			gamelost = true;
		}
		else
		{
			shiftSnakePos(snake[0].x, snake[0].y + nextY, snake);
		}
	}
}

const getSnakeInput = (event) => {

	let movement = event.keyCode;

	switch(movement)
	{
		case 65:
		case 37:
			if(direction != "right" && direction != "left" && direction != "firstmove")
			{
				nextX = -30;
				nextY = snake[0].y;

				console.log(direction);

				shiftSnakePos(snake[0].x + nextX, nextY, snake);

				direction = "left";
			}

			break;

		case 87:
		case 38:
			if(direction != "down" && direction != "up")
			{
				nextX = snake[0].x;
				nextY = -30;

				console.log(direction);

				shiftSnakePos(nextX, snake[0].y + nextY, snake);

				direction = "up";
			}

			break;

		case 68:
		case 39:
			if(direction != "left" && direction != "right")
			{
				nextX = 30;
				nextY = snake[0].y;

				console.log(direction);

				shiftSnakePos(snake[0].x + nextX, nextY, snake);

				direction = "right";
			}

			break;

		case 83:
		case 40:
			if(direction != "up" && direction != "down")
			{
				nextX = snake[0].x;
				nextY = 30;

				console.log(direction);

				shiftSnakePos(nextX, snake[0].y + nextY, snake);

				direction = "down";
			}

			break;
	}
}

const drawAssets = () => {

	drawBoard();
	drawApple();
	drawSnake();

}

const main = () => {
	if(gamelost)
	{
		return;
	}

	setTimeout(function onTick()
	{
		if (nextX == 30 || nextX == -30)
		{
			moveSnake(true, false)
		}
		else if (nextY == 30 || nextY == -30)
		{
			moveSnake(false, true);
		}

		setInterval(function food()
		{
			hasColidedFood();
		}, 50);

		drawAssets();

		main();
	}, 1000 / 11);
}

document.addEventListener("keydown", getSnakeInput);

apple = createRandomApplePos();
main();
