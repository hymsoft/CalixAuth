# CalixAuth - Estrategia de Versionado

Para cumplir con el requisito de reflejar cambios reales y constantes sin la fricción de actualizaciones manuales continuas, adoptaremos una estrategia híbrida basada en **CalVer** (Calendar Versioning) para el componente de fecha/hora de compilación.

## 1. Formato de Versión

El formato será: `V Major.Minor.Patch-build.DDMMYYHHMM`

- **V:** Prefijo literal "V" mayúscula
- **Major (X):** Cambios disruptivos o reescrituras completas. (Inicio: `1`)
- **Minor (Y):** Nuevas funcionalidades importantes. (Inicio: `0`)
- **Patch (Z):** Parches o correcciones menores. (Inicio: `0`)
- **build:** Literal "build" minúscula
- **DDMMYYHHMM:** Fecha y hora de compilación en formato `DDMMYYHHMM` (día, mes, año de 2 dígitos, hora 24h, minutos)

### Ejemplo

Si hoy es **28 de Enero de 2026 a las 11:13**:
Versión: **`V 1.0.0-build.2801261113`**

## 2. Automatización

Para evitar errores humanos, la versión no se editará manualmente en `app.json` (excepto Major/Minor/Patch en el código).
Se implementará un script de pre-ejecución (`prestart` / `prebuild`) que actualice automáticamente el campo `version` (o `buildNumber` en Android/iOS) basándose en la fecha y hora actual.

### Flujo de Trabajo

1. Desarrollador ejecuta `npm start` o `eas build`.
2. Script `scripts/set-version.js` se ejecuta.
3. Calcula la fecha y hora: `2801261113`.
4. Actualiza `app.json`:
    - `version`: `V 1.0.0-build.2801261113`
    - `android.versionCode`: `2801261113` (entero)
    - `ios.buildNumber`: `V 1.0.0-build.2801261113`
5. Inicia Expo.

## 3. Beneficios

- **Realidad:** La versión siempre refleja la fecha y hora del último trabajo.
- **Unicidad:** Cada compilación genera una versión única para QA.
- **Precisión:** El formato con minutos permite distinguir compilaciones del mismo día.
- **Cero Fricción:** No requiere intervención manual del desarrollador.
