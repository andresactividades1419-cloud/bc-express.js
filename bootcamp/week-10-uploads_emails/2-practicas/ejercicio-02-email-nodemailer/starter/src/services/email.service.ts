// src/services/email.service.ts
// ============================================
// PASO 3: Implementar el servicio de emails
// ============================================

// El email service es la capa que sabe cómo enviar emails.
// Solo él sabe de Nodemailer — el auth.service no debe importar nodemailer directamente.

import nodemailer from 'nodemailer';
import { getTransporter } from '../config/email';
import { welcomeEmailTemplate, resetPasswordEmailTemplate } from '../utils/email-templates';
import { env } from '../config/env';

// ============================================
// sendWelcomeEmail
// ============================================
// Descomenta esta función:
// export async function sendWelcomeEmail(to: string, name: string): Promise<void> {
//   const transporter = await getTransporter();
//
//   const info = await transporter.sendMail({
//     from: env.EMAIL_FROM,
//     to,
//     subject: '¡Bienvenido a la plataforma!',
//     html: welcomeEmailTemplate(name),
//   });
//
//   // getTestMessageUrl retorna la URL de preview de Ethereal (solo en dev/test)
//   // En producción retorna false
//   const previewUrl = nodemailer.getTestMessageUrl(info);
//   if (previewUrl) {
//     console.log('📧 Email de bienvenida enviado. Preview:', previewUrl);
//   }
// }

// ============================================
// sendResetPasswordEmail
// ============================================
// Descomenta esta función:
// export async function sendResetPasswordEmail(
//   to: string,
//   name: string,
//   resetToken: string
// ): Promise<void> {
//   const transporter = await getTransporter();
//
//   // El frontend maneja la ruta /reset-password — solo enviamos el token como query param
//   const resetUrl = `${env.FRONTEND_URL}/reset-password?token=${resetToken}`;
//
//   const info = await transporter.sendMail({
//     from: env.EMAIL_FROM,
//     to,
//     subject: 'Solicitud de restablecimiento de contraseña',
//     html: resetPasswordEmailTemplate(name, resetUrl),
//   });
//
//   const previewUrl = nodemailer.getTestMessageUrl(info);
//   if (previewUrl) {
//     console.log('📧 Email de reset enviado. Preview:', previewUrl);
//   }
// }

// Placeholders hasta descomentarlos:
export async function sendWelcomeEmail(_to: string, _name: string): Promise<void> {
  throw new Error('sendWelcomeEmail no implementado — descomenta el PASO 3');
}

export async function sendResetPasswordEmail(
  _to: string,
  _name: string,
  _resetToken: string
): Promise<void> {
  throw new Error('sendResetPasswordEmail no implementado — descomenta el PASO 3');
}
