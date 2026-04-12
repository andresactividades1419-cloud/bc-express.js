import { Schema, model, Document, Types } from 'mongoose';

// ============================================================
// TODO: Implementar el modelo Notification.
//
// Una notificación:
//   - Pertenece a un usuario (userId)
//   - Tiene tipo, título y cuerpo
//   - Puede tener referencia al recurso que la originó (resourceId)
//   - Tiene un campo 'read' para saber si fue leída
// ============================================================

export interface INotification extends Document {
  _id: Schema.Types.ObjectId;
  userId: Types.ObjectId;
  type: string;
  title: string;
  body: string;
  resourceId?: Types.ObjectId;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    // TODO: Definir los campos del schema siguiendo INotification
    // Pista: usar los tipos correctos de Mongoose (ObjectId, String, Boolean)
    // TODO: userId — ObjectId referenciando colección 'User', requerido
    // TODO: type — String, requerido
    // TODO: title — String, requerido
    // TODO: body — String, requerido
    // TODO: resourceId — ObjectId, opcional
    // TODO: read — Boolean, default false
  },
  { timestamps: true },
);

export const Notification = model<INotification>('Notification', notificationSchema);
