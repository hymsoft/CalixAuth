# CalixAuth - Seguridad y Privacidad

## 1. Algoritmo de Generación

Utilizamos la API **`expo-crypto`** para garantizar entropía criptográficamente segura. `Math.random()` está **estrictamente prohibido**.

- **Contraseñas**: Generadas con CSPRNG.
- **Identificadores (IDs)**: Se utiliza `Crypto.randomUUID()` para cada entrada del historial.

### Parámetros Configurables y Validación

- **Longitud:** 8 a 32 caracteres (Validado estrictamente en el Store).
- **Alfabetos:**
  - Mayúsculas (`A-Z`)
  - Minúsculas (`a-z`)
  - Números (`0-9`)
  - Símbolos (`!@#$%^&*...`)

## 2. Gestión de Memoria Volátil (Estrategia HyM)

Dado que la seguridad es prioritaria, implementamos una política agresiva de limpieza de datos en RAM para el historial de claves.

### Reglas de Limpieza

1. **TTL (Time-To-Live):** Cada contraseña generada tiene una vida útil de **60 segundos**. Un temporizador (`useEffect` o middleware en Zustand) verificará y eliminará las entradas expiradas.
2. **Lifecycle Trigger (AppState):**
    - Si la app pasa a estado `background` (segundo plano) o `inactive`, **el historial se purga después de 30 segundos** de inactividad.
    - Al volver a `active`, si el tiempo en background superó el umbral, el historial se limpia.
    - **Justificación del Diseño:** El threshold de 30 segundos es intencional y balancea seguridad con usabilidad:
      - Evita que se borre la contraseña mientras el usuario está copiándola (el TTL es de 60 segundos)
      - Protege contra accesos rápidos a la app (shoulder surfing)
      - Limpiar "inmediately" no tendría sentido práctico porque el usuario ni siquiera tendría tiempo de copiar la clave.
3. **Bloqueo de Pantalla:** Similar al background, el bloqueo del teléfono dispara la limpieza después del threshold de 30 segundos.
4. **Clipboard:** Limpieza automática del portapapeles integrada con el sistema de TTL y AppState.
    > [!NOTE]
    > El borrado sobrescribe el portapapeles activo (comando "Pegar"). Sin embargo, debido a restricciones de Android, no es posible borrar el *Historial del Teclado* (Gboard, Samsung, etc.), el cual es un servicio independiente del sistema operativo.

## 3. Verificación Automatizada

La integridad de estos sistemas de seguridad se verifica continuamente mediante nuestra [Suite de Testing](11_quality_and_testing.md):

- Los tests de **Zustand** aseguran que el TTL limpie los datos exactamente a los 60 segundos.
- Los tests de **Validación** impiden que se configuren longitudes de clave inseguras.
- Los tests de **Criptografía** garantizan que el generador respete la entropía solicitada.
