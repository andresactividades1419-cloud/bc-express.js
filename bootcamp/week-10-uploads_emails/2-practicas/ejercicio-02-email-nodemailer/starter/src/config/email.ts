// src/config/email.ts
// ============================================
// PASO 1: Configurar el transporter de Nodemailer
// ============================================

// El transporter es el objeto que se conecta al servidor SMTP
// y envía los emails. Se crea una sola vez y se reutiliza.
//
// En desarrollo usamos Ethereal: un SMTP "trampa" que captura
// los emails sin enviarlos. Nos da un preview URL para verlos.

import nodemailer from 'nodemailer';
// import { env } from './env';

let transporter: nodemailer.Transporter;

// Descomenta la función getTransporter:
// export async function getTransporter(): Promise<nodemailer.Transporter> {
//   if (transporter) return transporter;
//
//   if (process.env['NODE_ENV'] === 'test' || process.env['NODE_ENV'] === 'development') {
//     // Ethereal: genera credenciales temporales automáticamente
//     // No necesitas ninguna cuenta de email para desarrollo
//     const testAccount = await nodemailer.createTestAccount();
//
//     transporter = nodemailer.createTransport({
//       host: 'smtp.ethereal.email',
//       port: 587,
//       secure: false,
//       auth: {
//         user: testAccount.user,
//         pass: testAccount.pass,
//       },
//     });
//
//     console.log('📧 Ethereal configurado:', testAccount.user);
//     return transporter;
//   }
//
//   // Producción: SMTP real configurado en .env
//   transporter = nodemailer.createTransport({
//     host: env.SMTP_HOST,
//     port: env.SMTP_PORT ?? 587,
//     secure: env.SMTP_SECURE,
//     auth: {
//       user: env.SMTP_USER,
//       pass: env.SMTP_PASS,
//     },
//   });
//
//   return transporter;
// }

// Placeholder hasta descomentarlo:
export async function getTransporter(): Promise<nodemailer.Transporter> {
  throw new Error('getTransporter no implementado — descomenta el código del PASO 1');
}
