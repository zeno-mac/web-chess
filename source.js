import Match from './engine.js';
const game = new Match();
const startingPosition = {
    11: 'wr', 21: 'wn', 31: 'wb',
    41: 'wq', 51: 'wk', 61: 'wb',
    71: 'wn', 81: 'wr', 12: 'wp',
    22: 'wp', 32: 'wp', 42: 'wp',
    52: 'wp', 62: 'wp', 72: 'wp',
    82: 'wp', 17: 'bp', 27: 'bp',
    37: 'bp', 47: 'bp', 57: 'bp',
    67: 'bp', 77: 'bp', 87: 'bp',
    18: 'br', 28: 'bn', 38: 'bb',
    48: 'bq', 58: 'bk', 68: 'bb',
    78: 'bn', 88: 'br'
};
const pieces = ['wr', 'wn', 'wb', 'wq', 'wk', 'wp', 'br', 'bn', 'bb', 'bq', 'bk', 'bp'];
const squarePrefix = "square-"
let Selection = {
    selectedPiece: null,
    startingPosition: null,
}

function showPreview() {
    let position = this.dataset.square
    let piece = game.getPiece(position)
    if (piece) {
        this.classList.remove(piece)
    }
    if (game.isValid(Selection.selectedPiece, Selection.startingPosition, this.dataset.square)) {
        this.style.setProperty('--outline-color', `green`)
    } else {
        this.style.setProperty('--outline-color', 'red')
    }
    this.style.setProperty('--preview-piece', `url('assets/pieces/${Selection.selectedPiece}.png')`);
    this.classList.add("preview")
}

function hidePreview() {
    this.classList.remove("preview")
    let position = this.dataset.square
    let piece = game.getPiece(position)
    this.style.removeProperty('--preview-piece', `url('assets/pieces/${Selection.selectedPiece}.png')`);
    if (piece && position != Selection.startingPosition) {
        this.classList.add(piece )
    }
}

function makeMove() {
    if (!game.isValid(Selection.selectedPiece, Selection.startingPosition, this.dataset.square)) { return }
    let position = this.dataset.square
    let piece = game.getPiece(position)
    this.classList.remove("preview")
    document.body.classList.remove('piece-selected')
    document.body.classList.add("selecting")
    document.querySelectorAll(".square").forEach((e) => {
        e.addEventListener('click', selectSquare)
        e.removeEventListener('mouseenter', showPreview)
        e.removeEventListener('mouseleave', hidePreview)
        e.removeEventListener('click', makeMove)
    })
    if (piece) { this.classList.remove(piece) }
    this.classList.add(Selection.selectedPiece)
    if (Selection.startingPosition != this.dataset.square) {
        game.makeMove(Selection.selectedPiece, Selection.startingPosition, position)
    }
    document.querySelector('.selection-start').classList.remove("selection-start")
    Selection.selectedPiece = null;
    Selection.startingPosition = null;
}
function selectSquare() {
    let position = this.dataset.square
    let piece = game.getPiece(position);
    console.log(piece)
    if (!piece) { return; }
    if (piece[0] != game.currentTurn) { return }

    this.classList.add("selection-start")
    Selection.startingPosition = position;
    Selection.selectedPiece = piece;
    this.classList.remove(piece)

    document.body.classList.remove("selecting")
    document.body.classList.add('piece-selected')
    document.querySelectorAll(".square").forEach((e) => {
        e.addEventListener('mouseenter', showPreview)
        e.addEventListener('mouseleave', hidePreview)
        e.addEventListener('click', makeMove)
        e.removeEventListener('click', selectSquare)
    })
    showPreview.call(this)
}




function fillChessboard() {
    let chessboard = document.getElementById("chessboard")
    for (let rank = 0; rank < 8; rank++) {
        for (let file = 1; file < 9; file++) {
            let square = document.createElement('div');
            if ((rank + file) % 2 == 0) {
                square.style.backgroundColor = '#f0d9b5';
            } else {
                square.style.backgroundColor = "#b58863";
            }
            let notation = (file) * 10 + 8 - rank
            let piece = startingPosition[notation];
            if (piece) {
                square.classList.add(piece)
            }
            square.dataset.square = notation
            square.classList.add("square")
            square.classList.add(squarePrefix + notation)
            square.addEventListener('click', selectSquare)
            chessboard.appendChild(square);
        }
    }
    document.body.classList.add("selecting")

}



function createPieceStyles() {
    const style = document.createElement('style');
    let css = '';
    pieces.forEach(piece => {
        css += `
        .${piece} { 
            background-image: url('assets/pieces/${piece}.png');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
        }
        `;
    });

    style.textContent = css;
    document.head.appendChild(style);
}

function preloadImages() {
    pieces.forEach(piece => {
        const img = new Image();
        img.src = `assets/pieces/${piece}.png`;
    });
}

window.onload = (e) => {
    preloadImages()
    createPieceStyles()
    fillChessboard()
}
