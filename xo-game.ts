type Board = (string | null)[][];

class Game {
  private board: Board;
  private currentPlayer: string;
  private readonly player1: string = "X";
  private readonly player2: string = "O";
  private readonly bot: Bot;

  constructor() {
    this.board = [[null, null, null], [null, null, null], [null, null, null]];
    this.currentPlayer = this.player1;
    this.bot = new Bot(this.player2);
  }

  public play(): void {
    while (!this.isGameOver()) {
      this.printBoard();
      if (this.currentPlayer === this.player1) {
        this.playTurn();
      } else {
        const [i, j] = this.bot.getNextMove(this.board);
        this.makeMove(i, j);
      }
      this.switchPlayer();
    }
    this.printBoard();
    console.log(`Game over. Winner: ${this.getWinner() || "None"}`);
  }

  private playTurn(): void {
    let row, col;
    do {
      row = Number(prompt(`Enter row for ${this.currentPlayer}`));
      col = Number(prompt(`Enter column for ${this.currentPlayer}`));
    } while (!this.isValidMove(row, col));
    this.makeMove(row, col);
  }

  private isValidMove(row: number, col: number): boolean {
    if (row < 0 || row > 2 || col < 0 || col > 2) {
      return false;
    }
    return !this.board[row][col];
  }

  private makeMove(row: number, col: number): void {
    this.board[row][col] = this.currentPlayer;
  }

  private switchPlayer(): void {
    this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
  }

  private isGameOver(): boolean {
    return this.isBoardFull();
  }

  private getWinner(): string | null {
    const lines = [
      // Rows
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // Columns
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Diagonals
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const line of lines) {
      const [a, b, c] = line;
      if (this.board[Math.floor(a / 3)][a % 3]
          && this.board[Math.floor(a / 3)][a % 3] === this.board[Math.floor(b / 3)][b % 3]
          && this.board[Math.floor(a / 3)][a % 3] === this.board[Math.floor(c / 3)][c % 3]) {
        return this.board[Math.floor(a / 3)][a % 3];
      }
    }
    return null;
  }

  private isBoardFull(): boolean {
    for (const row of this.board) {
      for (const cell of row) {
        if (!cell) {
          return false;
        }
      }
    }
    return true;
  }

  private printBoard(): void {
    console.log(this.board.map(row => row.map(cell => cell || "-").join(" ")).join("\n"));
  }
}