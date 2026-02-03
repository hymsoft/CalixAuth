import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useSecurityStore } from "../store/useSecurityStore";
import { Colors } from "../constants/Colors";

export const PasswordDisplay = () => {
  const { t } = useTranslation();
  const { history, isClipboardCleared } = useSecurityStore();
  const latestPassword = history[0];

  return (
    <View style={styles.resultContainer}>
      <Text style={styles.passwordText}>
        {isClipboardCleared
          ? t("security.clipboard_cleared")
          : latestPassword?.value || "•••• •••• •••• ••••"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  resultContainer: {
    padding: 20,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    marginBottom: 15,
    width: "85%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.accent,
  },
  passwordText: {
    fontSize: 22,
    fontFamily: "monospace",
    color: Colors.text.main,
    fontWeight: "600",
  },
});
