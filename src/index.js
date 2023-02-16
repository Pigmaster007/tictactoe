const table = document.getElementsByTagName('td');
let playerWinCounter = 0;
let computerWinCounter = 0;
let tieCounter = 0;


/*Add 'X' to game field starts*/
for (let i = 0; i<table.length; i++) {
    table[i].addEventListener('click', e => {
        if(table[i].innerText == '') {
            table[i].innerText = 'X'
            setTimeout(compMuve, 250);  //computer move here
            setTimeout (mainCheck, 501);
            setTimeout(tieTimer, 600);
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
function compMuve () {
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

let j = getRndInteger(0, table.length);

    if (table[j].innerText == '') {
        table[j].innerText = 'O'
    } else {
        j = getRndInteger(0, table.length)
        compMuve()
    }
}
/* Computer moves code ends*/

/* Game logic starts */

function tieTimer () {
    if ((alarmWindow.innerText != 'Player WON!')&&
        (alarmWindow.innerText != 'Computer WON!')
        &&(([...table].filter((item) => {
            item.innerText != ''
            return table.length
        })) == '9')) {
        alarmWindow.style.display = 'flex'
        alarmWindow.innerHTML = `<h1>` + `TIE!` + `</h1>`;
        tieCounter++;
        document.getElementById('tie').innerText = 'Tie' + '(' + tieCounter +')';
    }
}


// let newTable = []


// function tieTimer () {
    
//     newTable = [...table].filter((item) => {
//         return item.innerText != ''
//     })
            
//     if ((alarmWindow.innerText != 'Player WON!')&&
//     (alarmWindow.innerText != 'Computer WON!')){

//         if (newTable.length == 9)
//         {
//             alarmWindow.style.display = 'flex'
//             alarmWindow.innerHTML = `<h1>` + `TIE!` + `</h1>`;
//             tieCounter++;
//             document.getElementById('tie').innerText = 'Tie' + '(' + tieCounter +')';
//         }
//     }
// }


function checkForWin (a, b, c) {
    if ((table[a].innerText == table[b].innerText)&&
        (table[b].innerText == table[c].innerText)&&
        (table[c].innerText == 'X')) {
        alarmWindow.style.display = 'flex'
        alarmWindow.innerHTML = `<h1>` + `Player WON!` + `</h1>`;
        playerWinCounter++;
        document.getElementById('firstWin').innerText = 'Player' + '(' + playerWinCounter +')';  
    } else if ((table[a].innerText == table[b].innerText)&&
               (table[b].innerText == table[c].innerText)&&
               (table[c].innerText == 'O')) {
        alarmWindow.style.display = 'flex'
        alarmWindow.innerHTML = `<h1>` + `Computer WON!` + `</h1>`;
        computerWinCounter++; 
        document.getElementById('secondWin').innerText = 'Computer' + '(' + computerWinCounter + ')';
    }
}

function mainCheck () {
    
        checkForWin(0, 1, 2),
        checkForWin(3, 4, 5),
        checkForWin(6, 7, 8),
        checkForWin(0, 3, 6),
        checkForWin(1, 4, 7),
        checkForWin(2, 5, 8),
        checkForWin(0, 4, 8),
        checkForWin(2, 4, 6)
}
/* Game logic ends */