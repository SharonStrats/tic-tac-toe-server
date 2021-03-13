import { winnerNotification } from "./helpers/gameNotificationHelper";
import { checkWinner, checkTie } from "./gameLogic/gameLogic";
import { GameMoveData } from './types/gameTypes';
// why does winner want additional type undefined 
// when i assign it null right away

const app = require("express")();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
// can change or add symbols to expand the number of players
const NUMBER_OF_PLAYERS: number = 2;
const PLAYER_SYMBOLS: string[] = ['X', 'O', 'P', 'T']

let numOfPlayers = 0;
let players:any[] = [];

const PORT = process.env.PORT || 4001;

const onConnection = (socket:any) => {
    
    if (numOfPlayers > NUMBER_OF_PLAYERS) {
        socket.emit("wait", `There are already ${NUMBER_OF_PLAYERS} players`);
        socket.disconnect();    
    } else {
        numOfPlayers++;
        players.push(socket);
        socket.emit("yourSymbol", PLAYER_SYMBOLS[players.length]);

    }

    socket.on("nextMove", (gameMoveDetails: GameMoveData) => {
        let winner: string | null | undefined = null;
        // check if winner or tie
        winner = checkWinner(gameMoveDetails.board); 
        if (winner) {
            winnerNotification(winner, players, gameMoveDetails);
            numOfPlayers = 0;
            players = []
        } else if (checkTie(gameMoveDetails.board)){
            // notify about a tie
            players = [];
        }
        /* won't happen if winner or tie because now players
           will be empty */
        players.forEach(player => {
            player.emit("nextPlayer", gameMoveDetails);
        }); 
    });
    
    socket.on("disconnect", () => {
        numOfPlayers--;
        players = players.filter(player => player != socket);
    });
}

io.on("connection", onConnection);

httpServer.listen(PORT, () => {
    console.log(`Server is running at https://localhost:${PORT}`);
});