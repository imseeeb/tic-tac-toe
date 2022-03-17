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

        else if(this.playerTurn == 2){
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
            this.thereIsAWinner();
            drawCrossOut(0, 6);
        }
        else if (gb[1] == gb[4] && gb[4] == gb[7] && gb[1] != null){
            this.thereIsAWinner();
            drawCrossOut(1, 7);
        }
        else if (gb[2] == gb[5] && gb[5] == gb[8] && gb[2] != null){
            this.thereIsAWinner();
            drawCrossOut(2, 8);
        }
        else if (gb[0] == gb[1] && gb[1] == gb[2] && gb[0] != null){
            this.thereIsAWinner();
            drawCrossOut(0, 2);
        }
        else if (gb[3] == gb[4] && gb[4] == gb[5] && gb[3] != null){
            this.thereIsAWinner();
            drawCrossOut(3, 5);
        }
        else if (gb[6] == gb[7] && gb[7] == gb[8] && gb[6] != null){
            this.thereIsAWinner();
            drawCrossOut(6, 8);
        }
        else if (gb[0] == gb[4] && gb[4] == gb[8] && gb[0] != null){
            this.thereIsAWinner();
            drawCrossOut(0, 8);
        }
        else if (gb[2] == gb[4] && gb[4] == gb[6] && gb[2] != null){
            this.thereIsAWinner();
            drawCrossOut(2, 6);
        }
        else if(gb[0] && gb[1] && gb[2] && gb[3] && gb[4] && gb[5] && gb[6] && gb[7] && gb[8] != null){
            console.log("draw!");
            boardDOM.removeEventListener('click', placeMark);
            displayWinner.innerHTML = "It's a draw!";
            enableButtons();
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
    document.querySelector('svg').innerHTML = '';
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

function drawCrossOut(from, to){
    let offsets1 = document.querySelectorAll('.board>div')[from].getBoundingClientRect();
    let y1 = offsets1.top+50;
    let x1 = offsets1.left+50;

    let offsets2 = document.querySelectorAll('.board>div')[to].getBoundingClientRect();
    let y2 = offsets2.top+50;
    let x2 = offsets2.left+50;

    document.querySelector('svg').innerHTML = `<line x1="0" y1="0" x2="0" y2="0" />`;

    let line = document.querySelector('line');

    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
}

function aiMove(){
    // [0,1,2]
    // [3,4,5]
    // [6,7,8]

    let player = 1,
        ai = 2;

    let winMoves=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ],

    opponentState=[],
    aiState=[];
    let potentialMoves=[0,0,0];
    console.log('potentialMoves');
    console.log(potentialMoves);

    for(i=0; i<9; i++){
        if(TheGame.gameBoard[i]==1){
            opponentState.push(i);
        }
    }
    console.log('opponentState');
    console.log(opponentState);

    for(i=0; i<9; i++){
        if(TheGame.gameBoard[i]==2){
            aiState.push(i);
        }
    }

    console.log('aiState');
    console.log(aiState);

    let movesTaken = opponentState.concat(aiState);
    
    console.log('movesTaken');
    console.log(movesTaken);

    for(i=0;i<opponentState.length;i++){
        for(w=0;w<8; w++){
            for(m=0;m<3;m++){
                console.log(winMoves[w]);
                if(winMoves[w][m]==opponentState[i]){
                    console.log('asd');
                    potentialMoves.push(winMoves[w]);
                    console.log(potentialMoves);
                    break;
                }
            }
        }
    }

    let indexToSplice = []

    for(a=0;a<aiState.length;a++){
        for(t=0;t<potentialMoves.length;t++){
            for(m=0;m<3;m++){
                if(potentialMoves[t][m]==aiState[a]){
                    indexToSplice.push(t);
                    break;
                }
            }
        }
    }

    console.log('indexToSplice');
    console.log(indexToSplice);

    for(s=0;s<indexToSplice.length;s++){
        potentialMoves.splice(s,1);
    }

    console.log('potentialMoves');
    console.log(potentialMoves);

    let numbersToConsider = [].concat.apply([],potentialMoves);

    console.log('numbersToConsider');
    console.log(numbersToConsider);

    for(u=0; u<movesTaken.length; u++){
        numbersToConsider = numbersToConsider.filter((n)=>{return n !== movesTaken[u]});
    }


    console.log('numbersToConsider');
    console.log(numbersToConsider);

}

let asd=[]