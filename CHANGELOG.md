# Changelog - CalixAuth

## [1.0.0] - 2026-02-05

> [!IMPORTANT]
> **Correcciones de Auditoría**: Actualización de mantenimiento con correcciones menores y limpieza de documentación técnica.

### Fixed

- **Resolución de Merge Conflict**: Corregido conflicto en `src/components/SettingsMenu.tsx`
- **Documentación de Seguridad**: Actualizado threshold de limpieza en `docs/05_security.md` (ajuste técnico de parámetros)
- **Documentación de Arquitectura**: Marcados features pendientes `/types` y `useInAppPurchase` como pendiente en `docs/02_architecture.md`
- **Documentación de Requisitos**: Actualizado límite de historial de 5 a 10 entradas en `docs/03_requirements.md`
- **Nueva Auditoría**: Creado documento de auditoría detallada en `docs/15_auditoria.md`
- **Falsos Positivos Corregidos**:
  - API `AppState` reclasificada como no deprecated (uso válido en React Native)
  - Sesgo criptográfico reclasificado como bajo riesgo (CSPRNG implementado correctamente)

### Added
- **UI/UX**: Nuevo indicador visual en el historial para identificar la contraseña copiada actualmente.

## [1.0.0] - 2026-02-03

> [!IMPORTANT]
> **Lanzamiento de Producción**: Ingreso oficial al repositorio de producción. Esta versión consolida todas las mejoras de la fase de auditoría y pulido final.

### Added

- **Repositorio Oficial**: Transición al flujo de producción oficial bajo la versión 1.0.0.
- **Internacionalización (i18n)**: Soporte completo para etiquetas de slider (min/max) en todos los idiomas (ES, EN, FR, PT).
- **Sección 'Acerca de...'**: Nueva vista con información de branding, versión, autoría (HyM Soft) y propósito.
- **Cumplimiento Legal**: Incorporación de `PRIVACY.md`, `TERMS.md` y enlaces directos desde la interfaz.

### Fixed

- **UI/UX (Pulido Final)**:
  - Mejora de visibilidad de la versión en el menú de ajustes con color `muted` para Modo Oscuro.
  - Agregadas etiquetas visuales "min. 8" y "max. 32" al slider de longitud para mayor claridad.
  - Reemplazo del flujo de donación por un mensaje ameno y descriptivo de mantenimiento de cafetera ("Invítame un café" próximamente).

## [1.0.59] - 2026-02-03

> [!IMPORTANT]
> **Cierre de Desarrollo Principal**: Esta versión marca la finalización de la lógica core, infraestructura de seguridad y auditoría técnica del proyecto.

### Fixed

- **Directivas de Desarrollo**: Auditoría completa de cumplimiento del Punto 3 de las directivas de Hymsoft.
  - Agregados docstrings reglamentarios (Author, Company, Year, Parámetros y Retorno) en español a todos los componentes y utilidades nuevos.
  - Estandarización de metadatos en `ErrorBoundary`, `Toast`, `clipboard`, `crypto` y Stores de Zustand.
- **Portapapeles**: Optimización del borrado seguro usando `" "` y eliminación de logs en producción.
- **Android 13+**: Solución a la duplicidad de notificaciones de copiado.

## [1.0.58] - 2026-02-03

### Fixed

- **Clipboard UX**: Optimización drástica del borrado del portapapeles.
  - El borrado ahora usa un espacio en blanco (`" "`) para asegurar la sobrescritura efectiva en todos los dispositivos Android.
  - Implementación de lógica anti-duplicidad de notificaciones: en Android 13+ (API 33) se prioriza la alerta del sistema sobre el toast de la app.
  - Nuevo aviso visual: *"Portapapeles saneado por seguridad"* cuando ocurre la limpieza automática.
  - Saneamiento de logs: eliminación definitiva de logs residuales de limpieza en producción.
- **Documentation**: Actualización de la documentación de seguridad aclarando las limitaciones técnicas del borrado frente al Historial de Android.

## [1.0.57] - 2026-02-02

### Added

