const app = require("express")();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

let numOfPlayers = 0;
let players:any[] = [];

const PORT = process.env.PORT || 4001;

interface GameMoveData  {
    whosup: string,
    board: string[][]
}

interface WinnerNotificationData {
    message: string;
    board: string[][];
}

const onConnection = (socket:any) => {
    
    if (numOfPlayers > 2) {
        socket.emit("wait", "There are already 2 players");
        socket.disconnect();    
    } else {
        numOfPlayers++;
        players.push(socket);
        if (players.length === 1) {
            socket.emit("yourSymbol", 'X');
        } else {
            socket.emit('yourSymbol', 'O');
        }
    }

    socket.on("nextMove", (gameMoveDetails: GameMoveData) => {
        players.forEach(player => {
            player.emit("nextPlayer", gameMoveDetails);
        }); 
    });

    socket.on("winner",  (gameMoveDetails: GameMoveData) => {
        const winnerDetails: WinnerNotificationData = {
            message: `${gameMoveDetails.whosup} won the game!`,
            board: gameMoveDetails.board
        }
        players.forEach(player => {
            player.emit("winnerNotification", winnerDetails);
        }); 

        numOfPlayers = 0;
        players.forEach(player => {
            player.disconnect();
        });
        players = [];
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