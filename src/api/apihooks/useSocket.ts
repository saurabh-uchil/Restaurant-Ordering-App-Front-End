import { io } from "socket.io-client";
import { apiBaseUrl } from "../../config/env";

export const socket = io(apiBaseUrl, { withCredentials: true });
