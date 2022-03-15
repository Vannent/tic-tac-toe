
(function() {
    var gameBoard = {
        board: [],
        human: "X",
        computer: "O",
        winConditions: [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], 
            [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]
        ],
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
            this.board = Array.from(Array(9).keys());
        },
        addPlayerChoice: function(e) {
            if (this.choiceCheck == true) return;
            if (typeof this.board[e.target.id] == "number") {
                this.handleChoice(e.target.id, this.human);
                if (!this.CheckTie()) this.handleChoice(this.addComputerChoice(), this.computer);
            }
        },
        addComputerChoice: function() {
            return this.emptySquares()[0];
        },
        handleChoice: function(eId, player) {
            this.board[eId] = player;
            this.cell = document.getElementById(eId).innerHTML = player;
            let gameWon = this.checkWin(this.board, player);
            if (gameWon) this.gameOver(gameWon);
        },
        checkWin: function(board, player) {
            let plays = board.reduce((a, e , i) => 
                (e === player) ? a.concat(i) : a, []);
            let gameWon = null;
            for (let [index, win] of this.winConditions.entries()) {
                if (win.every(elem => plays.indexOf(elem) > -1)) {
                    gameWon = {index: index, player: player};
                    break; // Checks if player has the WinConditions.
                }
            }
            return gameWon;
        },
        CheckTie: function() {
            if (this.emptySquares().length == 0) {
                for (let i = 0; i < this.cells.length; i++) {
                    this.choiceCheck = true
                }
                this.announceWinner("Tie Game!");
                return true;
            }
            return false;
        },
        emptySquares: function() {
            return this.board.filter(s => typeof s == "number")
        },
        gameOver: function(gameWon) {
            for (let index of this.winConditions[gameWon.index]) {
                document.getElementById(index).style.color =
                gameWon.player == this.human ? "#75EDBF" : "#ed9175";
                this.choiceCheck = true;
            }
            this.announceWinner(gameWon.player == this.human ? "You win!" : "You lose.")
        },
        announceWinner: function(winner) {
            this.gameend.style.display = "flex";
            this.gameend.innerHTML = winner;
        },
        restartGame: function() {
            this.board = Array.from(Array(9).keys());
            for (let i = 0; i < this.cells.length; i++) {
                this.cells[i].innerHTML = "";
                this.cells[i].style.removeProperty("color");
            };
            this.choiceCheck = false;
            this.gameend.style.display = "none";
        },
    };
    gameBoard.init();
})();


// RENDER FUNCTION

// LET PLAYER ADD MARK TO SPECIFIC SPOT ON THE BOARD

// CHECK FOR 3-IN-A-ROW AND ANNOUNCE WINNER OR TIE

// CREATE COMPUTER AI