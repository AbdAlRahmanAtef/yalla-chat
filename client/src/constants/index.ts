import { io } from 'socket.io-client';

export const LOCAL_STORAGE_USER_KEY = 'LOCAL_STORAGE_USER_KEY';

export const socket = io(`${process.env.NEXT_PUBLIC_BASE_URL}`)