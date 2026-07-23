import Arena from "@colyseus/tools";
import { MyRoom } from "./rooms/MyRoom";

export default Arena({
    getId: () => "FPS Game Server",

    initializeGameServer: (gameServer) => {
        // ルーム名 "my_room" で MyRoom を登録
        gameServer.define('my_room', MyRoom);
    },

    initializeExpress: (app) => {
        app.get("/hello", (req, res) => {
            res.send("Colyseus Server is Running!");
        });
    }
});
