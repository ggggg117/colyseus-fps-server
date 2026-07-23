import { Room, Client } from "colyseus";
import { Schema, type, MapSchema } from "@colyseus/schema";

// プレイヤー位置データ構造
export class Player extends Schema {
    @type("number") x: number = 0;
    @type("number") y: number = 0;
    @type("number") z: number = 0;
}

// 部屋全体のステート（全プレイヤーのリスト）
export class MyRoomState extends Schema {
    @type({ map: Player }) players = new MapSchema<Player>();
}

export class MyRoom extends Room<MyRoomState> {
    onCreate (options: any) {
        this.setState(new MyRoomState());

        // 移動イベントを受け取って座標を更新
        this.onMessage("move", (client, data) => {
            const player = this.state.players.get(client.sessionId);
            if (player) {
                player.x = data.x;
                player.y = data.y;
                player.z = data.z;
            }
        });
    }

    onJoin (client: Client) {
        console.log(client.sessionId, "が入室しました");
        const player = new Player();
        this.state.players.set(client.sessionId, player);
    }

    onLeave (client: Client) {
        console.log(client.sessionId, "が退室しました");
        this.state.players.delete(client.sessionId);
    }
}
