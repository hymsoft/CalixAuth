# CalixAuth 🛡️

**Generador de Contraseñas Efímeras y Seguras.**

CalixAuth es una aplicación móvil (Android/iOS) diseñada bajo la filosofía de **"Usar y Olvidar"**. Genera contraseñas robustas con entropía criptográficamente segura y las mantiene en memoria solo el tiempo necesario, garantizando privacidad total.

## ✨ Características Principales

- 🔐 **Seguridad Real**: Generación basada en CSPRNG (`expo-crypto`).
- ⏳ **Memoria Efímera**: Historial con limpieza automática (TTL de 60s).
- 🧹 **Zero Persistence**: Los datos sensibles nunca tocan el disco.
- 🎨 **Interfaz Premium**: Diseño minimalista, feedback háptico y soporte para modo oscuro.
- 🌐 **Multilingüe**: Español, Inglés, Francés y Portugués.

## 🚀 Inicio Rápido

### 1. Instalación de Dependencias
```bash
pnpm install
```

### 2. Generar Cliente de Desarrollo (Nativo)
Como el proyecto usa módulos nativos (Seguridad, Haptics, etc.), necesitás generar el cliente de desarrollo primero:
```bash
eas build --profile development --platform android
```

### 3. Ejecutar Servidor de Desarrollo
Una vez instalado el APK de desarrollo en tu celular o emulador:
```bash
pnpm start
```

## 🛠️ Otros Builds (EAS)

## 🧪 Calidad y Testing
El proyecto cuenta con una sólida infraestructura de calidad:
- **Pruebas**: Suite de 13 tests unitarios con Jest.
- **Linter**: Verificación con ESLint (Flat Config).
- **Formato**: Estandarización con Prettier.

Ejecutar tests:
```bash
pnpm test
```

### Build de Previsualización (APK Independiente)
Para generar un instalador APK completo y autónomo:
```bash
eas build --profile preview --platform android
```

### Build de Producción (AAB para Play Store)
```bash
eas build --profile production --platform android
```

## 📚 Documentación Detallada
Para más detalles, consultá la carpeta `docs/`:
- [Resumen del Proyecto](docs/01_project_overview.md)
- [Seguridad y Privacidad](docs/05_security.md)
- [Infraestructura de Calidad](docs/11_quality_and_testing.md)

---
**Desarrollado por HyM Soft** ⚙️
