/*
Think
1. Button CLick - Attach Event on Button
    Event (click , keypress , drag/drop)
    Listener
    Action
2. Print X or O
    We have 9 buttons , we need to attache events to all 9 buttons , need to listen to the event and take the action

how i find out which button is click out of 9 buttons, because every button
is calling the same function - using this operator

------------------------ H.w -------------------------------------------------
1. Add - FInd out the Win and Lose 
2. Find out the Draw Condition
3. Build the reset feature
4. once game over reset after 5 sec, it show countdown then reset

*/


const buttons = document.getElementsByTagName('button'); // Since buttons do not change we use const instead of var
console.log('All Buttons ', buttons.length);
for (let i=0;i<buttons.length;i++) {
    // 'click' is the name of the event and printXorZero is the name of the callback funciton jo click pe invoke hoga
    // callback is always lazy
    buttons[i].addEventListener('click', function(){ printXorZero(i); });
}
// Agr me let ki jgah var use krunga to because var ka scope throughout the function they are declared in
// hm correct value of i pass hi ni kr payenge because i ka scope poori script me h to agr hm i pass krenge
// function me to wo i ki value jo use krega to loop khatam hone ke baad wali krega which is buttons.lenght = 9
// 9 se row aur col 3,0 aayega which is undefined as no such button exists
// Let and const are block scoped st their scope is only inside their curly brackets
// Whereas var is globally scoped
// Doesnt matter if i store value of i in index variable it still takes it to undefined , hence if we need index we have to use let if we want
// to pass the index
// for (var i = 0; i < buttons.length; i++) {
//     buttons[i].addEventListener('click', function() {
//                                             let index = i;
//                                             printXorZero(buttons[index],index); 
//                                         });
// }

var flag = true, count = 0, isPlaying = true;
var board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

function printXorZero(index) {
    // this - keyword (current calling object ka reference lake deta h)
    // console.log('printXorZero calls', this);
    // const currentButton = this;
    const currentButton = buttons[index];
    // const currentButton = btn;
    var row = Math.floor(index / 3);
    var col = index % 3;
    if (isPlaying && currentButton.innerText.trim().length == 0) {
        currentButton.innerText = flag ? "X" : "O";
        board[row][col] = flag ? "X" : "O";
        flag = !flag;
        count++;
        if (count > 4) {
            var decided =  checkForWinner(row,col);
            if (decided || count == 9) {
                isPlaying = false;
                var result = document.getElementById('result');
                if (decided) result.innerText = "The winner is " + board[row][col];
                else result.innerText = "The Game ends in a draw";
                countDown();
            }
        }
    }
}

function countDown() {
    var countdown = 5;
    var resetCountdown = document.getElementById('resetCountdown');
    const interval =  setInterval( function() {
        resetCountdown.innerText = "Resetting in " + countdown + "...";
        countdown--;
        if (countdown < 0) {
            // Since setInterval is an async process it keeps on going with the rest of the processes
            // Until we do clearrInterval
            clearInterval(interval);
            reset();
        }
    }, 1000);
}

function reset() {
    flag = true;
    count = 0;
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    for (let i=0;i<buttons.length;i++) {
        buttons[i].innerText = '';
    }
    isPlaying = true;
    result.innerText = '';
    resetCountdown.innerText = '';
}

function checkForWinner(row,col) {
    // checking row
    if (board[row][0] == board[row][1] && board[row][1] == board[row][2]) return true;
    // Checking col
    else if (board[0][col] == board[1][col] && board[1][col] == board[2][col]) return true;
    // Checking diagonals
    else if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != '') return true;
    else if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][0] != '') return true;

    return false;
}