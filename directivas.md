# 📜 Directivas de Desarrollo - CalixAuth

Este documento contiene las reglas de oro que el agente de IA (**Antigravity**) debe seguir sin excepción. El incumplimiento de estas reglas rompe la confianza del flujo de trabajo.

## 1. Flujo de Trabajo (Proceso)
1.  **Lectura Individual**: Leer los archivos de a uno por vez para evitar errores de contexto.
2.  **Leer antes de Tocar**: Siempre leer un archivo antes de modificarlo para tener la última versión real.
3.  **Un solo paso por vez**: Implementar un cambio, verificarlo, proporcionar el mensaje de commit y esperar el "OK" o la confirmación de commit del usuario.
4.  **No a la iniciativa no charlada**: No agregar funcionalidades, botones o lógicas que no estén explícitamente en el plan o hayan sido discutidas previamente.
5.  **Apego al Plan**: No modificar nada que no esté en el plan de implementación aprobado.
6.  **Gestor de Paquetes**: Usar siempre **pnpm** para la instalación de dependencias y ejecución de scripts.

## 2. Git y Versiones
- **Mensajes de Commit**: Deben ser cortos, descriptivos, en **español** y seguir el formato de **Conventional Commits** con scope (ej: `feat(ui): ...`, `fix(security): ...`).
- **No Commitear**: No ejecutar el comando `git commit` a menos que el usuario lo pida explícitamente. Solo proporcionar el mensaje de texto.
- **Versión**: El formato es `x.x.x`. Se debe mantener la consistencia entre `package.json` y `app.json`.

## 3. Código y Comentarios
- **Idioma**: Todos los comentarios y docstrings deben estar en **español**.
- **Docstrings**: Las funciones nuevas deben incluir:
    - Author (HASegura)
    - Empresa (Hymsoft)
    - Año
    - Parámetros y Retorno
- **Refactorización**: Cualquier refactorización debe ser discutida y aprobada previamente. No se permiten refactors "espontáneos".

## 4. Documentación (Markdown)
- **MD024**: No usar encabezados duplicados en el mismo nivel.
- **MD040**: Todos los bloques de código delimitados (fenced code blocks) deben tener un especificador de lenguaje (ej: ```tsx).
- **Respeto al Linting**: No revertir cambios de formato hechos por el usuario en archivos Markdown.
- **Documentación y Changelog**: En cada paso, revisar si es necesario agregar o quitar algo en la documentación técnica y es **OBLIGATORIO** actualizar el `CHANGELOG.md` antes de proporcionar el mensaje de commit.

## 5. Seguridad
- No dejar `console.log` en código de producción. Usar `if (__DEV__)`.
- Usar siempre generadores de números/IDs criptográficamente seguros (`expo-crypto`) para datos sensibles.
