import React, { useState } from "react";
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    useColorScheme,
    Linking,
    Platform,
} from "react-native";
import { useConfigStore } from "../store/useConfigStore";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import * as Haptics from "expo-haptics";
import { Colors } from "../constants/Colors";
import Constants from "expo-constants";

// @ts-ignore - El archivo se genera en tiempo de ejecución
import { BuildVersion } from "../constants/BuildVersion";

interface ThemeColors {
    background: string;
    surface: string;
    text: {
        main: string;
        muted: string;
    };
}

const languages = [
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "pt", name: "Português", flag: "🇧🇷" },
] as const;

export const SettingsMenu = () => {
    const { t } = useTranslation();
    const [visible, setVisible] = useState(false);
    const [viewMode, setViewMode] = useState<"main" | "languages" | "themes">("main");

    const { setLanguage, language: currentLang, theme, setTheme } = useConfigStore();
    const systemColorScheme = useColorScheme();

    // Determinar el tema activo para los estilos del modal
    const activeTheme = theme === "system" ? systemColorScheme : theme;
    const isDark = activeTheme === "dark";

    const themeColors: ThemeColors = isDark ? Colors.dark : Colors.light;
    const colors = {
        ...themeColors,
        primary: Colors.primary,
        accent: Colors.accent,
    };

    const appVersion = BuildVersion || Constants.expoConfig?.version || "1.0.0";

    const handleSelectLanguage = async (code: string) => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        await setLanguage(code);
        i18n.changeLanguage(code);
    };

    const handleRateUs = async () => {
        // URL de ejemplo, se debería reemplazar por la de la Play Store real
        const url = Platform.OS === "android"
            ? "market://details?id=com.hymsoft.calixauth"
            : "https://apps.apple.com/app/idXXXXXXXXX";
        try {
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                await Linking.openURL(url);
            }
        } catch (error) {
            if (__DEV__) console.error("Error opening Rate Us:", error);
        }
    };

    const handleSupport = async () => {
        const url = "mailto:soporte@hymsoft.com.ar?subject=CalixAuth Support";
        try {
            await Linking.openURL(url);
        } catch (error) {
            if (__DEV__) console.error("Error opening Support:", error);
        }
    };

    const handleBuyCoffee = async () => {
        const url = "https://www.buymeacoffee.com/hymsoft";
        try {
            await Linking.openURL(url);
        } catch (error) {
            if (__DEV__) console.error("Error opening Coffee:", error);
        }
    };

    return (
        <>
            <TouchableOpacity
                onPress={() => setVisible(true)}
                style={[styles.gearButton, { backgroundColor: colors.surface }]}
                accessibilityLabel={t("settings.title")}
                accessibilityRole="button"
            >
                <Text style={[styles.gearIcon, { color: colors.primary }]}>⚙️</Text>
            </TouchableOpacity>

            <Modal visible={visible} transparent animationType="slide">
                <TouchableOpacity
                    style={styles.overlay}
                    onPress={() => {
                        setVisible(false);
                        setViewMode("main");
                    }}
                    activeOpacity={1}
                >
                    <View style={[styles.modal, { backgroundColor: colors.surface }]}>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => {
                                if (viewMode !== "main") {
                                    setViewMode("main");
                                } else {
                                    setVisible(false);
                                }
                            }}
                        >
                            <Text style={[styles.closeText, { color: colors.text.muted }]}>
                                {viewMode !== "main" ? "←" : "✕"}
                            </Text>
                        </TouchableOpacity>

                        <Text style={[styles.modalTitle, { color: colors.text.main }]}>
                            {viewMode === "languages"
                                ? t("common.language")
                                : viewMode === "themes"
                                    ? t("settings.theme")
                                    : t("settings.title")}
                        </Text>

                        {viewMode === "main" ? (
                            <View style={styles.menuList}>
                                <TouchableOpacity
                                    style={styles.menuItem}
                                    onPress={() => setViewMode("languages")}
                                >
                                    <Text style={styles.itemIcon}>🌐</Text>
                                    <Text style={[styles.itemText, { color: colors.text.main }]}>
                                        {t("common.language")}
                                    </Text>
                                    <Text style={styles.currentValueLabel}>
                                        {currentLang?.toUpperCase() || ""}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.menuItem}
                                    onPress={() => setViewMode("themes")}
                                >
                                    <Text style={styles.itemIcon}>🌓</Text>
                                    <Text style={[styles.itemText, { color: colors.text.main }]}>
                                        {t("settings.theme")}
                                    </Text>
                                    <Text style={styles.currentValueLabel}>
                                        {t(`settings.theme_${theme}`)}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.menuItem} onPress={handleRateUs}>
                                    <Text style={styles.itemIcon}>⭐</Text>
                                    <Text style={[styles.itemText, { color: colors.text.main }]}>
                                        {t("settings.rate_us")}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.menuItem} onPress={handleSupport}>
                                    <Text style={styles.itemIcon}>📧</Text>
                                    <Text style={[styles.itemText, { color: colors.text.main }]}>
                                        {t("settings.support")}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.coffeeButton, { backgroundColor: colors.accent + "40" }]}
                                    onPress={handleBuyCoffee}
                                >
                                    <Text style={styles.itemIcon}>☕</Text>
                                    <Text style={[styles.coffeeText, { color: colors.primary }]}>
                                        {t("settings.buy_coffee")}
                                    </Text>
                                </TouchableOpacity>

                                <View style={styles.versionContainer}>
                                    <Text style={styles.versionText}>V{appVersion}</Text>
                                </View>
                            </View>
                        ) : viewMode === "languages" ? (
                            <View style={styles.menuList}>
                                {languages.map((lang) => (
                                    <TouchableOpacity
                                        key={lang.code}
                                        style={[
                                            styles.item,
                                            currentLang === lang.code && {
                                                backgroundColor: isDark ? colors.accent + "33" : colors.accent,
                                                borderColor: colors.primary,
                                                borderWidth: 1,
                                            },
                                        ]}
                                        onPress={() => handleSelectLanguage(lang.code)}
                                    >
                                        <Text style={styles.flag}>{lang.flag}</Text>
                                        <Text style={[styles.text, { color: colors.text.main }]}>
                                            {lang.name}
                                        </Text>
                                        {currentLang === lang.code && (
                                            <Text style={[styles.check, { color: colors.primary }]}>
                                                ✓
                                            </Text>
                                        )}
                                    </TouchableOpacity>
                                ))}
                            </View>
                        ) : (
                            <View style={styles.menuList}>
                                {(["system", "light", "dark"] as const).map((tCode) => (
                                    <TouchableOpacity
                                        key={tCode}
                                        style={[
                                            styles.item,
                                            theme === tCode && {
                                                backgroundColor: isDark ? colors.accent + "33" : colors.accent,
                                                borderColor: colors.primary,
                                                borderWidth: 1,
                                            },
                                        ]}
                                        onPress={async () => {
                                            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                            setTheme(tCode);
                                        }}
                                    >
                                        <Text style={styles.itemIcon}>
                                            {tCode === "system" ? "📱" : tCode === "light" ? "☀️" : "🌙"}
                                        </Text>
                                        <Text style={[styles.text, { color: colors.text.main }]}>
                                            {t(`settings.theme_${tCode}`)}
                                        </Text>
                                        {theme === tCode && (
                                            <Text style={[styles.check, { color: colors.primary }]}>
                                                ✓
                                            </Text>
                                        )}
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                </TouchableOpacity>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    gearButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: "center",
        justifyContent: "center",
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    gearIcon: {
        fontSize: 24,
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
    },
    modal: {
        borderRadius: 24,
        padding: 24,
        width: "90%",
        maxWidth: 400,
        maxHeight: "80%",
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        position: "relative",
    },
    closeButton: {
        position: "absolute",
        top: 16,
        right: 16,
        width: 32,
        height: 32,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
    },
    closeText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    menuList: {
        gap: 8,
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderRadius: 12,
        gap: 16,
    },
    itemIcon: {
        fontSize: 22,
    },
    itemText: {
        fontSize: 16,
        fontWeight: "500",
        flex: 1,
    },
    currentValueLabel: {
        fontSize: 12,
        fontWeight: "bold",
        color: Colors.text.muted,
        backgroundColor: "rgba(0,0,0,0.05)",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    coffeeButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 18,
        paddingHorizontal: 12,
        borderRadius: 16,
        gap: 16,
        marginTop: 10,
        borderWidth: 1,
        borderColor: Colors.accent,
        borderStyle: "dashed",
    },
    coffeeText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    versionContainer: {
        marginTop: 20,
        alignItems: "center",
        opacity: 0.5,
    },
    versionText: {
        fontSize: 12,
        fontFamily: "monospace",
        letterSpacing: 1,
    },
    // Estilos para el selector de idiomas (reutilizados)
    item: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 12,
        gap: 12,
        borderRadius: 10,
    },
    flag: { fontSize: 24 },
    text: { fontSize: 16, fontWeight: "500", flex: 1 },
    check: { fontSize: 16, fontWeight: "bold" },
});
