// Mocks globales para asegurar estabilidad en tests unitarios
jest.mock("expo-crypto", () => ({
    getRandomValues: (array: Uint8Array) => {
        for (let i = 0; i < array.length; i++) {
            array[i] = Math.floor(Math.random() * 256);
        }
        return array;
    },
    randomUUID: () => "mock-uuid-1234",
}));

// Mock para AsyncStorage para evitar errores de módulo nativo en tests
jest.mock("@react-native-async-storage/async-storage", () =>
    require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
);

// Mock para i18next (usado en los stores)
jest.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
    initReactI18next: {
        type: "3rdParty",
        init: () => { },
    },
}));
