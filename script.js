
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
            return this.minimax(this.board, this.computer).index;
        },
        minimax: function(newBoard, player) {
            let availableSpots = this.emptySquares(newBoard);

            if (this.checkWin(newBoard, player)) {
                return {score: -10}
            } else if (this.checkWin(newBoard, this.computer)) {
                return {score: 20}
            } else if (availableSpots.length === 0) {
                return {score: 0};
            } // check for terminal states.
            
            let moves = [];
            for (let i = 0; i < availableSpots.length; i++) {
                let move = {};
                move.index = newBoard[availableSpots[i]];
                newBoard[availableSpots[i]] = player; // places ai player into first empty spot.

                if (player === this.computer) {
                    let result = this.minimax(newBoard, this.human)
                    move.score = result.score;
                } else {
                    let result = this.minimax(newBoard, this.computer)
                    move.score = result.score;
                }

                newBoard[availableSpots[i]] = move.index;

                moves.push(move);
            }

            let bestMove;
            if (player === this.computer) {
                let bestScore = -10000;
                for (let i = 0; i < moves.length; i++) {
                    if (moves[i].score > bestScore) {
                        bestScore = moves[i].score;
                        bestMove = i;
                    }
                }
            } else {
                let bestScore = 10000;
                for (let i = 0; i < moves.length; i++) {
                    if (moves[i].score < bestScore) {
                        bestScore = moves[i].score;
                        bestMove = i;
                    }
                }
            }

            return moves[bestMove];
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
            if (this.emptySquares().length === 0) {
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