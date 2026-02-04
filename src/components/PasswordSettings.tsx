import { View, Text, Switch, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { useTranslation } from "react-i18next";
import { useConfigStore } from "../store/useConfigStore";
import { Colors } from "../constants/Colors";

export const PasswordSettings = () => {
  const { t } = useTranslation();
  const {
    length,
    useUppercase,
    useNumbers,
    useSymbols,
    setLength,
    toggleUppercase,
    toggleNumbers,
    toggleSymbols,
  } = useConfigStore();

  return (
    <View style={styles.card}>
      <Text style={styles.label}>{t("common.settings")}</Text>

      {/* Fila del Slider */}
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderText}>
          {t("settings.length")}: {length}
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={8}
          maximumValue={32}
          step={1}
          value={length}
          onValueChange={setLength}
          minimumTrackTintColor={Colors.primary}
          thumbTintColor={Colors.primary}
          accessibilityLabel={t("settings.length")}
          accessibilityRole="adjustable"
          accessibilityValue={{ min: 8, max: 32, now: length }}
        />
        <View style={styles.sliderLabels}>
          <Text style={styles.sliderLabelText}>{t("settings.min", { val: 8 })}</Text>
          <Text style={styles.sliderLabelText}>{t("settings.max", { val: 32 })}</Text>
        </View>
      </View>

      {/* Fila de Switches (Horizontal) */}
      <View style={styles.switchesRow}>
        <View style={styles.switchItem}>
          <Text style={styles.switchLabel}>
            {t("settings.uppercase")}
          </Text>
          <Switch
            value={useUppercase}
            onValueChange={toggleUppercase}
            trackColor={{ true: Colors.primary }}
            accessibilityLabel={t("settings.uppercase")}
            accessibilityRole="switch"
          />
        </View>
        <View style={styles.switchItem}>
          <Text style={styles.switchLabel}>
            {t("settings.numbers")}
          </Text>
          <Switch
            value={useNumbers}
            onValueChange={toggleNumbers}
            trackColor={{ true: Colors.primary }}
            accessibilityLabel={t("settings.numbers")}
            accessibilityRole="switch"
          />
        </View>
        <View style={styles.switchItem}>
          <Text style={styles.switchLabel}>
            {t("settings.symbols")}
          </Text>
          <Switch
            value={useSymbols}
            onValueChange={toggleSymbols}
            trackColor={{ true: Colors.primary }}
            accessibilityLabel={t("settings.symbols")}
            accessibilityRole="switch"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    padding: 15,
    borderRadius: 16,
    width: "90%",
    marginBottom: 20,
    elevation: 4,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.primary,
    fontSize: 16,
  },
  sliderContainer: {
    marginBottom: 15,
  },
  sliderText: {
    marginBottom: 5,
    fontSize: 14,
    color: Colors.text.main,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  switchesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  switchItem: {
    alignItems: "center",
    flex: 1,
  },
  switchLabel: {
    fontSize: 13,
    marginBottom: 5,
    color: Colors.text.main,
    textAlign: "center",
    fontWeight: "500",
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    marginTop: -8,
  },
  sliderLabelText: {
    fontSize: 12,
    color: Colors.text.muted,
    fontWeight: "600",
  },
});
