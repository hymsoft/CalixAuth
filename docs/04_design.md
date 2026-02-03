# CalixAuth - Diseño y Estética

Se utilizará la paleta **Azul Cronos** de HyM Soft. Para garantizar la compatibilidad con el motor de renderizado de React Native, se utilizarán equivalentes en **HEX**, manteniendo la referencia **OKLCH** para consistencia visual y accesibilidad.

## 1. Variables de Color

| Token             | Valor HEX (sRGB)      | Referencia OKLCH                                | Uso                                                 |
| :---------------- | :-------------------- | :---------------------------------------------- | :-------------------------------------------------- |
| `primary`         | `#0077B6`             | `oklch(0.4815 0.1178 263.3758)`                 | Botón de Acción Principal (Generar), Links activos. |
| `backgroundDark`  | `#1C222B`             | `oklch(0.2204 0.0198 275.8439)`                 | Fondo principal en Modo Oscuro.                     |
| `backgroundLight` | `#F1F7FB`             | `oklch(0.9755 0.0045 258.3245)`                 | Fondo principal en Modo Claro.                      |
| `surfaceDark`     | `#262D38`             | `oklch(0.28 0.02 275.0)`                        | Tarjetas y modales en oscuros.                      |
| `textPrimary`     | `#FFFFFF` / `#1A1C20` | `oklch(0.99 0.00 0.0)` / `oklch(0.10 0.01 260)` | Texto principal (Dark / Light).                     |

## 2. Comportamiento Visual

* **Adaptabilidad:** La app detectará automáticamente `useColorScheme()` del sistema operativo.
* **Jerarquía:** El botón "Generar" debe ocupar al menos el **20% de la pantalla** o tener un peso visual dominante gracias al color `primary` y sombras sutiles.
* **Feedback:**
  * **Visual:** Micro-animación de "presión" al tocar botones.
  * **Háptico:** Vibración sutil (`expo-haptics`) al generar clave y al copiar al portapapeles.
