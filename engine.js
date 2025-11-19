class Match {
    constructor() {
        this.currentTurn = 'w'
        this.fillBoard()
    }
    isValid(piece, startingPosition, endPosition) {
        if (piece[0] != this.currentTurn) { return false }
        let sFile = Math.floor(startingPosition / 10);
        let sRank = startingPosition % 10;
        let eFile = Math.floor(endPosition / 10);
        let eRank = endPosition % 10;
        switch (piece[1]) {
            case 'r':
                return ((eRank == sRank) || (eFile == sFile))
            default:
                return true
        }
    }
    getTurn() {
        return this.currentTurn;
    }
    makeMove(piece, startPosition, endPosition) {
        //TODO logic of the game
        this.setPiece(piece, endPosition)
        this.removePiece(startPosition)
        this.changeTurn()
    }
    changeTurn() {
        if (this.currentTurn == 'w') { this.currentTurn = 'b' }
        else { this.currentTurn = 'w' }
    }
    fillBoard() {
        this.Board = [
            ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr'],
            ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
            ['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
        ]
    }
    getPiece(position){
        let file = Math.floor(position / 10) -1;
        let rank = (position % 10) -1;
        return this.Board[rank][file]
    }
    setPiece(piece, position){
        let file = Math.floor(position / 10) -1;
        let rank = (position % 10) -1;
        this.Board[rank][file] = piece;
    }
    removePiece(position){
        this.setPiece(null,position)
    }
}



export default Match;