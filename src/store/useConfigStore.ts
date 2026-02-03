import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../i18n";

const LANGUAGE_KEY = "calix_auth_language";
const THEME_KEY = "calix_auth_theme";

export type AppTheme = "system" | "light" | "dark";

interface ConfigState {
  length: number;
  useUppercase: boolean;
  useNumbers: boolean;
  useSymbols: boolean;
  language: string | null;
  theme: AppTheme;
  setLength: (length: number) => void;
  toggleUppercase: () => void;
  toggleNumbers: () => void;
  toggleSymbols: () => void;
  setLanguage: (lang: string) => Promise<void>;
  loadLanguage: () => Promise<void>;
  setTheme: (theme: AppTheme) => Promise<void>;
  loadTheme: () => Promise<void>;
  loadAllConfig: () => Promise<void>;
}

/**
 * Store de Zustand para la gestión de la configuración de la aplicación.
 * Maneja la longitud de la contraseña, tipos de caracteres, idioma y tema.
 * 
 * @author HASegura
 * @company Hymsoft
 * @year 2026
 * @returns {ConfigState} El estado y las acciones de configuración.
 */
export const useConfigStore = create<ConfigState>((set, get) => ({
  length: 12,
  useUppercase: true,
  useNumbers: true,
  useSymbols: true,
  language: null,
  theme: "system",
  setLength: (length) => {
    // Validación de seguridad: restringir entre 8 y 32 caracteres
    const validLength = Math.max(8, Math.min(32, length));
    set({ length: validLength });
  },
  toggleUppercase: () =>
    set((state) => ({ useUppercase: !state.useUppercase })),
  toggleNumbers: () => set((state) => ({ useNumbers: !state.useNumbers })),
  toggleSymbols: () => set((state) => ({ useSymbols: !state.useSymbols })),
  setLanguage: async (lang) => {
    set({ language: lang });
    await AsyncStorage.setItem(LANGUAGE_KEY, lang);
  },
  loadLanguage: async () => {
    const saved = await AsyncStorage.getItem(LANGUAGE_KEY);
    if (saved) {
      set({ language: saved });
      i18n.changeLanguage(saved);
    }
  },
  setTheme: async (theme) => {
    set({ theme });
    await AsyncStorage.setItem(THEME_KEY, theme);
  },
  loadTheme: async () => {
    const saved = await AsyncStorage.getItem(THEME_KEY);
    if (saved) {
      set({ theme: saved as AppTheme });
    }
  },
  loadAllConfig: async () => {
    const { loadLanguage, loadTheme } = get();
    await Promise.all([loadLanguage(), loadTheme()]);
  },
}));
