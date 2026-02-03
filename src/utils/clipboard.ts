import * as Clipboard from "expo-clipboard";

const BACKGROUND_THRESHOLD_MS = 30 * 1000; // 30 segundos

/**
 * Limpia el portapapeles de forma segura sobrescribiendo con un espacio.
 * 
 * @author HASegura
 * @company Hymsoft
 * @year 2026
 * @returns {Promise<void>} Promesa que se resuelve tras la limpieza.
 */
export const clearClipboard = async (): Promise<void> => {
  try {
    // Usamos un espacio para asegurar que el sistema detecte un cambio real y sobrescriba
    await Clipboard.setStringAsync(" ");
  } catch (error) {
    if (__DEV__) {
      console.error("Error al limpiar portapapeles:", error);
    }
  }
};

/**
 * Calcula si el tiempo transcurrido en segundo plano supera el umbral de seguridad.
 * 
 * @author HASegura
 * @company Hymsoft
 * @year 2026
 * @param {number | null} lastBackgroundTime - Timestamp del momento en que la app pasó a background.
 * @returns {boolean} True si debe limpiarse el portapapeles, false en caso contrario.
 */
export const shouldClearOnBackgroundReturn = (
  lastBackgroundTime: number | null,
): boolean => {
  if (lastBackgroundTime === null) return false;
  const timeInBackground = Date.now() - lastBackgroundTime;
  return timeInBackground > BACKGROUND_THRESHOLD_MS;
};

export { BACKGROUND_THRESHOLD_MS };
