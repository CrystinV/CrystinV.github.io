const grid = document.querySelector('.grid')
const blockWidth = 10
const blockHeight = 2
const scoreDisplay = document.querySelector('#score')

const userStart = [25, 1]
let currentPosition = userStart

const ballStart = [29, 4]
let ballCurrentPosition = ballStart

let xDirection = 0.2
let yDirection = 0.2

// create block
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis,yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}

// blocks array
const blocks = [
    new Block(1, 26.5),
    new Block(13, 26.5),
    new Block(25, 26.5),
    new Block(37, 26.5),
    new Block(49, 26.5),
    new Block(1, 23),
    new Block(13, 23),
    new Block(25, 23),
    new Block(37, 23),
    new Block(49, 23),
    new Block(1, 19.5),
    new Block(13, 19.5),
    new Block(25, 19.5),
    new Block(37, 19.5),
    new Block(49, 19.5),
]

// draw blocks
function addBlocks() {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'em'
        block.style.bottom = blocks[i].bottomLeft[1] + 'em'
        grid.appendChild(block)
    }
}

addBlocks()

// add player
const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)

// draw user
function drawUser() {
    user.style.left = currentPosition[0] + 'em'
    user.style.bottom = currentPosition[1] + 'em'
}
// draw ball
    function drawBall() {
        ball.style.left = ballCurrentPosition[0] + 'em'
        ball.style.bottom = ballCurrentPosition[1] + 'em'
    }

// movement controls
function moveUser(e) {
    switch(e.key) {
        case 'ArrowLeft':
            if (currentPosition[0] > 1) {
                currentPosition[0] -= 1
                drawUser()
            }
            break;

            case 'ArrowRight':
            if (currentPosition[0] < 49) {
                currentPosition[0] += 1
                drawUser()
            }
            break; 
    }
}

document.addEventListener('keydown', moveUser)

// spawn ball
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

// move ball

function moveBall() {
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    checkForCollisions()
}

timerId = setInterval(moveBall, 10)

// check for collisions
function checkForCollisions() {
    // check for walls
    if (
        ballCurrentPosition[0] >= 58 || 
        ballCurrentPosition[1] > 28 ||
        ballCurrentPosition[0] <= 1
    ) {
        changeDirection()
    }

    //check for game over
    if (ballCurrentPosition[1] <= 0) {
        clearInterval(timerId)
        scoreDisplay.innerHTML = 'GAME OVER'
        document.removeEventListener('keydown', moveUser)
    }
}

function changeDirection() {
    if (xDirection === 0.2 && yDirection === 0.2) {
        yDirection = -0.2
        return
    }
    if (xDirection === 0.2 && yDirection == -0.2) {
        xDirection = -0.2
        return
    }
    if (xDirection === -0.2 && yDirection == -0.2) {
        xDirection = 0.2
        return
    }
    if (xDirection === -0.2 && yDirection == 0.2) {
        xDirection = 0.2
        return
    }
}