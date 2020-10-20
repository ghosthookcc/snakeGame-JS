const gameBoard = document.querySelector("#snakeCanvas");
const gameContext = gameBoard.getContext("2d");

const boardCol = "lightgray";
const boardBdr = "lime";

const snakeCol = "black";
const snakeBdr = "lightblue";

const appleCol = "red";
const appleBdr = "lime";

const gridChunkSize = 30;

const paddingLeft  = -28;
const paddingUp    = 2;
const paddingRight = -2;
const paddingDown  = -2;

let gamelost = false;
let score = 0;

let time = 1;
let delay = 11;

const tickTime = (time * 1000) / delay;

let snake = [

	{ x: 150, y: gameBoard.height / 2 },
	{ x: 120, y: gameBoard.height / 2 },
	{ x: 90, y: gameBoard.height / 2 },
	{ x: 60, y: gameBoard.height / 2 },
	{ x: 30, y: gameBoard.height / 2 }

]

let snakeChunkWidth  = Math.floor(gameBoard.width / gridChunkSize);
let snakeChunkHeight = Math.floor(gameBoard.height / gridChunkSize);

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
	gameContext.fillRect(paddingLeft, 0, snakeChunkWidth, gameBoard.height);
	gameContext.strokeRect(paddingLeft, 0, snakeChunkWidth, gameBoard.height);

	// upper wall
	gameContext.fillRect(0, 0, gameBoard.width, paddingUp);
	gameContext.strokeRect(0, 0, gameBoard.width, paddingUp);

	// right wall
	gameContext.fillRect(gameBoard.width + paddingRight, 0, snakeChunkWidth, gameBoard.height);
	gameContext.strokeRect(gameBoard.width + paddingRight, 0, snakeChunkWidth, gameBoard.height);

	// down wall
	gameContext.fillRect(0, gameBoard.height, gameBoard.width, paddingDown);
	gameContext.strokeRect(0, gameBoard.height, gameBoard.width, paddingDown);

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

	let randAmount = Math.floor(Math.random() * 29); // random number between 1 to 30 - 1 for size purposes
	let xrandPos = (gameBoard.width / gridChunkSize) * randAmount;

	let i = 0;

	while (xrandPos % gridChunkSize != 0 && snake[i].x != xrandPos && i < snake.length)
	{
		randAmount = Math.floor(Math.random() * 29);
		xrandPos = (gameBoard.width / grudChunkSize) * randAmount;
		if(snake[i] != xrandPos)
		{
			i++;
		}
	}

	let appleX = xrandPos;

	// xtry end

	// ytry start

	randAmount = Math.floor(Math.random() * 29);
	let yrandPos = (gameBoard.height / gridChunkSize) * randAmount;

	i = 0;

	while(yrandPos % 30 != 0 && snake[i].y != yrandPos && i < snake.length)
	{
		randAmount = Math.floor(Math.random() * 29);
		yrandPos = (gameBoard.height / gridChunkSize) * randAmount;
		if(snake[i] != xrandPos)
		{
			i++;
		}
	}

	let appleY = yrandPos;

	// ytry end

	/*
	console.log("applexpos : " + appleX);
	console.log("appleypos : " + appleY);
	*/

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
	if(movex)
	{
		shiftSnakePos(snake[0].x + nextX, snake[0].y, snake);
	}
	else if (movey)
	{
		shiftSnakePos(snake[0].x, snake[0].y + nextY, snake);
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
				nextY = 0;

				// console.log(direction);

				shiftSnakePos(snake[0].x + nextX, snake[0].y, snake);

				direction = "left";
			}

			break;

		case 87:
		case 38:
			if(direction != "down" && direction != "up")
			{
				nextX = 0;
				nextY = -30;

				// console.log(direction);

				shiftSnakePos(snake[0].x, snake[0].y + nextY, snake);

				direction = "up";
			}

			break;

		case 68:
		case 39:
			if(direction != "left" && direction != "right")
			{
				nextX = 30;
				nextY = 0;

				// console.log(direction);

				shiftSnakePos(snake[0].x + nextX, snake[0].y, snake);

				direction = "right";
			}

			break;

		case 83:
		case 40:
			if(direction != "up" && direction != "down")
			{
				nextX = 0;
				nextY = 30;

				// console.log(direction);

				shiftSnakePos(snake[0].x, snake[0].y + nextY, snake);

				direction = "down";
			}

			break;
	}
}

const lost = () => {
	document.removeEventListener("keydown", getSnakeInput);
	console.log("GAME OVER!");

	gamelost = true;
	snake = [];
}

const hasColidedFood = () => {

	if(snake[0].x == applex && snake[0].y == appley)
	{
		addSnakePart(snake[0].x + nextX, snake[0].y + nextY, snake);
		apple = createRandomApplePos();

		score += 1;
		console.log("COLIDED_APPLE");
	}
}

const hasColidedWall = () => {
	if(snake[0].x > gameBoard.width + paddingRight || snake[0].x < 0)
	{
		console.log(snake[0].x)
		lost();
		console.log("COLIDED_X");
	}
	else if (snake[0].y > gameBoard.width + paddingDown || snake[0].y < 0)
	{
		console.log(snake[0].y)
		lost();
		console.log("COLIDED_Y");
	}
}

const hasColidedSelf = () =>
{

	for(let i = 1; i < snake.length - 1; i++)
	{
		if(snake[0].x == snake[i].x && snake[0].y == snake[i].y)
		{
			lost();
		}
	}

}

const drawAssets = () => {

	drawBoard();
	drawApple();
	drawSnake();

}

const main = () => {

	var gameplay = setTimeout(function onTick()
	{
		if (nextX == 30 || nextX == -30)
		{
			moveSnake(true, false);
		}
		else if (nextY == 30 || nextY == -30)
		{
			moveSnake(false, true);
		}

		drawAssets();

		var colider = setInterval(function collision()
		{
			if(gamelost)
			{
				clearInterval(colider);
				clearTimeout(gameplay);
				return;
			}

			hasColidedFood();
			hasColidedWall();
			hasColidedSelf();
		}, 100);

		main();
	}, tickTime);
}

document.addEventListener("keydown", getSnakeInput);
apple = createRandomApplePos();

main();
