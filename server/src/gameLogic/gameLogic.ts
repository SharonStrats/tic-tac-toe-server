import { checkRows, checkColumns, checkDiagonals, boardFull } from '../helpers/gameLogicHelper';

export const checkWinner = (board: string[][]) => {
    let firstMark:string;
    let count: number;
    let winner: string | null | undefined = null;

    // check rows
    winner = checkRows(board);
    if (winner) return winner;
    // check col
    winner = checkColumns(board);
    if (winner) return winner;

    // check diagonals
    winner = checkDiagonals(board);
    return winner;
}

/* check to see if there is a tie
*/
export const checkTie = (board: string[][]) => {
    return boardFull(board);
}