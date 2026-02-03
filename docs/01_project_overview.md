# CalixAuth (Project Overview)

> **Generador de Claves Efímeras**

* **Empresa:** HyM Soft
* **Líder de Proyecto:** Hugo Antonio Segura
* **Versión:** 1.0.59 (Cierre de Fase de Auditoría)
* **Estado:** Estable / Producción-Ready

---

## Documentación del Proyecto

La documentación técnica y de negocio se ha dividido en los siguientes módulos para facilitar su lectura y mantenimiento:

1. ### [Requerimientos](03_requirements.md)

    Historias de usuario (`US.1` - `US.6`) y requisitos no funcionales (Seguridad, Privacidad, Rendimiento).

2. ### [Arquitectura Técnica](02_architecture.md)

    Stack tecnológico (Expo, TypeScript, Zustand), estructura de carpetas y decisiones de infraestructura.

3. ### [Diseño y Estética](04_design.md)

    Sistema de color **OKLCH (Azul Cronos)**, tipografía y guías de comportamiento visual.

4. ### [Seguridad y Privacidad](05_security.md)

    Detalles sobre el algoritmo CSPRNG y la estrategia de **"Memoria Volátil"** para protección de datos.

5. ### [Infraestructura de Calidad](11_quality_and_testing.md)

    Pruebas unitarias (Jest), Error Boundaries y estándares de código (ESLint/Prettier).

6. ### [Monetización](06_monetization.md)

    Implementación del modelo de donación "Invítame un café" utilizando **RevenueCat**.

7. ### [Roadmap](00_roadmap.md)

    Plan de trabajo faseado para el MVP.

8. ### [Guía de Inicio Rápido](09_quick_start_guide.md)

    Guía maestra de HyM Soft para iniciar nuevos proyectos con workflow nativo.

9. ### [Identidad y Branding](10_branding.md)

    Lineamientos visuales, logo y naming.

10. ### [Resumen de Auditoría 2026](12_resumen_auditoria_2026.md)

    Registro de mejoras en seguridad, calidad y robustez (Fases 3 y 4).

---

## Resumen Ejecutivo

**CalixAuth** nace de la necesidad de generar contraseñas robustas en dispositivos móviles sin el riesgo de almacenamiento persistente inseguro. A diferencia de los gestores tradicionales que sincronizan todo en la nube, CalixAuth funciona bajo una filosofía de **"Usar y Olvidar"**.

El objetivo es proporcionar una herramienta instantánea (carga < 2s) que permita generar, copiar y descartar credenciales, manteniéndolas en memoria solo el tiempo estrictamente necesario.
