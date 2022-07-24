import { Manager } from "socket.io-client";

const URL = window.location.origin;
const socketManager = new Manager(URL, { path: "/api/socket.io", autoConnect: false, transports: ["websocket"] });
export default socketManager;
