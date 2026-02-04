# Plan de Acción: Pulido Final CalixAuth v1.0.0 🚀
Basado en el feedback del Capitán, este es el plan definitivo para cerrar las tareas pendientes ("en el tintero").
## 1. Ajustes Visuales y Funcionales
* [ ] **Corrección de Visibilidad**: Aplicar el color `muted` al texto de versión en [SettingsMenu.tsx](file:///c:/datos_papa/Desktop/proyectos/Sistemas/CalixAuth/src/components/SettingsMenu.tsx) para que sea legible en Modo Oscuro.
* [ ] **Slider de Longitud**: Agregar etiquetas visuales que indiquen "8" y "32" en los extremos del slider para mayor claridad.
* [ ] **Mensaje de Donación**: Reemplazar el flujo de compra por un mensaje ameno y divertido que informe que la posibilidad de "invitar un café" estará disponible próximamente.
## 2. Soporte e Información
* [ ] **Correo de Soporte**: Actualizar el enlace de contacto a `hymsoft@gmail.com`.
* [ ] **Calificación**: Agregar una breve explicación sobre cómo calificar la app (redirección a la Store).
* [ ] **Sección "Acerca de..."**: Crear una nueva vista o sección dentro del menú que incluya:
    * Nombre y logo de la app.
    * Autoría: HyM Soft / HASegura.
    * Año: 2026.
    * Propósito resumido ("Usar y Olvidar").
## 3. Cumplimiento Legal
* [ ] **PRIVACY.md**: Redactar política de privacidad enfocada en la nula recolección de datos.
* [ ] **TERMS.md**: Redactar términos de servicio básicos.
* [ ] **Vínculos**: Agregar accesos directos a estos documentos en la sección "Acerca de...".
## 4. Infraestructura (Aclaraciones)
* **GitHub Actions (CI/CD)**: Sirve como un "guardián automático". Cada vez que subas código a GitHub, el sistema ejecuta los tests unitarios. Si algo falla (por ejemplo, un cambio rompe la generación de claves), GitHub te avisa con una cruz roja. Es puramente preventivo y privado.
* **TypeDoc**: Documentación técnica automática. Si el código está bien comentado (como lo hicimos), este sistema genera una "página web" privada con la explicación de cada función. Útil si el proyecto crece o se hereda, pero opcional si preferís los archivos [.md](file:///c:/datos_papa/Desktop/proyectos/Sistemas/CalixAuth/README.md) actuales.
---
> [!NOTE]
> Se descartan definitivamente: timers individuales de TTL (para no romper la filosofía minimalista), ofuscación de código y sistemas de tracking externos.