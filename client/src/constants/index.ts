import { io } from 'socket.io-client';

export const LOCAL_STORAGE_USER_KEY = 'LOCAL_STORAGE_USER_KEY';

export const socket = io('http://localhost:5000');
