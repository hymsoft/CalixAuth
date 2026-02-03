# CalixAuth - Infraestructura de Calidad y Testing

Para garantizar que CalixAuth sea una herramienta confiable y segura, hemos implementado una suite completa de pruebas y herramientas de calidad de código.

## 1. Pruebas Unitarias (Jest)

Utilizamos **Jest** junto con el preset de **Expo** para verificar la lógica de negocio y las utilidades críticas.

### Áreas Cubiertas
- **Criptografía (`crypto.ts`)**: Verificamos que las contraseñas generadas cumplan estrictamente con las reglas de longitud y composición (mayúsculas, números, símbolos).
- **Store de Configuración (`useConfigStore.ts`)**: Validamos que las restricciones de seguridad (como la longitud permitida de 8-32 caracteres) no puedan ser vulneradas.
- **Store de Seguridad (`useSecurityStore.ts`)**: Probamos los límites del historial y, lo más importante, el mecanismo de **TTL (Time-To-Live)** que garantiza la efimeridad de los datos.

### Cómo ejecutar los tests
```bash
pnpm test
```

## 2. Resiliencia de la UI (Error Boundaries)

La aplicación cuenta con un **Error Boundary** global en el `RootLayout`. Esto evita que un error inesperado en el renderizado cause un cierre forzado o una pantalla en blanco, mostrando en su lugar una interfaz de recuperación amigable.

## 3. Estándares de Código

Para mantener la consistencia y prevenir errores comunes, implementamos:
- **ESLint (v9 Flat Config)**: Configurado con el estándar de Expo para asegurar buenas prácticas de React Native y TypeScript.
- **Prettier**: Automatiza el formato del código para que sea legible y profesional.

Ejecutar revisión:
```bash
# Linter
pnpm lint

# Formateo automático
pnpm format
```

## 4. Verificación de Seguridad

El testing unitario actúa como un firewall lógico. Por ejemplo, si un cambio en el código intentara reducir la longitud mínima de contraseña por debajo de 8 caracteres, los tests fallarían inmediatamente, protegiendo la integridad del sistema.