- **Infraestructura de Calidad**:
  - Configuración inicial de Jest para pruebas unitarias (v29 estable).
  - Creación de `jest.config.js` y `jest-setup.ts` con mocks para `expo-crypto`, `AsyncStorage` e `i18n`.
  - Suite de 13 tests unitarios cubriendo `crypto.ts`, `useSecurityStore.ts` (TTL, historial) y `useConfigStore.ts` (validación de seguridad).
  - Implementación de `ErrorBoundary.tsx` global para mayor resiliencia de la UI.
  - Configuración de ESLint (v9 Flat Config) y Prettier para estandarización de código.
- **Robustez de UI y Resiliencia**:
  - Eliminación de lógicas redundantes de inicialización de idioma.
  - Implementación de manejo de errores en enlaces externos (`Linking`).
  - Creación de componente `Toast` personalizado (multiplataforma) para feedback visual.

## [1.0.56] - 2026-02-02

### Changed[1.0.56]

- **Estructura UI**: Refactor masivo de la arquitectura de la interfaz.
  - Eliminación total del footer en el Dashboard principal para una estética más limpia.
  - Implementación de `SettingsMenu` centralizado (acceso mediante ícono de engranaje ⚙️).
  - Lógica de navegación contextual en el modal: botón de retroceso (←) en sub-selectores y botón de cierre (✕) en menú principal.
  - Nuevo selector manual de tema: permite elegir entre Sistema, Claro u Oscuro con persistencia local.
  - La información de versión, selector de idiomas y enlaces externos residen ahora en el nuevo menú.
- **Security (Auditoría)**: Implementación de parches críticos de seguridad.
  - Reemplazo de `Math.random()` por `Crypto.randomUUID()` (CSPRNG) para identificadores de historial.
  - Sanitización de logs: eliminación de logs de consola en producción (`if (__DEV__)`).
  - Sincronización de metadatos: consistencia de `buildNumber` entre `package.json` y `app.json` (v1.0.56).
- **Code Quality**: Mejoras en la robustez técnica.
  - Refactor de tipos: eliminación de tipos `any` en el historial (`HistoryList.tsx`).
  - Validación de seguridad: límite estricto de longitud de contraseña (8-32) aplicado a nivel de Store.
- **Cleanup**: Eliminación del componente `LanguageSelector.tsx` (redundante).

## [1.0.55] - 2026-02-02

### Fixed[1.0.55]

- **i18n**: Consolidación total del sistema de traducciones.
  - Eliminación de strings hardcodeados en `HistoryList`, `PasswordDisplay` y `LanguageSelector`.
  - Traducción de alertas nativas de confirmación de borrado.
  - Soporte completo para ES/EN/FR/PT en toda la interfaz de usuario.
- **UI/UX**: Mejoras en estados de componentes y feedback visual.
  - Implementación de estado vacío ("Empty State") en el historial.
  - Rediseño estético del placeholder inicial en el visor de contraseñas (`••••`).
- **Accessibility**: Mejora de la experiencia para lectores de pantalla en ajustes.
  - Roles y etiquetas de accesibilidad en `Slider` y `Switches`.
  - Mejora de legibilidad: aumento de fuente y peso en etiquetas de configuración.
- **Cleanup**: Optimización y mantenimiento.
  - Eliminación de logs de consola de desarrollo para producción.
  - Extracción del límite de historial a una constante centralizada.
  - Corrección de la lógica de notificaciones Toast duplicadas en Android 13+.

## [1.0.54] - 2026-01-30

### Changed[1.0.54]

- **UX/UI**: Rediseño de la lista de historial.
  - Ítems con botón "Copiar" explícito y feedback visual/háptico.
  - Animaciones suavizadas (`ZoomIn` / `ZoomOutRight`).
- **UX**: Feedback háptico agregado al botón "Generar".
- **UI**: El contenedor de la contraseña principal ahora es estático (no interactivo).
- **UI**: Rediseño del panel de configuración (`PasswordSettings`) para ser más compacto (switches en fila).

### Fixed[1.0.54]

- **Regresión**: Restauración del botón "Generar" y "Borrar Todo" que se perdieron durante el refactor.
- **UI**: Corrección de desbordamiento en ítems del historial cuando la contraseña es muy larga (wrap de texto).
- **UI**: Corrección de alineación en el Header para textos largos (centrado).
