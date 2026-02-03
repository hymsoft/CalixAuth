import { generatePassword } from "../crypto";

describe("generatePassword", () => {
    it("debe generar una contraseña con la longitud correcta", () => {
        const length = 10;
        const password = generatePassword(length, true, true, true);
        expect(password.length).toBe(length);
    });

    it("debe incluir solo letras minúsculas por defecto", () => {
        const password = generatePassword(100, false, false, false);
        expect(password).toMatch(/^[a-z]+$/);
    });

    it("debe incluir mayúsculas si se solicita", () => {
        const password = generatePassword(100, true, false, false);
        expect(password).toMatch(/[A-Z]/);
    });

    it("debe incluir números si se solicita", () => {
        const password = generatePassword(100, false, true, false);
        expect(password).toMatch(/[0-9]/);
    });

    it("debe incluir símbolos si se solicita", () => {
        const password = generatePassword(100, false, false, true);
        // Escapamos los caracteres especiales para el regex
        expect(password).toMatch(/[!@#$%^&*()_+~`|}{[\]:;?><,./-]/);
    });
});
