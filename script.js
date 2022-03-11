
(function() {
    var gameBoard = {
        playerChoice: [],
        computerChoice: [],
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
            if (e.innerHTML === "") {
                e.innerHTML += "X";
            } else {
                console.log("not empty")
            }
        },
        addComputerChoice: function() {s

        },
        announceWinner: function() {

        },
        restartGame: function() {
            this.boxStatus.innerHTML = "";
        },
    };
    gameBoard.init();
})();

// document.querySelector("#tables").addEventListener("click", (e) => {
//     console.log(e.target)
// })

// PLAYERS ARE STORED AS OBJECTS

// OBJECT TO CONTROL THE FLOW OF THE GAME

// RENDER FUNCTION

// LET PLAYER ADD MARK TO SPECIFIC SPOT ON THE BOARD

// CHECK FOR 3-IN-A-ROW AND ANNOUNCE WINNER OR TIE

// CREATE COMPUTER AI