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
            if(this.gameMode == 0){
                this.playerTurn = 2;
                boardDOM.removeEventListener('click', placeMark);
                let position = aiMove();
                let selectedDiv = document.querySelectorAll('.board>div')[position];

                placeMark(undefined,selectedDiv);
                return;
            }

            this.playerTurn = 2;
            return
        }

        else if(this.playerTurn == 2){
            if(this.gameMode == 0){
                boardDOM.addEventListener('click', placeMark);
            }

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

function placeMark(e,efromAi){
    let selectedDiv;
    if(typeof(e) === 'undefined'){
        selectedDiv = efromAi;
    }
    else{
        selectedDiv = e.target;
    }

    if(selectedDiv.parentNode.className != 'board' ||
    selectedDiv.innerHTML != '') return

    let position = Array.from(selectedDiv.parentNode.children).indexOf(selectedDiv);
    let turnHolder = TheGame.playerTurn;

    selectedDiv.classList.add('animateFlip');
    boardDOM.removeEventListener('click', placeMark);

    //sync letter placement with animation at 90deg
    setTimeout( ()=>{
        if (turnHolder == 1){
            selectedDiv.innerHTML = '◯';
        }
        if (turnHolder == 2){
            selectedDiv.innerHTML = '✕';
        }
    }, 250);

    setTimeout( ()=>{
        selectedDiv.classList.remove('animateFlip');
        boardDOM.addEventListener('click', placeMark);

        TheGame.storeToArray(turnHolder, position);
        TheGame.checkResult();
        TheGame.nextTurn();
    }, 500)
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

    function findCommonElement(array1, array2) {
        let matchCounter = 0;
        for(let i =  0; i < array1.length; i++) {
            for(let j = 0; j < array2.length; j++) {   
                if(array1[i] == array2[j]) {
                    matchCounter+=1;
                }
            }
        }
        return matchCounter;
    }

    let player = 1,
        ai = 2;

    // [0,1,2]
    // [3,4,5]
    // [6,7,8]
    let winMoves=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    let playerMoves=[];
    let aiMoves=[];

    //find which moves the player (1s) has already made and save to playerMoves[]
    for(i=0; i<9; i++){
        if(TheGame.gameBoard[i]==player){
            playerMoves.push(i);
        }
    }

    //find which moves the ai (2s) has already made and save to aiMoves[]
    for(i=0; i<9; i++){
        if(TheGame.gameBoard[i]==ai){
            aiMoves.push(i);
        }
    }

    //combine player moves  and ai moves to movesTaken[]
    let movesTaken = playerMoves.concat(aiMoves);

    //based on the moves already made find if you have an opportunity to attack / finish your pattern
    for(i=0;i<winMoves.length;i++){
        let matchCounter = findCommonElement(winMoves[i],aiMoves);
        if (matchCounter == 2){ //if 2 out of 3 match react
            if(findCommonElement(winMoves[i],playerMoves)==0){ //check if opponent is not blocking your attack attempt
                let letsFinishThatHuman = winMoves[i];

                for(u=0; u<movesTaken.length; u++){ //filter out the unavailable moves (the ones that are already taken)
                    letsFinishThatHuman = letsFinishThatHuman.filter((n)=>{return n !== movesTaken[u]});
                }

                return letsFinishThatHuman[0]
            }
        }
    }   

    //based on the moves already made check if you have to defend / prevent opponent from finishing pattern in that round
    for(i=0;i<winMoves.length;i++){
        let matchCounter = findCommonElement(winMoves[i],playerMoves);
        if (matchCounter == 2){ //if 2 out of 3 match react
            if(findCommonElement(winMoves[i],aiMoves)==0){ //check if it's already defended 
                let defend = winMoves[i];

                for(u=0; u<movesTaken.length; u++){ //filter out the unavailable moves (the ones that are already taken)
                    defend = defend.filter((n)=>{return n !== movesTaken[u]});
                }

                return defend[0]
            }
        }
    }    

    //based on the moves already made find which winning moves is the opponent getting close to achieving
    let potentialMoves=[];

    for(i=0;i<winMoves.length;i++){
        let matchCounter = findCommonElement(winMoves[i],playerMoves);
        for(let m = 0; m<matchCounter; m++){
            potentialMoves.push(winMoves[i]);
            potentialMoves.push(winMoves[i]); //doubled just to give higher weight to defending against player potential movements rather than figuring out attacks in empty spots
        }
    }

    //consider also the available win combination that haven't got started yet (find empty winable combinations)
    for(i=0;i<winMoves.length;i++){
        if(findCommonElement(winMoves[i],movesTaken) === 0){
            potentialMoves.push(winMoves[i]);
        }
    }

    //remove from consideration opponent's wining combinations that are already blocked by AI position
    let indexToSplice = []

    for (let p = 0; p<potentialMoves.length; p++){
        if(findCommonElement(potentialMoves[p],aiMoves)>0){
            indexToSplice.push(p);
        }
    }

    indexToSplice.sort((a,b)=>b-a); // order descending to prevent index problems when using splice

    for(let s=0; s<indexToSplice.length; s++){
        potentialMoves.splice(indexToSplice[s],1);
    }

    //break the array of arrays into array of individual numbers
    let numbersToConsider = [].concat.apply([],potentialMoves);

    //filter out the unavailable moves (the ones that are already taken by someone)
    for(u=0; u<movesTaken.length; u++){
        numbersToConsider = numbersToConsider.filter((n)=>{return n !== movesTaken[u]});
    }

    //distribute the considered positions' numbers to an array based on how frequent they were suggested to make
    let frequencyArray = [0,0,0,0,0,0,0,0,0];
    for(i=0;i<9;i++){
        for(n=0;n<numbersToConsider.length;n++){
            if(numbersToConsider[n]==i){
                frequencyArray[i]=frequencyArray[i]+1;
            }
        }
    }

    //find the most suggested number
    let finalChoice = [];
    let max = Math.max(...frequencyArray);

    for(f=0;f<frequencyArray.length;f++){
        if(frequencyArray[f]==max){
            finalChoice.push(f);
        }
    }

    //make a move
    return finalChoice[0];
}