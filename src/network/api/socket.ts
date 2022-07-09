import { Manager } from "socket.io-client";

// const baseURL = "http://localhost";
const baseURL = "https://bongcheonmountainclub.iptime.org/api";

const socketManager = new Manager(baseURL, { path: "/api/socket.io", autoConnect: false, transports: ["websocket"] });
export default socketManager;
