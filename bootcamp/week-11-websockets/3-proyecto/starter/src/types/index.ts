import { Server, Socket } from 'socket.io';

// JWT payload (datos codificados en el token)
export interface TokenPayload {
  userId: string;
  email: string;
  role: 'user' | 'admin';
}

// Eventos que el SERVIDOR envía al CLIENTE
export interface ServerToClientEvents {
  'notification:new': (data: NotificationPayload) => void;
  'notification:read': (data: { notificationId: string }) => void;
  error: (message: string) => void;
}

// Eventos que el CLIENTE envía al SERVIDOR (mínimos en este proyecto)
export interface ClientToServerEvents {
  ping: () => void;
}

// Datos adjuntos al socket autenticado
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

// Payload de notificación para WebSocket
export interface NotificationPayload {
  id: string;
  type: string;
  title: string;
  body: string;
  resourceId?: string;
  createdAt: string;
}
