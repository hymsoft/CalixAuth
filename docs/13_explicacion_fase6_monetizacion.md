# Guía de Fase 6: Monetización (Regálame un café) ☕

En esta fase, implementaremos el sistema para que los usuarios puedan apoyar tu trabajo de forma voluntaria. Al ser una app de seguridad y privacidad, el modelo es **altruista**: no vendemos funciones, pedimos apoyo.

## 1. ¿Qué es RevenueCat? 🐱

Configurar pagos en las tiendas (Google/Apple) es complejo y propenso a errores. **RevenueCat** es una herramienta que actúa como "traductora":
- Se conecta con Google Play Store.
- Maneja la validación de que el pago fue real.
- Nos dice en la app: "Che, este usuario acaba de donar 1 USD".
- Es **gratis** para nuestras necesidades iniciales.

## 2. Los 3 Pilares del Proceso

### A. Google Play Console (El Banco)
Aquí creamos el "producto". Le decimos a Google: "Tengo un producto digital llamado 'Café' que cuesta 1 USD". Google nos da un ID único para ese café.

### B. RevenueCat Dashboard (El Contador)
Aquí vinculamos ese producto de Google. Creamos una "Ofrenda" (Offering). RevenueCat se encarga de que, si un día querés subir la app a iOS, no tengas que reescribir la lógica de pagos; ellos unifican todo.

### C. La App (El Mozo)
En CalixAuth, usaremos la librería `react-native-purchases`:
1. El usuario toca "Regálame un café".
2. La app le pide a RevenueCat la lista de precios.
3. El sistema muestra el modal nativo de Google (donde el usuario pone su huella/password).
4. Si el pago es exitoso, mostramos una animación de agradecimiento.

## 3. ¿Cómo lo probamos?

Google nos permite crear una lista de **"Emails de prueba"**.
- Vos ponés tu email en una lista especial de Google.
- Cuando comprás el café en la app, Google te dice: *"Esta es una transacción de prueba, no se te cobrará nada real"*.
- Así verificamos que el flujo funciona de punta a punta sin gastar un centavo.

## 4. Filosofía del "Café" en CalixAuth
Es importante recordar que:
- Es un **pago consumible**: El usuario puede invitarte todos los cafés que quiera.
- **Sin persistencia**: Como no guardamos perfiles de usuario por privacidad, la "donación" es un gesto del momento.

---
**¿Cómo seguimos?**
Esta fase requiere que tengas acceso a una **cuenta de desarrollador de Google Play** (la de 25 USD). Si ya la tenés, el primer paso es configurar el proyecto en el sitio de RevenueCat.
