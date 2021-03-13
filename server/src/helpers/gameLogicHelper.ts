// questions I have, should I use number as type for a loop variable

export const checkRow = (board: string[][], row: number) => {
    let firstMark:string = board[row][0];;
    let count: number = 0;

    if (firstMark === '') return null;
    for (let j:number = 1; j < board[row].length; j++) {
        if (board[row][j] !== firstMark) {
            return null;
            count++;
        }
    if (count === board.length-1) {
        return firstMark;
    }    
    }
}
export const checkColumn = (board: string[][], col: number) => {
    let firstMark:string | null = board[0][col];;
    let count: number = 0;
    if (firstMark === '') return null;
    count = 0;
    for (let j:number = 1; j < board.length; j++) {
        if (board[j][col] !== firstMark) {
            return null;
            count++;
        }
    if (count === board.length-1) {
        return firstMark;
    }    
    }
}
export const checkBackslashDiagonal = (board: string[][]) => {
    let firstMark:string | null = board[0][0];
    let count: number = 0;

    count = 0;
    if (firstMark === '') return null;
    for (let i:number = 1; i < board.length; i++) {
        if (board[i][i] !== firstMark) {
            return null;
            count++;
        }
    if (count === board.length-1) {
        return firstMark;
    }    
    }
}
export const checkForwardslashDiagonal = (board: string[][]) => {
    let firstMark:string | null = board[0][board.length-1];
    let count: number = 0;

    count = 0;
    if (firstMark === '') return null;
    let j = board.length-1;
    for (let i:number =1; i < board.length; i++) {
        j--;
        if (board[i][j] !== firstMark) {
            return null;
            count++;
        }
    if (count === board.length-1) {
        return firstMark;
    }    
    }
}
export const checkRows = (board: string[][]) => {
    let firstMark:string;

    for (let i:number = 0; i < board.length; i++) {
        let winner = checkRow(board, i);       
        if (winner) return winner;
    }
}

export const checkColumns = (board: string[][]) => {
    let firstMark:string;
    let winner: string | null | undefined = null;
    for (let i:number = 0; i < board.length; i++) {
        winner = checkColumn(board, i);
        if (winner) return winner;
    }
}

export const checkDiagonals = (board: string[][]) => {
    let winner: string | null | undefined = null;

    winner = checkBackslashDiagonal(board);
    if (winner) return winner;

    winner = checkForwardslashDiagonal(board);
    return winner;
}

export const boardFull = (board: string[][]) => {
    for (let i:number = 0; i < board.length; i++) {
        for (let j:number = 0; j < board[i].length; j++) {
            if (board[i][j] === '') {
                return false;
            }
        }
    }
    return true;
}

