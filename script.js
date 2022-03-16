const TheGame = {
    gameMode: null,
    playerTurn: 1,
    gameBoard: [],

    newGame(n){
        this.gameBoard = [];
        clearBoard();
        this.gameMode = n;
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
        if (gb[0] == gb[3] && gb[3] == gb[6] && gb[0] != null||
            gb[1] == gb[4] && gb[4] == gb[7] && gb[1] != null||
            gb[2] == gb[5] && gb[5] == gb[8] && gb[2] != null||
            gb[0] == gb[1] && gb[1] == gb[2] && gb[0] != null||
            gb[3] == gb[4] && gb[4] == gb[5] && gb[3] != null||
            gb[6] == gb[7] && gb[7] == gb[8] && gb[6] != null||
            gb[0] == gb[4] && gb[4] == gb[8] && gb[0] != null||
            gb[2] == gb[4] && gb[4] == gb[6] && gb[2] != null){
                console.log("Player "+ this.playerTurn+ " won")
            }
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
    playVsPlay = document.querySelector('.playWithPlayer');

boardDOM.addEventListener('click', placeMark);
playVsComp.addEventListener('click', ()=>{TheGame.newGame(0)});
playVsPlay.addEventListener('click',()=>{TheGame.newGame(1)});

function placeMark(e){
    if(e.target.parentNode.className != 'board' ||
    e.target.innerHTML != '') return

    let position = Array.from(e.target.parentNode.children).indexOf(e.target);

    e.target.classList.add('animateFlip');

    //sync letter placement with animation at 90deg
    setTimeout( ()=>{
        if (TheGame.playerTurn == 1){
            e.target.innerHTML = '✕';
            TheGame.storeToArray(1);
        }
        if (TheGame.playerTurn == 2){
            e.target.innerHTML = '◯';
            TheGame.storeToArray(2);
        }
    }, 250);

    setTimeout( ()=>{
        e.target.classList.remove('animateFlip');
    }, 500)

    TheGame.storeToArray(TheGame.playerTurn, position);
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