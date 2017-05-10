// Snakes and Ladders game code adapted from Manas Bhardwaj
// https://www.codeproject.com/Articles/396639/Snakes-and-Ladders-An-attempt-using-HTML

// load canvas and set its position
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
canvas.style.position = 'absolute';
canvas.style.left = '500px';
canvas.style.top = '200px';

// set size of game board and dimension of each square
var startRow = 1;
var endRow = 5;
var startCol = 1;
var endCol = 5;
var squareSize = canvas.height / endCol;

// empty array to store coordinates of all squares
var squares = [];

// initialize current position on game board to 0
var currentPos = 0;

// initialize number of turns used to 0
var numberOfTurns = 0;

// create Snakes and Ladders board game
drawBoard();
drawSnakeLadder();

// function to draw game board
function drawBoard(){

    // set colors of the squares
    var color1 = '#FFD700';
    var color2 = '#C0C0C0';

    // initial x and y coordinates for drawing the board
    var x = 0;
    var y = canvas.height - squareSize;

    // initial index number of square
    var squareNumber = 1;

    // initial movement from left to right
    var leftToRight = true;

    // start from first row
    for (var row = startRow; row <= endRow; row++){

        // determine x coordinate depending on whether movement is from left to right or right to left
        if(leftToRight){
            x = 0;
        } else {
            x = canvas.width - squareSize;
        }

        // iterate across columns
        for(var col = startCol; col <= endCol; col++){

            // if the square number is even, fill it with color1; if odd, fill with color2
            if(squareNumber % 2 == 0){
                ctx.fillStyle = color1;
            } else {
                ctx.fillStyle = color2;
            }

            // draw colored square with x and y coordinates and correct dimension
            ctx.fillRect(x, y, squareSize, squareSize);

            // add x and y coordinates as string to squares array
            squares[squareNumber] = x.toString() + ',' + y.toString();

            // write square number in bottom left corner of square
            ctx.font = '12px arial';
            ctx.fillStyle = '#000000';
            ctx.fillText(squareNumber, x, y + squareSize);

            // advance x coordinate
            if(leftToRight){
                x += squareSize;
            } else {
                x -= squareSize;
            }

            // move to next square
            squareNumber++;
        }

        // advance y coordinate at end of row and switch movement direction
        y -= squareSize;
        leftToRight = !leftToRight;
    }
}

// function to add in snakes and ladders to board
function drawSnakeLadder(){
    
    // draw first snake image on board
    var imgSnake1 = new Image();
    imgSnake1.onload = function(){
        ctx.drawImage(imgSnake1, -50, 150);
    };

    // image source: https://pixabay.com/p-149010/?no_redirect
    imgSnake1.src = 'images/snake1.png';

    // draw second snake image on board
    var imgSnake2 = new Image();
    imgSnake2.onload = function(){
        ctx.drawImage(imgSnake2, 110, 5);
    };

    // image source: https://www.zettabox.com/sites/all/modules/custom/zettabox_snakes_ladders/images/sa_1.png
    imgSnake2.src = 'images/snake2.png';

    // draw first ladder image on board
    var imgLadder1 = new Image();
    imgLadder1.onload = function(){
        ctx.drawImage(imgLadder1, 0, 10);
    };

    // image source: http://snakesnladders.emantranet.com/images/ladder3.png
    imgLadder1.src = 'images/ladder1.png';

    // draw second ladder image on board
    var imgLadder2 = new Image();
    imgLadder2.onload = function(){
        ctx.drawImage(imgLadder2, 360, 120);
    };

    // image source: http://www.clipartkid.com/images/314/ladder-clipart-clipart-ladder-256x256-b350-png-MKJhxl-clipart.png
    imgLadder2.src = 'images/ladder2.png';
}

// load sound effect clips (source: http://soundbible.com/)
var diceSound = new Audio('sounds/dice.mp3');
var cheering = new Audio('sounds/cheer.mp3');
var upLadder = new Audio('sounds/ladder.mp3');
var downSnake = new Audio('sounds/snake.mp3');

// function to generate an integer between 1 and 6 (simulate dice roll)
function rollDice(){
    diceSound.play();
    return Math.floor(Math.random() * 6 + 1);
}

// function to execute next move when 'Roll Dice' button is clicked
function nextMove(){

    // reset board so previous move is no longer colored
    drawBoard();
    drawSnakeLadder();

    // roll dice for next move and display roll
    var newMove = rollDice();
    var dice = document.getElementById('dice');
    dice.innerHTML = newMove;

    // if dice roll overshoots final square, end at final square
    if(currentPos + newMove > endRow * endCol){
        currentPos = endRow * endCol;

        // get x and y coordinates of current position by splitting the string in the squares array
        var coords = squares[currentPos].split(',');
    
        // color the current position
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(coords[0], coords[1], squareSize, squareSize);
        
    } else {

        // else update current position
        currentPos += newMove;

        // get x and y coordinates of current position by splitting the string in the squares array
        var coords = squares[currentPos].split(',');
    
        // color the current position
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(coords[0], coords[1], squareSize, squareSize);

        // update position (with a lag) if landed on snake or ladder and color new position
        switch(currentPos){
            case 6:
            upLadder.play();
            setTimeout(function(){
                drawBoard();
                drawSnakeLadder();
                currentPos = 16;
                var coordsSwitch = squares[currentPos].split(',');
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(coordsSwitch[0], coordsSwitch[1], squareSize, squareSize);
            }, 2000);
            break;
            case 12:
            upLadder.play();
            setTimeout(function(){
                drawBoard();
                drawSnakeLadder();
                currentPos = 21;
                var coordsSwitch = squares[currentPos].split(',');
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(coordsSwitch[0], coordsSwitch[1], squareSize, squareSize);
            }, 2000);
            break;
            case 11:
            downSnake.play();
            setTimeout(function(){
                drawBoard();
                drawSnakeLadder();
                currentPos = 4;
                var coordsSwitch = squares[currentPos].split(',');
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(coordsSwitch[0], coordsSwitch[1], squareSize, squareSize);
            }, 2000);
            break;
            case 24:
            downSnake.play();
            setTimeout(function(){
                drawBoard();
                drawSnakeLadder();
                currentPos = 13;
                var coordsSwitch = squares[currentPos].split(',');
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(coordsSwitch[0], coordsSwitch[1], squareSize, squareSize);
            }, 2000);
            break;
        }
    }

    // hide the dice roll button
    var button = document.getElementById('roll');
    button.style.display = 'none';

    // inform player when game has ended and reload page
    if(currentPos == endRow * endCol){
        cheering.play();
        setTimeout(function(){
            cheering.pause();
            alert('Congratulations, you won! You took ' + numberOfTurns + ' turns.');
            window.location.reload();
        }, 4000);
    }
}