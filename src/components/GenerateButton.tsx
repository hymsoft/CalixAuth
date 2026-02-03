import { Pressable, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import * as Haptics from "expo-haptics";
import { Colors } from "../constants/Colors";

interface GenerateButtonProps {
  onPress: () => void;
}

export const GenerateButton = ({ onPress }: GenerateButtonProps) => {
  const { t } = useTranslation();

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress();
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.generateButton,
        pressed && { opacity: 0.8 },
      ]}
      onPress={handlePress}
    >
      <Text style={styles.generateButtonText}>{t("common.generate")}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  generateButton: {
    width: "85%",
    backgroundColor: Colors.primary,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    elevation: 3,
  },
  generateButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
