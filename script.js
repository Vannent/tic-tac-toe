
(function() {
    var gameBoard = {
        board: [],
        human: "X",
        computer: "O",
        winConditions: [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], 
            [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]
        ],
        choices: Array.from(Array(9).keys()),
        choiceCheck: false,
        init: function() {
            this.cacheDOM();
            this.bindEvents();
            this.render();
        },
        cacheDOM: function() {
            this.restartButton = document.querySelector("button");
            this.cells = document.querySelectorAll(".cell");
            this.gameend = document.querySelector(".endgame");
        },
        bindEvents: function() {
            this.restartButton.addEventListener("click", (e) => this.restartGame());
            for (let i = 0; i < this.cells.length; i++) {
                this.cells[i].addEventListener("click", this.addPlayerChoice.bind(this), false);
            };
        },
        render: function() {

        },
        addPlayerChoice: function(e) {
            this.handleChoice(e.target.id, this.human);
        },
        addComputerChoice: function() {
        },
        handleChoice: function(eId, player) {
            this.board[eId] = player;
            this.cell = document.getElementById(eId).innerHTML = player;
        },
        announceWinner: function() {
            this.gameend.style.display = "flex";
        },
        restartGame: function() {
            for (let i = 0; i < this.cells.length; i++) {
                this.cells[i].innerHTML = "";
            };
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