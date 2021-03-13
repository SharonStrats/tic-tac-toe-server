"use strict";
var app = require("express")();
var httpServer = require("http").createServer(app);
var io = require("socket.io")(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
var numOfPlayers = 0;
var players = [];
var PORT = process.env.PORT || 4001;
var onConnection = function (socket) {
    if (numOfPlayers > 2) {
        socket.emit("wait", "There are already 2 players");
        socket.disconnect();
    }
    else {
        numOfPlayers++;
        players.push(socket);
        if (players.length === 1) {
            socket.emit("yourSymbol", 'X');
        }
        else {
            socket.emit('yourSymbol', 'O');
        }
    }
    socket.on("nextMove", function (gameMoveDetails) {
        players.forEach(function (player) {
            player.emit("nextPlayer", gameMoveDetails);
        });
    });
    socket.on("winner", function (gameMoveDetails) {
        var winnerDetails = {
            message: gameMoveDetails.whosup + " won the game!",
            board: gameMoveDetails.board
        };
        players.forEach(function (player) {
            player.emit("winnerNotification", winnerDetails);
        });
        numOfPlayers = 0;
        players.forEach(function (player) {
            player.disconnect();
        });
        players = [];
    });
    socket.on("disconnect", function () {
        numOfPlayers--;
        players = players.filter(function (player) { return player != socket; });
    });
};
io.on("connection", onConnection);
httpServer.listen(PORT, function () {
    console.log("Server is running at https://localhost:" + PORT);
});
