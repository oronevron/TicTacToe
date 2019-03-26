import React from "react";
import Board from "../Board/Board";
import "./Game.css";
import oImage from "../../assests/o.svg";
import RestartImage from "../../assests/restart.svg";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cells: Array(9).fill(null),
            xIsNext: true,
            xNumOfWins: 0,
            oNumOfWins: 0
        };
    }

    handleClick = (i) => {
        const cells = [...this.state.cells];
        if (!this.calculateWinner(cells) && !cells[i]) {
            cells[i] = this.state.xIsNext ? 'X' : 'O';
            this.setState(state => ({
                cells: cells,
                xIsNext: !state.xIsNext,
            }),
                () => {
                    const winner = this.calculateWinner(this.state.cells);
                    if (winner) {
                        this.handleWinSituation(winner);
                    }
                }
            );
        }
    }

    handleWinSituation(winner) {
        if (winner === 'X') {
            this.setState(state => ({
                xNumOfWins: state.xNumOfWins + 1
            }));
        } else {
            this.setState(state => ({
                oNumOfWins: state.oNumOfWins + 1
            }));
        }
    }

    onResetClick = () => {
        this.setState({
            cells: Array(9).fill(null),
            xIsNext: true
        });
    }

    isPlayerWon = (cells, playerMark) => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winConditions.some((threeInARow) => {
            return threeInARow.every((square) => {
                return cells[square] === playerMark;
            });
        });
    }

    calculateWinner = (cells) => {
        let winner = null;
        if (this.isPlayerWon(cells, 'X')) {
            winner = 'X';
        } else if (this.isPlayerWon(cells, 'O')) {
            winner = 'O';
        }

        return winner;
    }

    render() {
        return (
            <div className="game">
                <h1 className="game-title">
                    Tic - Tac - Toe
                </h1>
                <div className="game-players-bar-container">
                    <h4 className="game-players-bar-text">
                        Player 1
                    </h4>
                    <div className="game-players-bar-image-container">
                        <img
                            src={oImage}
                            className={`game-players-bar-image ${this.state.xIsNext ? "game-players-bar-image-player1" : "game-players-bar-image-player2"}`}
                        />
                    </div>
                    <h4 className="game-players-bar-text">
                        Player 2
                    </h4>
                </div>
                <div className="game-board">
                    <Board
                        cells={this.state.cells}
                        onClick={i => this.handleClick(i)}
                    />
                </div>
                <div className="game-footer-container">
                    <div className="game-winners-bar-container">
                        <div className="game-winners-bar-player-container">
                            <div> Player 1: </div>
                            <div className="game-winners-bar-player-score">
                                {this.state.xNumOfWins}
                            </div>
                        </div>
                        <div className="game-winners-bar-delimiter"></div>
                        <div className="game-winners-bar-player-container">
                            <div> Player 2: </div>
                            <div className="game-winners-bar-player-score">
                                {this.state.oNumOfWins}
                            </div>
                        </div>
                    </div>
                    <div
                        className="game-reset-button-container"
                        onClick={this.onResetClick}
                    >
                        <img
                            src={RestartImage}
                            className="game-reset-button-image"
                        />
                        RESET
                    </div>
                </div>
            </div >
        );
    }
}

export default Game;