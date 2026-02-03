import * as Crypto from "expo-crypto";

/**
 * Genera una contraseña aleatoria criptográficamente segura basada en los criterios seleccionados.
 * 
 * @author HASegura
 * @company Hymsoft
 * @year 2026
 * @param {number} length - Longitud de la contraseña a generar.
 * @param {boolean} useUpper - Incluir letras mayúsculas.
 * @param {boolean} useNumbers - Incluir números.
 * @param {boolean} useSymbols - Incluir caracteres especiales.
 * @returns {string} La contraseña generada.
 */
export const generatePassword = (
  length: number,
  useUpper: boolean,
  useNumbers: boolean,
  useSymbols: boolean,
): string => {
  let charset = "abcdefghijklmnopqrstuvwxyz";
  if (useUpper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (useNumbers) charset += "0123456789";
  if (useSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

  let password = "";
  // Generamos bytes aleatorios de una vez para mayor eficiencia
  const randomBytes = Crypto.getRandomValues(new Uint8Array(length));

  for (let i = 0; i < length; i++) {
    // Usamos el byte aleatorio para elegir un carácter del charset
    password += charset[randomBytes[i] % charset.length];
  }

  return password;
};
