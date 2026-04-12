# Ejercicio 02: Emails Transaccionales con Nodemailer

## 🎯 Objetivo

Implementar un sistema de emails transaccionales: email de bienvenida al registrar usuario y email de reset de contraseña con token temporal. Usar Ethereal para testing en desarrollo (sin enviar emails reales).

## 📚 Requisitos Previos

- Teoría [03-nodemailer-emails.md](../../1-teoria/03-nodemailer-emails.md) completada
- Ejercicio 01 completado (entender el patrón de arquitectura en capas)
- No se requiere cuenta de email real — usamos Ethereal para testing

## 📁 Estructura del Starter

```
ejercicio-02-email-nodemailer/starter/
├── package.json
├── tsconfig.json
├── .env.example
└── src/
    ├── app.ts                    ← DADO
    ├── server.ts                 ← DADO
    ├── config/
    │   ├── env.ts                ← DADO
    │   └── email.ts              ← PASO 1: configurar transporter
    ├── errors/
    │   └── AppError.ts           ← DADO
    ├── models/
    │   └── user.model.ts         ← DADO (con resetToken + resetTokenExpiresAt)
    ├── repositories/
    │   └── users.repository.ts   ← DADO
    ├── utils/
    │   ├── jwt.ts                ← DADO
    │   └── email-templates.ts    ← PASO 2: templates HTML
    ├── services/
    │   ├── email.service.ts      ← PASO 3: sendWelcomeEmail + sendResetEmail
    │   └── auth.service.ts       ← PASO 4: integrar emails en register/forgotPassword
    ├── controllers/
    │   └── auth.controller.ts    ← DADO
    └── routes/
        └── auth.routes.ts        ← DADO
```

## 📋 Pasos del Ejercicio

---

### PASO 1: Configurar el transporter de Nodemailer

El transporter es la conexión con el servidor SMTP. En desarrollo usamos Ethereal,
que captura los emails sin enviarlos y nos da un enlace de previsualización.

```ts
// En desarrollo: Ethereal crea credenciales temporales automáticamente
const testAccount = await nodemailer.createTestAccount();
transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: { user: testAccount.user, pass: testAccount.pass },
});
```

**Abre `starter/src/config/email.ts`** y descomenta la función `getTransporter()`.

---

### PASO 2: Crear templates HTML para los emails

Los templates son funciones que reciben datos y retornan HTML como string.
Mantenerlos separados del servicio facilita los cambios de diseño.

```ts
// Template de bienvenida: recibe el nombre del usuario
export function welcomeEmailTemplate(name: string): string {
  return `<html>...<p>Hola <strong>${name}</strong>...</p></html>`;
}

// Template de reset: recibe nombre y URL con el token
export function resetPasswordEmailTemplate(name: string, resetUrl: string): string {
  return `<html>...<a href="${resetUrl}">Restablecer</a>...</html>`;
}
```

**Abre `starter/src/utils/email-templates.ts`** y descomenta los dos templates.

---

### PASO 3: Implementar el servicio de emails

El email service usa el transporter para enviar los emails y loguea el preview URL de Ethereal.

```ts
export async function sendWelcomeEmail(to: string, name: string): Promise<void> {
  const transporter = await getTransporter();
  const info = await transporter.sendMail({
    from: '"App" <noreply@example.com>',
    to,
    subject: '¡Bienvenido!',
    html: welcomeEmailTemplate(name),
  });
  // Preview URL para ver el email en el navegador (solo en dev)
  console.log('📧', nodemailer.getTestMessageUrl(info));
}
```

**Abre `starter/src/services/email.service.ts`** y descomenta ambas funciones.

---

### PASO 4: Integrar emails en el servicio de autenticación

El email de bienvenida se envía en **fire-and-forget** (sin await) para no retrasar la respuesta.
El email de reset se envía con **await** porque el usuario necesita confirmación.

```ts
// En register(): fire-and-forget — no bloquea al usuario
sendWelcomeEmail(user.email, user.name).catch((err) => {
  console.error('Error enviando email:', err);
});

// En forgotPassword(): await — queremos saber si falló
await sendResetPasswordEmail(user.email, user.name, resetToken);
```

**Abre `starter/src/services/auth.service.ts`** y descomenta las llamadas a los emails.

---

## ✅ Verificación

Prueba los endpoints con Thunder Client o Postman:

1. **Registrar usuario**: `POST /api/v1/auth/register`
   ```json
   { "name": "Ana García", "email": "ana@test.com", "password": "Passw0rd!" }
   ```
   - Resultado: `201` + en consola aparece el **preview URL de Ethereal**
   - Abre el URL en el navegador — verás el email de bienvenida

2. **Solicitar reset**: `POST /api/v1/auth/forgot-password`
   ```json
   { "email": "ana@test.com" }
   ```
   - Resultado: `200 { "message": "Si el email existe, recibirás un enlace..." }`
   - En consola aparece el preview URL con el email de reset

3. **Verificar comportamiento con email inexistente**:
   - `POST /forgot-password` con email que no existe → `200` (no revelar si existe)

### Tips de debugging con Ethereal

- El preview URL tiene formato: `https://ethereal.email/message/AbCd1234...`
- Si no ves el URL en consola, verifica que `NODE_ENV=development` en tu `.env`
- Cada vez que reinicias el servidor, Ethereal genera nuevas credenciales
