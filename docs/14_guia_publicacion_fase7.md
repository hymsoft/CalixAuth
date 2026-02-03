# Guía de Fase 6: Pulido y Publicación 🚀

Esta fase marca la transición de un proyecto de desarrollo a una **aplicación lista para el mercado**. Aquí te explico los conceptos clave sin entrar en código todavía.

## 1. Identidad Visual (Los "Assets")

Para que la app se vea profesional en el celular, necesitamos tres archivos clave en la carpeta `assets/`:

- **Icono Universal (`icon.png`)**: Es el cuadrado (o círculo) que ves en el menú de aplicaciones. Debe ser de 1024x1024 px.
- **Icono Adaptativo (Android)**: Android permite que los iconos cambien de forma (cuadrado, círculo, ardilla). Necesita dos partes:
    - `foreground`: El logo (transparente).
    - `background`: El color de fondo (Azul Cronos).
- **Splash Screen (`splash-icon.png`)**: La imagen que aparece mientras la app carga (el logo sobre un fondo sólido).

## 2. El ADN de la App (`app.json`)

Antes de publicar, debemos definir la "identidad legal" de la app:
- **Package Name**: Un ID único en el mundo, como `com.hymsoft.calixauth`. Una vez puesto, no se puede cambiar en la tienda.
- **VersionCode**: Un número entero (1, 2, 3...) que le dice a Google: "esta versión es superior a la anterior".

## 3. EAS Build (Tu Fábrica en la Nube) ☁️

Compilar una app de Android profesional requiere instalar gigas de herramientas (Android Studio, Java, Gradle...). Para evitar eso y no saturar tu PC, usamos **EAS (Expo Application Services)**.

- **¿Cómo funciona?**: Nosotros enviamos el código a los servidores de Expo, ellos lo compilan en sus supercomputadoras y nos devuelven un archivo listo para instalar o subir.
- **Formatos**:
    - **APK**: Archivo para que lo instales vos manualmente y lo pruebes.
    - **AAB (Android App Bundle)**: El archivo oficial que se sube a la Google Play Store.

## 4. El Proceso de Prueba (Sandbox)

Antes de que cualquier cliente vea la app, haremos un **"Internal Build"**:
1. Generamos un link secreto.
2. Lo abrís en tu celular.
3. Instalás la app y verificás: ¿El icono se ve bien? ¿El splash screen tarda mucho? ¿Los colores son los correctos?

## 5. Google Play Console (El Trámite)

Este es el único paso manual. Necesitás una cuenta de desarrollador de Google (pago único de 25 USD). Una vez que la tengas:
- Subimos el archivo `.aab`.
- Completamos la ficha (descripción, capturas de pantalla).
- Google revisa la app (tarda de 2 a 7 días).

---
**¿Cómo seguimos?**
Si estás de acuerdo con este flujo, el primer paso técnico será **generar el Logo definitivo** usando mi herramienta de diseño para luego adaptarlo a los tamaños que pide Expo.
