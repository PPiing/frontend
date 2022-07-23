import { Manager } from "socket.io-client";

const baseURL = window.location.origin;

const socketManager = new Manager(baseURL, { path: "/api/socket.io", autoConnect: false, transports: ["websocket"] });
export default socketManager;
