import api from "../provider/AxiosProvider";
import User from "../interfaces/User";
import { toast } from "react-toastify";
import roomStore from "../stores/room/RoomStore";

let socketUrl = "wss://rest.necrocloud.eu/room/lobby/";

class RoomService {

    socket: WebSocket

    createRoom(user: User, showName: string, callback: Function) {
        let data = {owner: user.name, show: showName}
        console.log("Sending Data...")
        api.post("/room/create", data)
            .then((response) => {
                if (response.data.success) {
                    roomStore.openConnection(response.data.room.name)
                }
            })
            .catch(() => {
                toast.error("The room could not be created. Please try again later!")
                if (callback) {
                    callback(false)
                }
            });
    }

    findRoom(name, callback) {
        api.get("/room/find/" + name)
            .then((response) => {
                callback(response.data)
        })
    }

    connect(user: User, roomName: string, callback: Function) {
        if (this.socket) {
            if (this.socket.readyState === WebSocket.OPEN) {
                return;
            }
        }

        this.socket = new WebSocket(socketUrl + roomName + "/" + user.name + "/" + false)

        this.socket.onopen = () => {
            console.log("Connected to room: " + roomName)
        }
        this.socket.onmessage = (message) => {
            if (callback) {
                callback(message)
            }
        }

        const keepAlive = () => {
            if (this.socket !== undefined) {
                if (this.socket.readyState === WebSocket.OPEN){
                    this.sendMessage("keepAlive")
                    setTimeout(keepAlive, 30000)
                }
            }
        }
        setTimeout(keepAlive, 25000)
    }

    disconnect() {
        console.log("Disconnected")
        this.socket.close()
        this.socket = undefined
    }

    sendMessage(message) {
        this.socket.send(message)
    }
}

const roomService = new RoomService()
export default roomService