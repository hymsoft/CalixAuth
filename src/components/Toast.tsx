import React, { useState, useCallback, useImperativeHandle, forwardRef } from "react";
import { StyleSheet, Text, Animated, View } from "react-native";
import { Colors } from "../constants/Colors";
import { useConfigStore } from "../store/useConfigStore";
import { useColorScheme } from "react-native";

export interface ToastRef {
    show: (message: string, duration?: number) => void;
}

/**
 * Componente Toast personalizado con animaciones para feedback visual.
 * 
 * @author HASegura
 * @company Hymsoft
 * @year 2026
 * @param {any} _ - Propiedades de React (no utilizadas).
 * @param {React.Ref<ToastRef>} ref - Referencia para controlar el Toast desde el exterior.
 * @returns {JSX.Element | null} El componente animado o null si no es visible.
 */
export const Toast = forwardRef<ToastRef>((_, ref) => {
    const [message, setMessage] = useState("");
    const [visible, setVisible] = useState(false);
    const opacity = useState(new Animated.Value(0))[0];

    const { theme } = useConfigStore();
    const systemColorScheme = useColorScheme();
    const activeTheme = theme === "system" ? systemColorScheme : theme;
    const isDark = activeTheme === "dark";

    const show = useCallback((msg: string, duration: number = 2000) => {
        setMessage(msg);
        setVisible(true);

        Animated.sequence([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.delay(duration),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => setVisible(false));
    }, [opacity]);

    useImperativeHandle(ref, () => ({
        show,
    }));

    if (!visible) return null;

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    opacity,
                    backgroundColor: isDark ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.8)",
                },
            ]}
        >
            <Text style={[styles.text, { color: isDark ? "#000" : "#FFF" }]}>{message}</Text>
        </Animated.View>
    );
});

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 50,
        alignSelf: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
        zIndex: 9999,
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    text: {
        fontSize: 14,
        fontWeight: "600",
        textAlign: "center",
    },
});
