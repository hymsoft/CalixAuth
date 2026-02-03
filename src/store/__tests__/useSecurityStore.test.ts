import { useSecurityStore, MAX_HISTORY_ENTRIES } from "../useSecurityStore";

// Mock de Date.now para controlar el tiempo en los tests de TTL
const originalDateNow = Date.now;

describe("useSecurityStore", () => {
    beforeEach(() => {
        useSecurityStore.setState({
            history: [],
            lastCopiedId: null,
            isClipboardCleared: false,
        });
        global.Date.now = originalDateNow;
    });

    it("debe agregar una contraseña al historial", async () => {
        const { addPassword } = useSecurityStore.getState();
        await addPassword("test-password-1");

        const { history } = useSecurityStore.getState();
        expect(history.length).toBe(1);
        expect(history[0].value).toBe("test-password-1");
        expect(history[0].id).toBeDefined();
    });

    it("debe respetar el límite máximo de entradas en el historial", async () => {
        const { addPassword } = useSecurityStore.getState();

        // Agregamos más del límite (límite es 10)
        for (let i = 0; i < MAX_HISTORY_ENTRIES + 5; i++) {
            await addPassword(`pass-${i}`);
        }

        const { history } = useSecurityStore.getState();
        expect(history.length).toBe(MAX_HISTORY_ENTRIES);
        // El último agregado debe estar primero
        expect(history[0].value).toBe(`pass-${MAX_HISTORY_ENTRIES + 4}`);
    });

    it("debe limpiar entradas expiradas basadas en el TTL", async () => {
        const { addPassword, cleanupExpired } = useSecurityStore.getState();
        const ttlMs = 60000; // 60 segundos

        useSecurityStore.setState({ ttlMs });

        // Mockeamos el tiempo inicial
        const startTime = 1000000;
        global.Date.now = jest.fn(() => startTime);

        await addPassword("pass-expirable");

        // Avanzamos el tiempo más allá del TTL
        global.Date.now = jest.fn(() => startTime + ttlMs + 1000);

        cleanupExpired();

        const { history } = useSecurityStore.getState();
        expect(history.length).toBe(0);
    });

    it("debe mantener entradas que NO han expirado", async () => {
        const { addPassword, cleanupExpired } = useSecurityStore.getState();
        const ttlMs = 60000;

        useSecurityStore.setState({ ttlMs });

        const startTime = 1000000;
        global.Date.now = jest.fn(() => startTime);

        await addPassword("pass-valida");

        // Avanzamos solo la mitad del TTL
        global.Date.now = jest.fn(() => startTime + ttlMs / 2);

        cleanupExpired();

        const { history } = useSecurityStore.getState();
        expect(history.length).toBe(1);
    });
});
