import { View, Text, StyleSheet, useColorScheme } from "react-native";
import { useTranslation } from "react-i18next";
import { useConfigStore } from "../store/useConfigStore";
import { Colors } from "../constants/Colors";
import { SettingsMenu } from "./SettingsMenu";

export const Header = () => {
  const { t } = useTranslation();
  const { theme } = useConfigStore();
  const systemColorScheme = useColorScheme();
  const activeTheme = theme === "system" ? systemColorScheme : theme;
  const isDark = activeTheme === "dark";

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft} />
      <View style={styles.titleContainer}>
        <Text
          style={[
            styles.title,
            { color: isDark ? Colors.dark.text.main : Colors.primary },
          ]}
        >
          {t("dashboard.title")}
        </Text>
        <Text
          style={[
            styles.subtitle,
            { color: isDark ? Colors.dark.text.muted : Colors.text.muted },
          ]}
        >
          {t("dashboard.subtitle")}
        </Text>
      </View>
      <View style={styles.headerRight}>
        <SettingsMenu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerLeft: { width: 60, alignItems: "flex-start" },
  titleContainer: { flex: 1, alignItems: "center" },
  headerRight: { width: 60 },
  title: { fontSize: 32, fontWeight: "bold", textAlign: "center" },
  subtitle: { fontSize: 14, marginTop: 5, textAlign: "center" },
});
