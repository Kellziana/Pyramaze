let canvas;
let context;

let request_id;
let fpsInterval = 1000 / 30; 
let now;
let then = Date.now();

let enemies = [];
let treasure = {
    x : 0,
    y : 0,
    width : 27,
    height : 26,
}; 
let points = 0;

let backgroundImage = new Image();

let tilesPerRow = 14;
let tileSize = 32;


let background = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14,15,16,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [89,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,36,-1,-1,-1,-1,-1,-1,36,-1,-1,-1,-1,-1,84],
    [89,36,36,-1,-1,-1,76,-1,-1,22,-1,-1,-1,-1,36,36,36,-1,-1,-1,-1,36,36,36,-1,-1,-1,-1,-1,84],
    [89,-1,36,36,36,-1,-1,-1,22,22,22,-1,-1,-1,-1,-1,36,36,36,36,-1,-1,-1,36,36,36,-1,-1,-1,84],
    [89,-1,36,-1,-1,-1,-1,22,22,22,22,22,-1,-1,-1,-1,36,-1,-1,-1,-1,-1,-1,36,-1,-1,-1,-1,-1,84],
    [89,-1,36,-1,-1,-1,22,22,22,22,22,22,22,-1,-1,-1,36,-1,-1,76,-1,36,36,36,-1,-1,-1,-1,-1,84],
    [89,-1,-1,-1,-1,22,22,22,22,22,22,22,22,22,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,36,-1,-1,79],
    [89,-1,-1,-1,22,22,22,22,22,22,22,22,22,22,22,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,36,-1,-1,-1],
    [89,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,36,-1,-1,-1],
    [89,-1,-1,-1,-1,-1,36,-1,-1,-1,-1,76,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,36,36,36,36,36,36],
    [89,36,36,36,36,36,36,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,76,-1,-1,-1],
    [89,-1,76,36,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,76,-1,-1,-1,-1,-1,-1,36,36,36,36,36], 
    [89,-1,-1,36,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,36,-1,-1,-1,-1], 
    [89,-1,-1,36,-1,-1,-1,22,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,79,-1,-1,-1,36,-1,-1,-1,22], 
    [89,-1,-1,-1,-1,-1,22,22,22,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,22,22], 
    [89,-1,-1,-1,-1,22,22,22,22,22,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,22,22,22], 
    [89,-1,-1,-1,22,22,22,22,22,22,22,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,22,22,22,22], 
    [89,-1,-1,22,22,22,22,22,22,22,22,22,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,22,22,22,22,22], 
    [89,-1,22,22,22,22,22,22,22,22,22,22,22,76,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,22,22,22,22,22,22],
    [89,76,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1], 
    [89,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [89,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1], 
    [89,-1,-1,36,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [89,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,76,-1,-1,-1,-1],
    [89,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1], 
    [89,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1], 
    [55,56,57,55,56,57,55,56,57,55,56,57,55,56,57,55,56,57,55,56,57,55,56,57,55,56,57,55,56,57],
]

let player = {
    x : 0,
    y : 0,
    width : 32,
    height : 48,
    frameX : 0,
    frameY : 0,
    xChange : 0,
    yChange : 0,
}

let enemy = {
    x : 120,
    y : 250,
    width : 32,
    height : 48,
    frameX : 0,
    frameY : 0,
    xChange : 0,
    yChange : 0,
    difficulty : 1
};

let playerImage = new Image();
let enemyImage = new Image();
let treasureImage = new Image();


let floor;

// controls boole values

let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDown = false;

let score = 0;
let currentScore;

document.addEventListener("DOMContentLoaded", init, false)

function randint(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

function init() {
    canvas = document.querySelector("canvas");
    context = canvas.getContext("2d");

    backgroundImage.src = "tiles.png";
    playerImage.src = "egyptianqueen.png";
    enemyImage.src = "mummy.png";
    treasureImage.src = "treasure.png";



//player initial position
    
    floor = canvas.height - 27;
    player.x = canvas.width / 2;
    player.y = canvas.height / 2;

//treasure random positioning

    treasure.x = (Math.floor((Math.random() * 920) + 20));
    treasure.y = (Math.floor((Math.random() * 600) + 20));

//enemy initial position

    enemy.x = 200;
    enemy.y = 50;
    
    window.addEventListener("keydown",activate,false);
    window.addEventListener("keyup",deactivate,false);

    draw();
}

function draw() {
    request_id = window.requestAnimationFrame(draw);
    let now = Date.now();
    let elapsed = now - then;
    if (elapsed <= fpsInterval) {
        return;
    }
    then = now - (elapsed % fpsInterval);


// draw background on canvas

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#d1a063"; 
    context.fillRect(0, 0, canvas.width, canvas.height);
    for (let r = 0; r < 20; r += 1) {
        for (let c = 0; c < 32; c += 1) {
            let tile = background[r][c];
            if (tile >= 0) {
                let tileRow = Math.floor(tile / tilesPerRow);
                let tileCol = Math.floor(tile % tilesPerRow);
                context.drawImage(backgroundImage,
                    tileCol * tileSize, tileRow * tileSize, tileSize, tileSize,
                    c * tileSize, r * tileSize, tileSize, tileSize);
            }
        }
    }

// player

    context.drawImage(playerImage,
        player.width * player.frameX, player.height * player.frameY, player.width, player.height,
        player.x, player.y, player.width, player.height);
    if ((moveLeft || moveRight || moveUp || moveDown) && ! (moveLeft && moveRight && moveUp && moveDown) && ! player.in_air) {
        player.frameX = (player.frameX + 1) % 4;
    }

    if (moveLeft) {
        player.xChange = player.xChange - 0.5;
        player.frameY = 1;
    }
    if (moveRight) {
        player.xChange = player.xChange + 0.5;
        player.frameY = 2;
    }
    if (moveUp) {
        player.yChange = player.yChange - 0.5;
        player.frameY = 3;
    }
    if (moveDown) {
        player.yChange = player.yChange + 0.5;
        player.frameY = 0;
    }

    player.x = player.x + player.xChange;
    player.y = player.y + player.yChange; 

// player speed

    player.x = player.x + player.xChange*6; 
    player.y = player.y + player.yChange*6;
   

// treasure

context.drawImage(treasureImage, treasure.x, treasure.y, treasure.width, treasure.height);
function collecttreasure(treasure) {
    if (player.x + player.width < treasure.x ||   
    treasure.x + treasure.width < player.x ||
    treasure.y > player.y + player.height||
    player.y > treasure.y + treasure.height ) {
        return false;                               // player and treasure not collided
    } else {
        return true;                                // player and treasure collided
    }
};

// points 

    if (collecttreasure(treasure)) {
        points = points + 1;                                    // one point is added when trasure is collected
        treasure.x = (Math.floor((Math.random() * 920) + 20));  // treasure spawned at random
        treasure.y = (Math.floor((Math.random() * 600) + 20));
    };

    document.getElementById("treasure").innerHTML = ("Treasure Collected: " +  points);        // shows the number of treasures collected
    

// enemies

    context.drawImage(enemyImage,
        enemy.width * enemy.frameX, enemy.height * enemy.frameY, enemy.width, enemy.height,
        enemy.x, enemy.y, enemy.width, enemy.height)
        { enemy.frameX = (enemy.frameX + 1) % 4;}
   
// enemy chasing player

    {
    if (player.x < enemy.x) {
        enemy.xChange = -0.5;
    }
    if (player.x > enemy.x) {
        enemy.xChange = 0.5;
    }
    if (player.y < enemy.y) {
        enemy.yChange = -0.5;
    }
    if (player.y > enemy.y) {
        enemy.yChange = 0.5;
    }

// enemy update

    enemy.x = enemy.x + enemy.xChange;
    enemy.y = enemy.y + enemy.yChange;
 }

// enemy speed 

    enemy.x = enemy.x + enemy.xChange*3.5; 
    enemy.y = enemy.y + enemy.yChange*3.5;

// enemy and player collision

function enemykill(enemy) {
        if (player.x + player.width < (enemy.x - 20) ||         // decreases hitbox
        (enemy.x - 20) + (enemy.width - 10) < player.x ||
        player.y > (enemy.y - 20) + (enemy.height - 10) ||
        (enemy.y - 20) > player.y + player.height) {
        return false;                               
    } else {
        return true;                                
    }
};

if (enemykill(enemy)) {
    stop("GAME OVER LOSER! YOU SHALL NOW BE MUMMIFIED!");       // game stops and says "GAME OVER LOSER! YOU SHALL NOW BE MUMMIFIED!"
    return;
};

for (let e of enemies) {                                        // when player gets killed by enemy, game stops, and has been given the name "game over"
    if (player_collides(e)) {
        stop("Game Over ")                                    
    }
}

// player update

   player.x = player.x + player.xChange;
   player.y = player.y + player.yChange;

   player.xChange = 0;
   player.yChange = 0;


// collisions of border of canvas

    if (player.x  <= 30) {
        player.x = 30;
    } else if (player.x >= 900) {
        player.x = 900;
    }
    if (player.y <= 20) {
        player.y = 20;
    } else if (player.y >= 600) {
        player.y = 600;
    }

}

// pressing

function activate(event) {
    let key = event.key;
    if (key === "ArrowLeft") {
        moveLeft = true;
    } else if (key === "ArrowRight") {
        moveRight = true;
    } else if (key === "ArrowUp") {
        moveUp = true;
    } else if (key === "ArrowDown") {
        moveDown = true;
    }
}

// not pressing

function deactivate(event) {
    let key = event.key;
    if (key === "ArrowLeft") {
        moveLeft = false;
    } else if (key === "ArrowRight") {
        moveRight = false;
    } else if (key === "ArrowUp") {
        moveUp = false;
    } else if (key === "ArrowDown") {
        moveDown = false;
    }
}

// audio
// audio code from https://stackoverflow.com/questions/33747398/html-audio-tag-volume

var audio = document.getElementById("pharaohstomb");
  audio.volume = 0.5;

function stop(outcome) {
    window.removeEventListener("keydown", activate, false);
    window.removeEventListener("keyup", deactivate, false);
    window.cancelAnimationFrame(request_id);
    let outcome_element = document.querySelector("#gameover")
    outcome_element.innerHTML = outcome;
    }