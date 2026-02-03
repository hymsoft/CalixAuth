import { useConfigStore } from "../useConfigStore";

describe("useConfigStore", () => {
    beforeEach(() => {
        // Resetear el store antes de cada test si es necesario
        useConfigStore.setState({
            length: 12,
            useUppercase: true,
            useNumbers: true,
            useSymbols: true,
        });
    });

    it("debe actualizar la longitud correctamente dentro del rango permitido", () => {
        const { setLength } = useConfigStore.getState();
        setLength(20);
        expect(useConfigStore.getState().length).toBe(20);
    });

    it("debe restringir la longitud mínima a 8", () => {
        const { setLength } = useConfigStore.getState();
        setLength(4);
        expect(useConfigStore.getState().length).toBe(8);
    });

    it("debe restringir la longitud máxima a 32", () => {
        const { setLength } = useConfigStore.getState();
        setLength(100);
        expect(useConfigStore.getState().length).toBe(32);
    });

    it("debe alternar los booleanos de configuración", () => {
        const { toggleUppercase, toggleNumbers, toggleSymbols } = useConfigStore.getState();

        toggleUppercase();
        expect(useConfigStore.getState().useUppercase).toBe(false);

        toggleNumbers();
        expect(useConfigStore.getState().useNumbers).toBe(false);

        toggleSymbols();
        expect(useConfigStore.getState().useSymbols).toBe(false);
    });
});
