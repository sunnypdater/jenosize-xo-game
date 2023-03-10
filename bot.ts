type Move = [number, number];

class Bot {
  private player: string;
  
  constructor(player: string) {
    this.player = player;
  }
  
  getNextMove(board: Board): Move {
    const possibleMoves: Move[] = [];
    
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (!board[i][j]) {
          possibleMoves.push([i, j]);
        }
      }
    }
    
    const randomMoveIndex = Math.floor(Math.random() * possibleMoves.length);
    
    return possibleMoves[randomMoveIndex];
  }
}
