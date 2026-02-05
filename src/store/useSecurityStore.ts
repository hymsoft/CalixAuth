import { create } from "zustand";
import * as Crypto from "expo-crypto";
import { clearClipboard } from "../utils/clipboard";

export interface PasswordEntry {
  id: string;
  value: string;
  generatedAt: number;
}

interface SecurityState {
  history: PasswordEntry[];
  ttlMs: number;
  lastCopiedId: string | null;
  isClipboardCleared: boolean;
  addPassword: (password: string) => Promise<void>;
  setLastCopiedId: (id: string | null) => void;
  clearHistory: () => void;
  clearClipboard: () => void;
  clearAllSensitiveData: () => void;
  cleanupExpired: () => void;
}

export const DEFAULT_TTL_MS = 60 * 1000; // 60 segundos
export const TTL_CHECK_INTERVAL = 5 * 1000; // Verificar cada 5 segundos
export const MAX_HISTORY_ENTRIES = 10;

/**
 * Store de Zustand para la gestión de la seguridad y efimeridad de los datos.
 * Maneja el historial de contraseñas, el TTL y la limpieza del portapapeles.
 * 
 * @author HASegura
 * @company Hymsoft
 * @year 2026
 * @returns {SecurityState} El estado y las acciones de seguridad.
 */
export const useSecurityStore = create<SecurityState>((set, get) => ({
  history: [],
  ttlMs: DEFAULT_TTL_MS,
  lastCopiedId: null,
  isClipboardCleared: false,
  addPassword: async (password) => {
    const id = Crypto.randomUUID(); // En Expo SDK 50+ randomUUID() es síncrono si está disponible o se usa la extensión
    set((state) => ({
      history: [
        {
          id,
          value: password,
          generatedAt: Date.now(),
        },
        ...state.history,
      ].slice(0, MAX_HISTORY_ENTRIES),
    }));
  },
  setLastCopiedId: (id) => set({ lastCopiedId: id }),
  clearHistory: () => set({ history: [] }),
  clearClipboard: async () => {
    await clearClipboard();
  },
  clearAllSensitiveData: async () => {
    await clearClipboard();
    set({ history: [], lastCopiedId: null, isClipboardCleared: true });
    setTimeout(() => set({ isClipboardCleared: false }), 3000);
  },
  cleanupExpired: () => {
    const { history, ttlMs, lastCopiedId, clearClipboard } = get();
    const now = Date.now();

    // Verificar si la contraseña copiada está por expirar
    const expiredEntries = history.filter(
      (entry) => now - entry.generatedAt >= ttlMs,
    );
    const isCopiedExpired = expiredEntries.some(
      (entry) => entry.id === lastCopiedId,
    );

    if (isCopiedExpired) {
      clearClipboard();
      set({ lastCopiedId: null, isClipboardCleared: true });
      setTimeout(() => set({ isClipboardCleared: false }), 3000);
    }

    const filteredHistory = history.filter(
      (entry) => now - entry.generatedAt < ttlMs,
    );
    if (filteredHistory.length !== history.length) {
      set({ history: filteredHistory });
    }
  },
}));
