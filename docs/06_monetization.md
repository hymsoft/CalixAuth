# CalixAuth - Monetización

## 1. Producto: "Invítame un café"

Modelo de donación voluntaria para apoyar el desarrollo.

* **Tipo:** In-App Purchase (Consumible).
* **Precio:** Tier 1 de Google Play (~1.00 USD).
* **Proveedor:** **RevenueCat** (SDK: `react-native-purchases`).

## 2. Implementación Técnica

### ¿Por qué RevenueCat en lugar de nativo puro?

Aunque se trata de un solo producto, RevenueCat abstrae la complejidad de la validación de recibos y la conexión con Google Play Billing Library, lo cual es propenso a errores y cambios frecuentes de API. El tier gratuito de RevenueCat es suficiente para este volumen.

### Flujo de Usuario

1. Usuario toca el ícono de "Café/Corazón" en el header o footer.
2. Se muestra un pequeño modal o toast nativo explicando la donación.
3. Se inicia el flujo de compra de Google Play.
4. al completar (`PURCHASED`), se muestra una **animación de agradecimiento** (Lottie o simple CSS animation).
5. No se desbloquean funciones extra; es puramente altruista.
