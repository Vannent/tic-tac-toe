
(function() {
    var gameBoard = {
        playerChoice: [],
        computerChoice: [],
        choice: false,
        init: function() {
            this.cacheDOM();
            this.bindEvents();
            this.render();
        },
        cacheDOM: function() {
            this.boxStatus = document.getElementById("box");
            this.table = document.querySelector("#tables");
            this.restartButton = document.querySelector("button");
        },
        bindEvents: function() {
            this.table.addEventListener("click", (e) => this.addPlayerChoice(e.target));
            this.restartButton.addEventListener("click", (e) => this.restartGame());
        },
        render: function() {

        },
        addPlayerChoice: function(e) {
            if (e.innerHTML === "" && this.choice == false) {
                e.innerHTML += "X";
                this.choice = true;
                // addComputerChoice();
            } else if (e.innerHTML === "" && this.choice == true) {
                e.innerHTML += "O";
                this.choice = false;
            } else {
                console.log("not empty")
            }
        },
        addComputerChoice: function() {

        },
        announceWinner: function() {

        },
        restartGame: function() {
        },
    };
    gameBoard.init();
})();


// PLAYERS ARE STORED AS OBJECTS

// OBJECT TO CONTROL THE FLOW OF THE GAME

// RENDER FUNCTION

// LET PLAYER ADD MARK TO SPECIFIC SPOT ON THE BOARD

// CHECK FOR 3-IN-A-ROW AND ANNOUNCE WINNER OR TIE

// CREATE COMPUTER AI