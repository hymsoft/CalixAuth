import {
  FlatList,
  Text,
  Pressable,
  StyleSheet,
  View,
  Alert,
} from "react-native";
import * as Haptics from "expo-haptics";
import Animated, {
  ZoomIn,
  LinearTransition,
  useSharedValue,
  useAnimatedStyle,
  ZoomOutRight,
  interpolateColor,
  withTiming,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { useSecurityStore, MAX_HISTORY_ENTRIES, PasswordEntry } from "../store/useSecurityStore";
import { Colors } from "../constants/Colors";

interface HistoryListProps {
  onCopy: (password: string, id: string) => void;
}

const HistoryItem = ({
  item,
  onPress,
  isCopied,
  t,
}: {
  item: PasswordEntry;
  onPress: () => void;
  isCopied: boolean;
  t: (key: string) => string;
}) => {
  const isPressed = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      isPressed.value,
      [0, 1],
      [Colors.surface, Colors.background], // Transición sutil hacia el color de fondo
    ),
  }));

  const handlePressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    isPressed.value = withTiming(1, { duration: 100 });
  };

  const handlePressOut = () => {
    isPressed.value = withTiming(0, { duration: 200 });
  };

  return (
    <Animated.View
      entering={ZoomIn.duration(300)}
      exiting={ZoomOutRight.duration(300)}
      layout={LinearTransition}
      style={[
        styles.historyItem,
        animatedStyle,
        isCopied && styles.historyItemCopied,
      ]}
    >
      <Text style={styles.historyItemText}>{item.value}</Text>

      <Pressable
        style={[styles.copyButton, isCopied && styles.copyButtonCopied]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Text style={styles.copyButtonText}>
          {isCopied ? "✓" : t("common.copy")}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

export const HistoryList = ({ onCopy }: HistoryListProps) => {
  const { t } = useTranslation();
  const { history, clearHistory, lastCopiedId } = useSecurityStore();

  const handleClearHistory = () => {
    if (history.length === 0) return;
    Alert.alert(t("common.history"), t("history.delete_confirm"), [
      { text: t("history.cancel"), style: "cancel" },
      { text: t("history.delete"), style: "destructive", onPress: clearHistory },
    ]);
  };

  return (
    <>
      <View style={styles.historyHeader}>
        <Text style={styles.historyCount}>
          {t("common.history")}: {history.length} / {MAX_HISTORY_ENTRIES}
        </Text>
        {history.length > 0 && (
          <Pressable onPress={handleClearHistory} hitSlop={10}>
            <Text style={styles.clearButtonText}>{t("history.delete_all")}</Text>
          </Pressable>
        )}
      </View>

      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        style={styles.historyList}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{t("history.empty")}</Text>
          </View>
        }
        renderItem={({ item }) => (
          <HistoryItem
            item={item}
            isCopied={item.id === lastCopiedId}
            t={t}
            onPress={() => {
              onCopy(item.value, item.id);
            }}
          />
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  historyHeader: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  historyCount: { color: Colors.text.muted, fontSize: 12 },
  clearButtonText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: "bold",
  },
  historyList: {
    width: "90%",
    marginTop: 15,
    marginBottom: 50,
  },
  listContent: {
    paddingBottom: 100,
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: Colors.surface,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  historyItemText: {
    fontFamily: "monospace",
    fontSize: 14,
    color: Colors.text.main,
    flex: 1,
    marginRight: 10,
  },
  historyItemCopied: {
    borderColor: Colors.primary,
    borderWidth: 1,
    borderLeftWidth: 3,
  },
  copyButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  copyButtonCopied: {
    backgroundColor: "#4CAF50", // Standard Green for better visibility
  },
  copyButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    color: Colors.text.muted,
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
  },
});
