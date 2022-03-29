let array = [[0,0,0],[0,0,0],[0,0,0]]
let players = []

class Player {
    constructor(name, char){
        this.name = name
        this.char = char
        this.score = 0
    }
    
    incrementScore = () => this.score++
}

const setPlayers = (event) => {
    event.preventDefault()
    
    const player1 = new Player(event.target.player1.value.trim(), 'X')
    const player2 = new Player(event.target.player2.value.trim(), 'O')
    
    if(player1.name && player2.name){
        document.getElementById('form-container').classList.add('d-none')
        players.push(player1)
        players.push(player2)
        initGame()
    }
}

let activePlayer = 0
const activePlayerDiv = document.getElementById('active-player')

const initGame = () => {
    players.forEach( (player, index) => {
        document.getElementById(`player-${index}-name`).innerText = player.name
        document.getElementById(`player-${index}-score`).innerText = player.score
    })
    
    const gameWrapper = document.getElementById('game-wrapper')
    const trisContainer = document.getElementById('tris-container')
    
    gameWrapper.classList.remove('d-none')
    
    for (let i = 0; i < 3; i++) {
        let newRow = document.createElement("div");
        newRow.id = i
        
        for (let y = 0; y < 3; y++) {
            const newButton = document.createElement("button");
            newButton.classList.add('btn', 'btn-secondary', 'btn-game')
            newButton.id = i + '-' + y
            newButton.value = newRow.id + '-' + y
            newButton.onclick = (event) => handleClick(event.target.value);
            newRow.appendChild(newButton)
        }
        
        trisContainer.appendChild(newRow)
    }
    
    activePlayerDiv.innerText = players[activePlayer].name + ' is your turn !'
    
}

const stopGameAndShowResetButton = () => {
    const gameButtons = document.getElementsByClassName('btn-game')
    
    for (let button of gameButtons) {
        button.onclick = null
    }
    
    document.getElementById('next-match').classList.remove('d-none')
}

const handleClick = (value) => {
    const values = value.split('-')
    const rowValue = parseInt(values[0])
    const columnValue = parseInt(values[1])
    
    document.getElementById(value).innerText = players[activePlayer].char
    document.getElementById(value).onclick = null
    
    array[rowValue][columnValue] = players[activePlayer].char
    
    const gameStatus = checkGameStatus()
    
    if(gameStatus === 'X' || gameStatus === 'O'){
        activePlayerDiv.innerText = players[activePlayer].name + ' WIN!!!'
        players[activePlayer].incrementScore()
        document.getElementById(`player-${activePlayer}-score`).innerText = players[activePlayer].score
        stopGameAndShowResetButton()
    } else if(gameStatus ==='draw'){
        activePlayerDiv.innerText = 'DRAW !!!'
        stopGameAndShowResetButton()
    } else {
        activePlayer = activePlayer === 0 ? 1 : 0
        activePlayerDiv.innerText = players[activePlayer].name + ' is your turn !'
    }
}

const nextMatch = () => {
    array = [[0,0,0],[0,0,0],[0,0,0]]
    const gameButtons = document.getElementsByClassName('btn-game')
    for (let button of gameButtons) {
        button.onclick = (event) => handleClick(event.target.value)
        button.innerText = ''
    }
    document.getElementById('next-match').classList.add('d-none')
    activePlayerDiv.innerText = players[activePlayer].name + ' is your turn !'
}

const checkGameStatus = () => {
    
    let temp = array[0][0]
    
    for (let i = 1; i < 3 && temp; i++) {
        if(temp !== array[i][i]){
            break
        }
        if(i === 2){
            return temp
        }
    }
    
    temp = array[0][array[0].length - 1]
    
    for (let i = 1; i < 3 && temp; i++) {
        if(temp !== array[i][array[i].length - 1 - i]){
            break
        }
        if(i === 2){
            return temp
        }
    }
    
    for (let i = 0; i < 3; i++) {
        
        temp = array[i][0]
        
        for (let j = 0; j < 3 && temp; j++) {
            if(temp !== array[i][j]){
                break
            }
            if(j === 2){
                return temp
            }
        }
        
        temp = array[0][i]
        
        for (let j = 0; j < 3 && temp; j++) {
            if(temp !== array[j][i]){
                break
            }
            if(j === 2){
                return temp
            }
        }
        
    }
    
    let verifyIfEmptySlot = true
    
    for (let i = 0; i < 3 && verifyIfEmptySlot; i++) {
        for (let j = 0; j < 3 && verifyIfEmptySlot; j++) {
            if(!array[i][j]){
                verifyIfEmptySlot = false
            }
            if(i === 2 && j === 2){
                return 'draw'
            }
        }
    }
    
}