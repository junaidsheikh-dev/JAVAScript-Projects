 // const score = {      //(object created)
        //     wins : 0,
        //     loses : 0,
        //     ties : 0
        // };
        let score = (JSON.parse(localStorage.getItem('score'))) 
            || {wins : 0, loses : 0,   ties : 0} ;

        // if (!score) {            (!score = null)
        //     score = {
        //         wins : 0,
        //         loses : 0,
        //         ties : 0 };
        //      }

        // resultUpdate();
        
        updateScoreElem();


    function computerPicked () {
        const randomNumber = Math.random();
            
        if (randomNumber >= 0 && randomNumber < 1/3) {computerMove ='rock';} 
        else if (randomNumber >= 1/3 && randomNumber < 2/3) {computerMove ='paper';}
        else if (randomNumber >= 2/3 && randomNumber < 1) {computerMove = 'scissors';}
        return computerMove ;  
    }

    let autoPlaytooggled = false;
    let intervalID;
    function autoPlay(){
        if (!autoPlaytooggled){ 
            intervalID = setInterval(function() {
            const playerMove = computerPicked();
            playGame(playerMove)},2000)
            document.querySelector('.js-autoplay-button').innerHTML='Stop playing'
            autoPlaytooggled = true;
        } else{
            clearInterval(intervalID);
            document.querySelector('.js-autoplay-button').innerHTML='Auto play'
            autoPlaytooggled = false;
        };
    };
    

    function resetScore(){
        score.wins = 0; 
        score.loses = 0; 
        score.ties = 0 ; 
        localStorage.removeItem('score')
        updateScoreElem();
        clearInterval(intervalID);
    };


    document.body.addEventListener('keydown', (event) => {
        if(event.key === 'r'){playGame('rock');}
        else if(event.key === 'p'){playGame('paper');}
        else if(event.key === 's'){playGame('scissors');}
        else if(event.key === 'a'){autoPlay();}
        else if(event.key === ' '){resetScoreConfirmationElem();}
    });
    document.querySelector('.js-rock-button').addEventListener('click',() => {playGame('rock')});
    document.querySelector('.js-paper-button').addEventListener('click',() => {playGame('paper')});
    document.querySelector('.js-scissors-button').addEventListener('click',() => {playGame('scissors')});
    document.querySelector('.js-resetScore-button').addEventListener('click', () =>{resetScoreConfirmationElem()});
    document.querySelector('.js-autoplay-button').addEventListener('click', () =>{autoPlay()});
    // document.body.addEventListener('click', () => {hideConfirmation()});

    function playGame (playerMove) {
        const computerMove = computerPicked ();  
        let results = '';
        if (playerMove === 'scissors') {
            if (computerMove === 'rock') {results = 'You Lose';}
            else if (computerMove === 'paper') {results = 'You Win';}
            else if (computerMove === 'scissors') {results = 'Tie';}
        } 
        if (playerMove === 'paper') {
            if (computerMove === 'rock') {results = 'You Win';}
            else if (computerMove === 'paper') {results = 'Tie';}
            else if (computerMove === 'scissors') {results = 'You Lose';} 
        } 
        if (playerMove === 'rock') {
            if (computerMove === 'rock') {results = 'Tie';}
            else if (computerMove === 'paper') {results = 'You Lose';}
            else if (computerMove === 'scissors') {results = 'You Win';}
        }
        if (results === 'You Win') {score.wins += 1;}
        else if (results === 'You Lose') {score.loses += 1;}
        else if (results === 'Tie') {score.ties += 1;}

        localStorage.setItem('score',JSON.stringify(score));

        updateScoreElem();

        document.querySelector('.js-result').innerHTML = results;

        document.querySelector('.js-moves').innerHTML = `<b>You<img src="emoji/${playerMove}-emoji.png" class="css-icon"> <img src="emoji/${computerMove}-emoji.png" class="css-icon">Computer</b>`

        // alert(`You Picked: ${playerMove}. Computer Pciked: ${computerMove}. :Result ${results}!
        // Wins : ${score.wins} , Loses : ${score.loses} , Ties : ${score.ties}`);
    }


    function updateScoreElem(){
        document.querySelector('.js-score').innerHTML = `Wins : ${score.wins} , Loses : ${score.loses} , Ties : ${score.ties}`;
    };

    let resetScoreConfirmation = document.querySelector('.js-reset-score-confirmation')
    function resetScoreConfirmationElem (){
        resetScoreConfirmation.innerHTML = `Are you sure you want to reset the score <button class = "js-yes-button css-yes-button">Yes</button> <button class="js-no-button css-no-button">No</button>`

        document.querySelector('.js-yes-button').addEventListener('click', () =>{resetScore();
            hideConfirmation()});
        document.querySelector('.js-no-button').addEventListener('click', () =>{hideConfirmation()});

    };

    function hideConfirmation(){
        resetScoreConfirmation.innerHTML = ''
    };