# CalixAuth - Identidad y Branding

Este documento define los lineamientos visuales y de identidad para **CalixAuth**. La marca se alinea con la infraestructura de diseño de **HyM Soft** ("Cronos View"), heredando sus principios de minimalismo y funcionalidad, pero estableciendo su propia personalidad centrada en la seguridad efímera.

## 1. Naming

* **Nombre Oficial:** **CalixAuth**
* **Pronunciación:** /'kalis-oθ/
* **Origen:** Deriva de "Cáliz" (copa/recipiente) + "Auth" (Autenticación). Representa un contenedor sagrado pero temporal para la información sensible.
* **Nota:** Se desestima la variante "CalyxAuth" para mantener consistencia con el código base y los identificadores de paquete (`com.calix.auth`).

## 2. Paleta de Colores: "Azul Cronos"

Se ha seleccionado la paleta corporativa **Azul Cronos** para reforzar la pertenencia al ecosistema de HyM Soft y transmitir tecnología, confianza y velocidad.

| Token       | Valor HEX | Referencia OKLCH       | Semántica                       |
| :---------- | :-------- | :--------------------- | :------------------------------ |
| **Primary** | `#0077B6` | `oklch(0.48 0.12 263)` | Acción, Marca, Seguridad Activa |
| **Surface** | `#FFFFFF` | `oklch(0.99 0.00 0.0)` | Limpieza, Claridad              |
| **Text**    | `#1A1C20` | `oklch(0.10 0.01 260)` | Legibilidad, Contraste          |

*Decisión:* Se descarta la paleta "Emerald" propuesta inicialmente para priorizar la identidad corporativa sobre la psicología de color genérica de seguridad.

## 3. Isotipo y Simbolismo

El isotipo debe ser puramente geométrico y monolinea, evitando gradientes complejos o sombras ("Flat Design").

* **Concepto:** "El Contenedor Efímero".
* **Construcción:**
    1. **El Cáliz:** Dos trazos parabólicos simétricos que convergen en la base pero no se tocan arriba, formando una "U" estilizada o copa abierta. Representa la recepción del dato.
    2. **El Núcleo:** Un punto sólido (círculo) suspendido en el centro geométrico del espacio negativo de la copa. Representa la contraseña o el secreto generado.
* **Estilo:** Trazo de grosor medio-fuerte, esquinas redondeadas (`stroke-linecap: round`), color sólido `#0077B6` sobre fondo blanco (o blanco sobre `#0077B6` para el ícono de app).

## 4. Interfaz de Usuario (UI)

La UI sigue la filosofía "Utility-First":

* **Sin Hero Section:** No hay banners decorativos ni ilustraciones de bienvenida. La herramienta es el héroe.
* **Jerarquía:**
    1. **Nivel 1:** Botón "Generar" (El elemento más prominente).
    2. **Nivel 2:** Visualización de la contraseña.
    3. **Nivel 3:** Controles de configuración (dashboard) e historial.
    4. **Nivel 4:** Menú de ajustes (SettingsMenu) para tareas administrativas.
* **Feedback:** El uso de vibración (haptics) es parte integral de la marca, reemplazando animaciones visuales excesivas con respuestas táctiles.

## 5. Especificaciones Técnicas de Exportación (Assets)

Para garantizar un resultado profesional en dispositivos con diferentes densidades de píxeles, se deben seguir estas métricas:

| Nombre | Extensión | Medida Real | Medida Segura | Color Fondo | Color Logo | Degradado |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **icon** | `.png` | 1024x1024 px | 820 px (Diámetro) | `#121B2E` | Blanco / `#0077B6` | No |
| **adaptive-foreground** | `.png` | 1024x1024 px | 660 px (Diámetro) | Transparente | Original (`#0077B6`) | Sí |
| **adaptive-background** | `.png` | 1024x1024 px | N/A | `#121B2E` | N/A | No |
| **splash-icon** | `.png` | 2048x2048 px | Central | Transparente | Logo (Deg) + Texto (Blanco) | Sí |
| **favicon** | `.png` | 48x48 px | N/A | Transparente | Original (`#0077B6`) | No |

> [!TIP]
> **Tipografía recomendada para Splash**: Inter Bold.
> El archivo `splash-icon.png` debe centrar el isotipo (Cáliz) y situar el nombre "CalixAuth" debajo con un espaciado elegante.
