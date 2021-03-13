import { WinnerNotificationData, GameMoveData } from '../types/gameTypes';

export const winnerNotification = (winner: string, players: any[], gameMoveDetails: GameMoveData) => {
    const winnerDetails: WinnerNotificationData = {
        message: `${winner} won the game!`,
        board: gameMoveDetails.board
    }

    players.forEach(player => {
        player.emit("winnerNotification", winnerDetails);
    }); 

    players.forEach(player => {
        player.disconnect();
    });
};

