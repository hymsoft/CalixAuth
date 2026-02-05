# CalixAuth - Requerimientos

## 1. Historias de Usuario (User Stories)

| ID       | Como... | Quiero...                                         | Para...                                                      |
| :------- | :------ | :------------------------------------------------ | :----------------------------------------------------------- |
| **US.1** | Usuario | Configurar la longitud y tipo de caracteres.      | Adaptar la contraseña a los requisitos de diferentes sitios. |
| **US.2** | Usuario | Presionar un botón central para generar la clave. | Obtener una contraseña nueva de forma rápida.                |
| **US.3** | Usuario | Copiar la clave al portapapeles con un toque.     | Pegarla fácilmente en otra aplicación.                       |
| **US.4** | Usuario | Ver las últimas 10 claves generadas.              | Recuperar una clave si olvidé pegarla a tiempo.              |
| **US.5** | Usuario | Cambiar el idioma (ES/EN/FR).                     | Usar la app en mi lengua nativa.                             |
| **US.6** | Usuario | Donar 1 USD ("Invitame un café").                 | Apoyar el desarrollo de HyM Soft de forma voluntaria.        |

## 2. Requerimientos No Funcionales

* **Seguridad:** Uso obligatorio de **CSPRNG** (*Cryptographically Secure Pseudo-Random Number Generator*) a través de `expo-crypto`.
* **Privacidad:** **Cero persistencia** en almacenamiento permanente (Nada de SQLite, Realm, ni Async Storage para datos sensibles). Todo debe vivir exclusivamente en memoria RAM.
* **Rendimiento:** Tiempo de "Carga a Primer Cuadro" (TTJI/TTime-To-Interactive) inferior a **2 segundos**.
* **Diseño:** Interfaz minimalista "Single Screen" optimizada para operación con una sola mano.
* **Compatibilidad:** Android 10+ (API Level 29+).
