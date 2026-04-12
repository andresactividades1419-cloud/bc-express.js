import { Server, Socket } from 'socket.io';

// ============================================================
// Eventos que el SERVIDOR envía al CLIENTE
// ============================================================
export interface ServerToClientEvents {
  message: (data: MessageData) => void;
  userJoined: (data: UserEventData) => void;
  userLeft: (data: UserEventData) => void;
  roomUsers: (data: RoomUsersData) => void;
}

// ============================================================
// Eventos que el CLIENTE envía al SERVIDOR
// ============================================================
export interface ClientToServerEvents {
  joinRoom: (data: JoinRoomData) => void;
  sendMessage: (data: SendMessageData) => void;
  leaveRoom: (room: string) => void;
}

// ============================================================
// Datos adjuntados al socket (persisten durante la sesión)
// ============================================================
export interface SocketData {
  username: string;
  currentRoom: string;
}

// ============================================================
// Tipos convenientes para usar en el código
// ============================================================
export type TypedServer = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  Record<string, never>,
  SocketData
>;

export type TypedSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  Record<string, never>,
  SocketData
>;

// ============================================================
// Interfaces de datos de los eventos
// ============================================================
export interface MessageData {
  id: string;
  text: string;
  username: string;
  room: string;
  timestamp: string;
}

export interface UserEventData {
  username: string;
  room: string;
  timestamp: string;
}

export interface RoomUsersData {
  room: string;
  users: string[];
}

export interface JoinRoomData {
  username: string;
  room: string;
}

export interface SendMessageData {
  text: string;
  room: string;
}
