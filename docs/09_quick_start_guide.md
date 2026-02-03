# 🚀 Guía de Inicio Rápido: Apps Expo (Workflow Nativo)

Esta guía documenta el proceso estandarizado de **HyM Soft** para iniciar proyectos usando **Development Builds** (no Expo Go), asegurando control total sobre el código nativo y el versionado desde el día 1.

## 1. Creación y Limpieza Inicial

Arrancamos creando el proyecto y limpiando lo que no sirve.

```bash
# 1. Crear el proyecto (usando la plantilla default con TypeScript)
npx create-expo-app@latest NombreDeTuApp --template blank-typescript

# 2. Entrar a la carpeta
cd NombreDeTuApp

# 3. Inicializar git (fundamental)
git init
git add .
git commit -m "chore: initial commit"
```

## 2. Configuración del Entorno (EAS y PNPM)

Configuramos la nube de Expo y el gestor de paquetes.

```bash
# 1. Instalar EAS CLI globalmente (si no lo tenés)
npm install -g eas-cli

# 2. Loguearse en Expo
eas login

# 3. Configurar el proyecto en EAS (esto crea el eas.json y el ID del proyecto)
eas build:configure
# -> Elegí "Android" (o All)

# 4. (Opcional pero recomendado) Pasarse a pnpm para ahorrar espacio
# Borrá node_modules y package-lock.json, y corré:
pnpm install
```

## 3. Archivos de Configuración Clave

### A. `eas.json` (El secreto del versionado)

Editá este archivo para que lea la versión de tu PC y no la de la nube.

```json
{
  "cli": {
    "version": ">= 10.0.0",
    "appVersionSource": "local" 
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "autoIncrement": true
    }
  }
}
```

### B. `app.json` (Identidad)

Asegurate de cambiar esto para que no choque con otras apps:

* `slug`: El nombre corto (ej: "mi-app").
* `android.package`: El ID único (ej: `com.hymsoft.miapp`).
* `android.versionCode`: Poné un número inicial seguro, ej: `100001`.

## 4. El Sistema de Versionado Automático

Para no volverte loco con los números de versión, copiá tu script de confianza.

1. Creá la carpeta `scripts/`.
2. Copiá ahí el archivo `set-version.js` (sacalo de CalixAuth).
3. Configurá los "ganchos" en el `package.json` para que se ejecute solo:

```json
"scripts": {
  "postinstall": "node scripts/set-version.js",
  "prestart": "node scripts/set-version.js",
  "start": "expo start",
  "android": "expo run:android",
  "ios": "expo run:ios"
}
```

## 5. El Flujo de Trabajo (La Posta)

### 🟢 El Primer Build (El Parto)

Antes de escribir una línea de código visual, generá tu app de desarrollo.
`eas build --profile development --platform android`

* **¿Qué hacés?**: Escaneás el QR, instalás la app en tu celular.
* **¿Cuándo se hace?**: Solo **UNA VEZ** al principio.

### 🟡 Desarrollo Diario (Cambios Menores)

Para el 95% de tu trabajo (colores, textos, lógica, componentes).

1. `pnpm start`
2. Escaneá el QR desde la app que instalaste.
3. **Feedback**: Guardás (`Ctrl+S`) y se ve al instante.

### 🔴 ¿Cuándo hacer un Build Nuevo?

Solo si instalás librerías nativas (Cámara, Mapas, etc.) o tocás el `app.json`.
