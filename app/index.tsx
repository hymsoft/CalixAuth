import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  ToastAndroid,
  Platform,
} from "react-native";
import { useTranslation } from "react-i18next";
import Constants from "expo-constants";
import { useRef, useEffect } from "react";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";

import { useConfigStore } from "../src/store/useConfigStore";
import { useSecurityStore } from "../src/store/useSecurityStore";
import { useTTLManager } from "../src/hooks/useTTLManager";
import { generatePassword } from "../src/utils/crypto";
import { Colors } from "../src/constants/Colors";

import { Header } from "../src/components/Header";
import { PasswordSettings } from "../src/components/PasswordSettings";
import { PasswordDisplay } from "../src/components/PasswordDisplay";
import { GenerateButton } from "../src/components/GenerateButton";
import { HistoryList } from "../src/components/HistoryList";
import { Toast, ToastRef } from "../src/components/Toast";

// @ts-ignore - El archivo se genera en tiempo de ejecución
import { BuildVersion } from "../src/constants/BuildVersion";

export default function Dashboard() {
  const { t } = useTranslation();
  const toastRef = useRef<ToastRef>(null);

  // Usamos la versión generada o un fallback por si acaso
  const appVersion = BuildVersion || Constants.expoConfig?.version || "1.0.0";
  const { theme } = useConfigStore();
  const systemColorScheme = useColorScheme();
  const activeTheme = theme === "system" ? systemColorScheme : theme;
  const isDark = activeTheme === "dark";
  const colors = isDark ? Colors.dark : Colors.light;

  // Iniciar manager de TTL
  useTTLManager();

  const { length, useUppercase, useNumbers, useSymbols } = useConfigStore();

  const { history, addPassword, setLastCopiedId, isClipboardCleared } = useSecurityStore();

  useEffect(() => {
    if (isClipboardCleared) {
      toastRef.current?.show(t("security.clipboard_cleared"));
    }
  }, [isClipboardCleared, t]);
  const handleGenerate = () => {
    const newPass = generatePassword(
      length,
      useUppercase,
      useNumbers,
      useSymbols,
    );
    addPassword(newPass);
  };

  const handleCopyPassword = async (password: string, id: string) => {
    await Clipboard.setStringAsync(password);
    setLastCopiedId(id);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    // Android 13 (API 33) introduce la notificación nativa obligatoria.
    // Solo mostramos nuestro toast si es una versión anterior para no duplicar.
    if (Platform.OS !== "android" || (Platform.Version as number) < 33) {
      toastRef.current?.show(t("common.copied_to_clipboard"));
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? Colors.dark.background : Colors.background,
        },
      ]}
    >
      <Header />
      <PasswordSettings />
      <PasswordDisplay />
      <GenerateButton onPress={handleGenerate} />
      <HistoryList onCopy={handleCopyPassword} />
      <Toast ref={toastRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%", // Asegura que ocupe todo el ancho
    alignItems: "center",
    paddingTop: 50,
  },
});
