// src/services/email.service.ts
import nodemailer from 'nodemailer';
import { getTransporter } from '../config/email';
import { env } from '../config/env';
import {
  welcomeEmailTemplate,
  resetPasswordEmailTemplate,
  itemCreatedEmailTemplate,
} from '../utils/email-templates';

export async function sendWelcomeEmail(to: string, name: string): Promise<void> {
  const transporter = await getTransporter();
  const info = await transporter.sendMail({
    from: env.EMAIL_FROM,
    to,
    subject: '¡Bienvenido a la plataforma!',
    html: welcomeEmailTemplate(name),
  });

  if (env.NODE_ENV !== 'production') {
    console.log('📧 Vista previa:', nodemailer.getTestMessageUrl(info));
  }
}

export async function sendResetPasswordEmail(
  to: string,
  name: string,
  resetUrl: string,
): Promise<void> {
  const transporter = await getTransporter();
  const info = await transporter.sendMail({
    from: env.EMAIL_FROM,
    to,
    subject: 'Recuperar contraseña',
    html: resetPasswordEmailTemplate(name, resetUrl),
  });

  if (env.NODE_ENV !== 'production') {
    console.log('📧 Vista previa:', nodemailer.getTestMessageUrl(info));
  }
}

export async function sendItemCreatedEmail(
  to: string,
  name: string,
  itemName: string,
): Promise<void> {
  const transporter = await getTransporter();
  const info = await transporter.sendMail({
    from: env.EMAIL_FROM,
    to,
    subject: 'Recurso creado exitosamente',
    html: itemCreatedEmailTemplate(name, itemName),
  });

  if (env.NODE_ENV !== 'production') {
    console.log('📧 Vista previa:', nodemailer.getTestMessageUrl(info));
  }
}
