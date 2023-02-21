const arr = document.getElementsByTagName('td');
const table = [...arr];
let playerWinCounter = 0;
let computerWinCounter = 0;
let tieCounter = 0;


/*Add 'X' to game field starts*/
for (let i = 0; i<table.length; i++) {
    table[i].addEventListener('click', e => {
        if(table[i].innerText == '') {
            table[i].innerText = 'X';
            setTimeout(compMuve, 200);  //computer move here
            setTimeout (checkForWin, 300); //checking combinations
            setTimeout(tieTimer, 350);  //TIE check
        }
    })
}
/*Add 'X' to game field ends*/

/*Switching from 1 to 2 users block (need to be done) starts*/
const players = document.getElementById('players');

players.addEventListener('click', e => {
    if (players.innerText == '1 player') {
        players.innerText = '2 players'
        document.getElementById('secondWin').innerText = 'Player 2' + '(' + computerWinCounter + ')'
    } else {
        players.innerText = '1 player'
        document.getElementById('secondWin').innerText = 'Computer' + '(' + computerWinCounter + ')'
    }
});
/*Switching from 1 to 2 users block (need to be done) ends*/

/* window with "press to start statement" starts*/
const alarmWindow = document.getElementById('alarm');

alarmWindow.addEventListener('click', e =>{
    alarmWindow.style.display = 'none'
    alarmWindow.innerHTML = `<h1>` + `PRESS TO START` + `</h1>`;
    for (let i=0; i<table.length; i++) {
        table[i].innerText = ''
    }
})
/* window with "press to start statement" ends*/

/* Computer moves code starts*/
function emptyCellsCheck () {
    return table.some(el => el.innerText === '');
}

function compMuve () {
        function getRndInteger(min, max) {
            return Math.floor(Math.random() * (max - min) ) + min;
        }

let j = getRndInteger(0, table.length);

    if (table[j].innerText == '') {
        table[j].innerText = 'O'
    } else {
        j = getRndInteger(0, table.length)    
        if ((emptyCellsCheck())==true) {
            compMuve()
        }
    }
}
/* Computer moves code ends*/

/* Game logic starts */

function tieTimer () {
    if ((alarmWindow.innerText != 'Player WON!')&&
        (alarmWindow.innerText != 'Computer WON!')
        &&(emptyCellsCheck()) == false) {
        alarmWindow.style.display = 'flex'
        alarmWindow.innerHTML = `<h1>` + `TIE!` + `</h1>`;
        tieCounter++;
        document.getElementById('tie').innerText = 'Tie' + '(' + tieCounter +')';
    }
}

const winLines = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], //horisontal lines
                   [0, 3, 6], [1, 4, 7], [2, 5, 8], //vertical lines
                   [0, 4, 8], [2, 4, 6] ] //diagonal lines

function winCheck(player) {
     return winLines.some(line => line.every(cell => table[cell].innerText === player));
}

function checkForWin () {
    if ((winCheck('X'))== true) {
        alarmWindow.style.display = 'flex'
        alarmWindow.innerHTML = `<h1>` + `Player WON!` + `</h1>`;
        playerWinCounter++;
        document.getElementById('firstWin').innerText = 'Player' + '(' + playerWinCounter +')';  
        return true;
    } else if ((winCheck('O'))== true) {
        alarmWindow.style.display = 'flex'
        alarmWindow.innerHTML = `<h1>` + `Computer WON!` + `</h1>`;
        computerWinCounter++; 
        document.getElementById('secondWin').innerText = 'Computer' + '(' + computerWinCounter + ')';
        return true;
    } else {
        return false;
    }
}
/* Game logic ends */