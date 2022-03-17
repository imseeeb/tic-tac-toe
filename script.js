const TheGame = {
    gameMode: null,
    playerTurn: null,
    gameBoard: [],

    newGame(n){
        displayWinner.innerHTML='';
        this.gameBoard = [];
        clearBoard();
        this.gameMode = n;
        this.playerTurn = 1;
        disableButtons();
        boardDOM.addEventListener('click', placeMark);
    },

    nextTurn(){
        if(this.playerTurn == 1){
            this.playerTurn = 2;
            return
        }

        if(this.playerTurn == 2){
            this.playerTurn = 1;
            return
        }
    },

    storeToArray(player, position){
        this.gameBoard[position] = player;
    },

    checkResult(){
        // [0,1,2]
        // [3,4,5]
        // [6,7,8]

        let gb = this.gameBoard;
        if (gb[0] == gb[3] && gb[3] == gb[6] && gb[0] != null){

        }
        else if (gb[1] == gb[4] && gb[4] == gb[7] && gb[1] != null){

        }
        else if (gb[2] == gb[5] && gb[5] == gb[8] && gb[2] != null){

        }
        else if (gb[0] == gb[1] && gb[1] == gb[2] && gb[0] != null){

        }
        else if (gb[3] == gb[4] && gb[4] == gb[5] && gb[3] != null){

        }
        else if (gb[6] == gb[7] && gb[7] == gb[8] && gb[6] != null){
            this.thereIsAWinner();

            let offsets1 = document.querySelectorAll('.board>div')[6].getBoundingClientRect();
            let y1 = offsets1.top+55;
            let x1 = offsets1.left+35;

            let offsets2 = document.querySelectorAll('.board>div')[8].getBoundingClientRect();
            let y2 = offsets2.top+55;
            let x2 = offsets2.left+65;

            document.querySelector('svg').innerHTML = `<line x1="0" y1="0" x2="0" y2="0" />`;

            let line = document.querySelector('line');

            line.setAttribute('x1', x1);
            line.setAttribute('y1', y1);
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
        }
        else if (gb[0] == gb[4] && gb[4] == gb[8] && gb[0] != null){

        }
        else if (gb[2] == gb[4] && gb[4] == gb[6] && gb[2] != null){

        }
    },

    thereIsAWinner(){
        console.log("Player "+ this.playerTurn+ " won");
        boardDOM.removeEventListener('click', placeMark);

        if(this.playerTurn==1){
            displayWinner.innerHTML = "◯ WON!";
        }
        if(this.playerTurn==2){
            displayWinner.innerHTML = "✕ WON!";
        }
        enableButtons();
    }
}

// const GameBoard = ()=>{
// }

const Player = function(){

}

const playerOne = new Player();
const playerTwo = new Player();

let boardDOM = document.querySelector('.board'),
    playVsComp = document.querySelector('.playWithComputer'),
    playVsPlay = document.querySelector('.playWithPlayer'),
    displayWinner = document.querySelector('.winner');

playVsComp.addEventListener('click', ()=>{TheGame.newGame(0)});
playVsPlay.addEventListener('click',()=>{TheGame.newGame(1)});

function placeMark(e){
    if(e.target.parentNode.className != 'board' ||
    e.target.innerHTML != '') return

    let position = Array.from(e.target.parentNode.children).indexOf(e.target);
    let turnHolder = TheGame.playerTurn;

    e.target.classList.add('animateFlip');
    boardDOM.removeEventListener('click', placeMark);

    //sync letter placement with animation at 90deg
    setTimeout( ()=>{
        if (turnHolder == 1){
            e.target.innerHTML = '◯';
        }
        if (turnHolder == 2){
            e.target.innerHTML = '✕';
        }
    }, 250);

    setTimeout( ()=>{
        e.target.classList.remove('animateFlip');
        boardDOM.addEventListener('click', placeMark);
    }, 500)

    TheGame.storeToArray(turnHolder, position);
    TheGame.checkResult();
    TheGame.nextTurn();
}

function clearBoard(){
    let panels = document.querySelectorAll('.board>div');

    function clear(i){
        setTimeout( ()=>{
            panels[i].classList.add('animateFlip');
            setTimeout( ()=>{
                panels[i].innerHTML = '';
            }, 250)
            setTimeout( ()=>{
                panels[i].classList.remove('animateFlip');
            }, 500)
        }, i*50);
    }

    for(i=0;i<9;i++){
        clear(i);
    }
}

function disableButtons(){
    playVsComp.classList.add('inactiveButton');
    playVsPlay.classList.add('inactiveButton');
}

function enableButtons(){
    playVsComp.classList.remove('inactiveButton');
    playVsPlay.classList.remove('inactiveButton');
}