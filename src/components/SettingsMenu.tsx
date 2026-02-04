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
    Alert,
    Image,
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
    const [viewMode, setViewMode] = useState<"main" | "languages" | "themes" | "about">("main");

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

    const handleRateUs = () => {
        Alert.alert(
            t("settings.rate_title"),
            t("settings.rate_message"),
            [{ text: "OK", onPress: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success) }]
        );
    };

    const handleSupport = async () => {
        const url = "mailto:hymsoft@gmail.com?subject=CalixAuth Support";
        try {
            await Linking.openURL(url);
        } catch (error) {
            if (__DEV__) console.error("Error opening Support:", error);
        }
    };

    const handleBuyCoffee = () => {
        Alert.alert(
            t("settings.donation_title"),
            t("settings.donation_message"),
            [{ text: "OK", onPress: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success) }]
        );
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
                                    : viewMode === "about"
                                        ? t("settings.about")
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
                                    <Text style={[styles.versionText, { color: colors.text.muted }]}>V{appVersion}</Text>
                                </View>

                                <TouchableOpacity
                                    style={styles.aboutLink}
                                    onPress={() => setViewMode("about")}
                                >
                                    <Text style={[styles.aboutLinkText, { color: colors.text.muted }]}>
                                        {t("settings.about")}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ) : viewMode === "about" ? (
                            <View style={styles.aboutContainer}>
                                <View style={styles.logoContainer}>
                                    <Image
                                        source={require("../../assets/icon.png")}
                                        style={styles.aboutLogo}
                                        resizeMode="contain"
                                    />
                                </View>

                                <Text style={[styles.appName, { color: colors.text.main }]}>CalixAuth</Text>
                                <Text style={[styles.appVersion, { color: colors.text.muted }]}>v{appVersion}</Text>

                                <View style={styles.aboutInfo}>
                                    <Text style={[styles.aboutLabel, { color: colors.text.muted }]}>
                                        {t("about.developed_by")}
                                    </Text>
                                    <Text style={[styles.aboutValue, { color: colors.primary }]}>HyM Soft</Text>
                                    <Text style={[styles.aboutValue, { color: colors.text.main }]}>Hugo Antonio Segura</Text>
                                </View>

                                <View style={styles.aboutInfo}>
                                    <Text style={[styles.aboutLabel, { color: colors.text.muted }]}>
                                        {t("about.purpose")}
                                    </Text>
                                    <Text style={[styles.aboutValue, { color: colors.text.main, fontStyle: 'italic' }]}>
                                        "{t("about.purpose_desc")}"
                                    </Text>
                                </View>

                                <View style={styles.legalLinksContainer}>
                                    <TouchableOpacity onPress={() => Linking.openURL("https://github.com/hymsoft/CalixAuth/blob/main/PRIVACY.md")}>
                                        <Text style={[styles.legalLink, { color: colors.primary }]}>
                                            {t("about.privacy_policy")}
                                        </Text>
                                    </TouchableOpacity>
                                    <Text style={{ color: colors.text.muted }}> • </Text>
                                    <TouchableOpacity onPress={() => Linking.openURL("https://github.com/hymsoft/CalixAuth/blob/main/TERMS.md")}>
                                        <Text style={[styles.legalLink, { color: colors.primary }]}>
                                            {t("about.terms_of_use")}
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <Text style={[styles.copyright, { color: colors.text.muted }]}>
                                    © 2026 HyM Soft. {t("about.rights")}
                                </Text>
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

    // Estilos para Acerca de
    aboutLink: {
        marginTop: 10,
        alignItems: "center",
        padding: 10,
    },
    aboutLinkText: {
        fontSize: 14,
        textDecorationLine: "underline",
    },
    aboutContainer: {
        alignItems: "center",
        paddingVertical: 10,
        gap: 20,
    },
    logoContainer: {
        width: 100,
        height: 100,
        borderRadius: 20,
        backgroundColor: "rgba(0,0,0,0.05)",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
        overflow: "hidden",
    },
    aboutLogo: {
        width: "100%",
        height: "100%",
    },
    appName: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: -10,
    },
    appVersion: {
        fontSize: 14,
        fontFamily: "monospace",
    },
    aboutInfo: {
        alignItems: "center",
        gap: 4,
    },
    aboutLabel: {
        fontSize: 12,
        fontWeight: "600",
        textTransform: "uppercase",
        opacity: 0.7,
    },
    aboutValue: {
        fontSize: 16,
        fontWeight: "500",
    },
    copyright: {
        fontSize: 12,
        marginTop: 20,
    },
    legalLinksContainer: {
        flexDirection: "row",
        marginTop: 10,
        alignItems: "center",
    },
    legalLink: {
        fontSize: 12,
        textDecorationLine: "underline",
    },
});
