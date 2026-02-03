import { Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import "../src/i18n";
import { useAppStateCleanup } from "../src/hooks/useAppStateCleanup";
import { Colors } from "../src/constants/Colors";
import { useConfigStore } from "../src/store/useConfigStore";
import ErrorBoundary from "../src/components/ErrorBoundary";

export default function RootLayout() {
  const { theme, loadAllConfig } = useConfigStore();
  const systemColorScheme = useColorScheme();

  // Cargar configuración (idioma y tema) al arrancar
  useEffect(() => {
    loadAllConfig();
  }, []);

  // Determinar el tema activo (si es 'system', usamos el del SO)
  const activeTheme = theme === "system" ? systemColorScheme : theme;
  const isDark = activeTheme === "dark";

  // Inicializar cleanup de AppState
  useAppStateCleanup();

  return (
    <ErrorBoundary>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: isDark ? Colors.dark.background : Colors.background
          },
        }}
      />
    </ErrorBoundary>
  );
}
