# CalixAuth - Arquitectura Técnica

## 1. Stack Tecnológico

* **Framework:** React Native (Expo SDK 52+).
* **Lenguaje:** **TypeScript** (Estricto).
* **Routing:** **Expo Router v4** (File-based routing).
* **Estado Global:** **Zustand** (Ligero, sin boilerplate).
* **Criptografía:** `expo-crypto`.
* **Internacionalización:** `i18next` con `react-i18next`.
* **Pagos:** `react-native-purchases` (**RevenueCat**).

## 2. Estructura de Directorios (Expo Router)

```bash
/calixauth
├── /assets              # Fuentes, Iconos, Logos (HyM Soft)
├── /src
│   ├── /components      # UI Kit (Botones, Sliders, Cards, FeedbackHaptic)
│   ├── /constants       # Paletas de colores, Configuración Global
│   ├── /hooks           # usePasswordGenerator, useInAppPurchase (EN PAUSA - Fase 6 pausada)
│   ├── /i18n            # Configuración y diccionarios (ES, EN, FR)
│   ├── /store           # Stores de Zustand (authStore, settingsStore)
│   ├── /utils           # Helpers de criptografía y formateo
│   └── /types           # Definiciones de TypeScript compartidas (PENDIENTE)
├── /app                 # Expo Router
│   ├── _layout.tsx      # Provider wrappers (I18n, Theme)
│   └── index.tsx        # Pantalla Principal (Dashboard)
├── app.json             # Configuración de Expo
├── tsconfig.json        # Configuración de TypeScript
└── package.json
```
