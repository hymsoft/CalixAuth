# CalixAuth - Roadmap de Desarrollo (MVP)

## Fase 1: Cimientos

* [x] Inicializar proyecto con **Expo** + **TypeScript**.
* [x] Configurar **Expo Router**.
* [x] Configurar **Zustand** para gestión de estado.
* [x] Implementar sistema de **i18n** (i18next) con soporte base para ES/EN.

## Fase 2: Lógica Core

* [x] Implementar servicio de generación con `expo-crypto`.
* [x] Crear Store de Zustand para configuración (longitud, caracteres).
* [x] Crear Store de Zustand para historial volátil.

## Fase 3: UI/UX

* [x] Implementar tokens de diseño (Colores OKLCH).
* [x] Construir pantalla principal (Inputs, Sliders, Botón Generar).
* [x] Implementar lista de historial con animación de entrada.
* [x] Implementar menú de ajustes centralizado (SettingsMenu).

## Fase 4: Seguridad y Ciclo de Vida

* [x] Implementar limpieza automática por TTL (60 segundos).
* [x] Conectar `AppState` para limpiar datos al salir de la app.
* [x] Probar persistencia cero (reiniciar app y verificar estado limpio).

## Fase 5 Gestión del Portapapeles

* [x] Implementar copiar contraseña al portapapeles
  * Toque en cualquier contraseña de la lista
  * Mostrar mensaje de confirmación al copiar
* [x] Implementar borrar contraseña del portapapeles al eliminarla
  * Limpiar portapapeles cuando la contraseña TTL expira
  * Seguridad: no dejar rastro en el portapapeles

## Fase 6: Monetización

* [ ] Configurar cuenta en RevenueCat.
* [ ] Integrar `react-native-purchases`.
* [ ] Implementar flujo de donación.

## Fase 7: Pulido y Publicación

* [ ] Iconos de App y Splash Screen.
* [ ] Builds de producción (EAS Build).
* [ ] Pruebas en dispositivo físico.
* [ ] Publicación en Play Store.
