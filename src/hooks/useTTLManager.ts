import { useEffect, useRef } from "react";
import { AppState } from "react-native";
import {
  useSecurityStore,
  TTL_CHECK_INTERVAL,
} from "../store/useSecurityStore";

/**
 * Hook personalizado que gestiona el ciclo de vida de la limpieza automática.
 * Configura intervalos de verificación y listeners de estado de la aplicación.
 * 
 * @author HASegura
 * @company Hymsoft
 * @year 2026
 * @returns {void} No retorna valores, gestiona efectos secundarios.
 */
export const useTTLManager = () => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cleanupExpired = useSecurityStore((state) => state.cleanupExpired);

  useEffect(() => {
    // 1. Cleanup inicial (cold start)
    cleanupExpired();

    // 2. Iniciar intervalo
    intervalRef.current = setInterval(cleanupExpired, TTL_CHECK_INTERVAL);

    // 3. AppState listener para detectar foreground/background
    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        cleanupExpired();
      }
    });

    // 4. Cleanup al desmontar
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      subscription.remove();
    };
  }, [cleanupExpired]);
};
