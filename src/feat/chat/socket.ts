import { Manager } from "socket.io-client";

const URL = "http://localhost";
const socketManager = new Manager(URL, { path: "/api/socket.io", autoConnect: false, transports: ["websocket"] });
export default socketManager;
