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
}

function showPreview() {
    if (this.dataset.piece) {
        this.classList.remove(this.dataset.piece)
    }
    this.style.setProperty('--preview-piece', `url('assets/pieces/${Selection.selectedPiece}.png')`);
    this.classList.add("preview")
}

function hidePreview() {
    this.classList.remove("preview")
    this.style.removeProperty('--preview-piece', `url('assets/pieces/${Selection.selectedPiece}.png')`);
    if (this.dataset.piece) {
        this.classList.add(this.dataset.piece)
    }
}

function makeMove() {
    this.classList.remove("preview")
    document.body.classList.remove('piece-selected')
    document.body.classList.add("selecting")
    document.querySelectorAll(".square").forEach((e) => {
        e.addEventListener('click', selectSquare)
        e.removeEventListener('mouseenter', showPreview)
        e.removeEventListener('mouseleave', hidePreview)
        e.removeEventListener('click', makeMove)
    })
    if (this.dataset.piece) { this.classList.remove(this.dataset.piece) }
    this.classList.add(Selection.selectedPiece)
    this.dataset.piece = Selection.selectedPiece
    Selection.selectedPiece = null;
}
function selectSquare() {
    let piece = this.dataset.piece;
    if (!piece) { return; }
    delete this.dataset.piece;
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
                square.dataset.piece = piece;
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

function createTestImg() {
    let img = document.createElement('img');
    img.src = "assets/pieces/black-bishop.png"
    return img;

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
