import { Server, Socket } from 'socket.io';

// JWT payload — datos guardados en el token
export interface TokenPayload {
  userId: string;
  email: string;
  role: 'user' | 'admin';
}

// Eventos que el SERVIDOR envía al CLIENTE
export interface ServerToClientEvents {
  pong: (data: { message: string; timestamp: string }) => void;
  notification: (data: NotificationData) => void;
  error: (message: string) => void;
}

// Eventos que el CLIENTE envía al SERVIDOR
export interface ClientToServerEvents {
  ping: () => void;
  subscribe: (topic: string) => void;
}

// Datos adjuntados al socket autenticado
export interface SocketData {
  user: TokenPayload;
}

// Tipos convenientes
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

// Interface de notificación
export interface NotificationData {
  type: string;
  title: string;
  body: string;
  createdAt: string;
}
