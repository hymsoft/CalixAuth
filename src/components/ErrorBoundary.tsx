import React, { Component, ErrorInfo, ReactNode } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

/**
 * Componente que captura errores de renderizado en sus hijos
 * y muestra una interfaz de recuperación amigable.
 * 
 * @author HASegura
 * @company Hymsoft
 * @year 2026
 * @param {Props} props - Propiedades que incluyen los componentes hijos.
 * @returns {ReactNode} El contenido hijo o la interfaz de error.
 */
class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        if (__DEV__) {
            console.error("Uncaught error:", error, errorInfo);
        }
    }

    private handleReset = () => {
        this.setState({ hasError: false });
    };

    public render() {
        if (this.state.hasError) {
            return (
                <View style={styles.container}>
                    <Text style={styles.icon}>⚠️</Text>
                    <Text style={styles.title}>¡Ups! Algo salió mal</Text>
                    <Text style={styles.subtitle}>
                        Hubo un problema al cargar esta parte de la aplicación.
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={this.handleReset}>
                        <Text style={styles.buttonText}>Reintentar</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return this.props.children;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#121212", // Usamos el fondo oscuro por defecto de la app
    },
    icon: {
        fontSize: 64,
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: "#AAAAAA",
        textAlign: "center",
        marginBottom: 30,
    },
    button: {
        backgroundColor: "#FFD700",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    buttonText: {
        color: "#000000",
        fontSize: 16,
        fontWeight: "600",
    },
});

export default ErrorBoundary;
