import { useEffect, useRef } from "react";
import { AppState } from "react-native";
import { useSecurityStore } from "../store/useSecurityStore";
import { BACKGROUND_THRESHOLD_MS } from "../utils/clipboard";

/**
 * Hook que detecta cambios de AppState y limpia datos sensibles
 * cuando la app pasa a background por más tiempo que el umbral definido
 */
export const useAppStateCleanup = () => {
  const lastBackgroundTime = useRef<number | null>(null);
  const appStateSubscription = useRef<ReturnType<
    typeof AppState.addEventListener
  > | null>(null);
  const clearAllSensitiveData = useSecurityStore(
    (state) => state.clearAllSensitiveData,
  );

  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === "background") {
        // La app pasa a background, guardar timestamp
        lastBackgroundTime.current = Date.now();
      } else if (
        nextAppState === "active" &&
        lastBackgroundTime.current !== null
      ) {
        // La app vuelve a foreground, calcular tiempo en background
        const timeInBackground = Date.now() - lastBackgroundTime.current;

        if (timeInBackground > BACKGROUND_THRESHOLD_MS) {
          // Usuario estuvo ausente más del umbral, limpiar datos sensibles
          clearAllSensitiveData();
        }

        lastBackgroundTime.current = null;
      }
    };

    // Suscribirse a cambios de AppState
    appStateSubscription.current = AppState.addEventListener(
      "change",
      handleAppStateChange,
    );

    // Cleanup al desmontar: simula terminate ejecutando limpieza completa
    return () => {
      // Limpiar timer si existe
      if (appStateSubscription.current) {
        appStateSubscription.current.remove();
        appStateSubscription.current = null;
      }

      // Limpiar datos sensibles al desmontar (simula cierre de app)
      clearAllSensitiveData();
      lastBackgroundTime.current = null;
    };
  }, [clearAllSensitiveData]);
};
