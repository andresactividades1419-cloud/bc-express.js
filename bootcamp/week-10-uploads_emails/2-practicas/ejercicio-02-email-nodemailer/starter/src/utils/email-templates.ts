// src/utils/email-templates.ts
// ============================================
// PASO 2: Crear templates HTML para los emails
// ============================================

// Los templates son funciones puras: reciben datos y retornan HTML como string.
// Separar templates del servicio facilita cambiar el diseño sin tocar la lógica.
//
// Regla de seguridad: sanitizar inputs dinámicos para evitar XSS.
// En este ejercicio los campos vienen de la base de datos (name válido),
// pero siempre aplicar esta precaución en templates de producción.

// Helper para escapar caracteres HTML especiales
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ============================================
// Template 1: Bienvenida
// ============================================
// Descomenta welcomeEmailTemplate:
// export function welcomeEmailTemplate(name: string): string {
//   const safeName = escapeHtml(name);
//   return `
// <!DOCTYPE html>
// <html lang="es">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Bienvenido</title>
//   <style>
//     body { font-family: 'Segoe UI', Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 0; }
//     .container { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 8px; overflow: hidden; }
//     .header { background: #68A063; padding: 32px; text-align: center; }
//     .header h1 { color: #fff; margin: 0; font-size: 24px; }
//     .body { padding: 32px; color: #333; line-height: 1.6; }
//     .footer { background: #f0f0f0; padding: 16px; text-align: center; font-size: 12px; color: #888; }
//   </style>
// </head>
// <body>
//   <div class="container">
//     <div class="header"><h1>¡Bienvenido!</h1></div>
//     <div class="body">
//       <p>Hola <strong>${safeName}</strong>,</p>
//       <p>Tu cuenta ha sido creada exitosamente. Ya puedes iniciar sesión y comenzar a usar la plataforma.</p>
//       <p>¡Que tengas un excelente día!</p>
//     </div>
//     <div class="footer"><p>Este es un email automático, por favor no respondas directamente.</p></div>
//   </div>
// </body>
// </html>
//   `.trim();
// }

// ============================================
// Template 2: Reset de contraseña
// ============================================
// Descomenta resetPasswordEmailTemplate:
// export function resetPasswordEmailTemplate(name: string, resetUrl: string): string {
//   const safeName = escapeHtml(name);
//   return `
// <!DOCTYPE html>
// <html lang="es">
// <head>
//   <meta charset="UTF-8">
//   <title>Restablecer contraseña</title>
//   <style>
//     body { font-family: 'Segoe UI', Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 0; }
//     .container { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 8px; overflow: hidden; }
//     .header { background: #222; padding: 32px; text-align: center; }
//     .header h1 { color: #fff; margin: 0; font-size: 24px; }
//     .body { padding: 32px; color: #333; line-height: 1.6; }
//     .btn { display: inline-block; background: #68A063; color: #fff; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: bold; margin: 16px 0; }
//     .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 12px 16px; margin-top: 24px; font-size: 13px; }
//     .footer { background: #f0f0f0; padding: 16px; text-align: center; font-size: 12px; color: #888; }
//   </style>
// </head>
// <body>
//   <div class="container">
//     <div class="header"><h1>Restablecer Contraseña</h1></div>
//     <div class="body">
//       <p>Hola <strong>${safeName}</strong>,</p>
//       <p>Recibimos una solicitud para restablecer la contraseña de tu cuenta.</p>
//       <a href="${resetUrl}" class="btn">Restablecer contraseña</a>
//       <div class="warning">
//         <strong>⚠️ Este enlace expira en 1 hora.</strong><br>
//         Si no solicitaste esto, ignora este email.
//       </div>
//     </div>
//     <div class="footer"><p>Por seguridad, nunca compartas este enlace.</p></div>
//   </div>
// </body>
// </html>
//   `.trim();
// }

// Placeholders hasta descomentarlos:
export function welcomeEmailTemplate(_name: string): string {
  throw new Error('welcomeEmailTemplate no implementado — descomenta el PASO 2');
}

export function resetPasswordEmailTemplate(_name: string, _resetUrl: string): string {
  throw new Error('resetPasswordEmailTemplate no implementado — descomenta el PASO 2');
}
