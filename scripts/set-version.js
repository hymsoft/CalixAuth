const fs = require('fs');
const path = require('path');

const appJsonPath = path.join(__dirname, '../app.json');
const buildVersionPath = path.join(__dirname, '../src/constants/BuildVersion.ts');
const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));

const baseVersion = appJson.expo.version || "1.0.0";

const now = new Date();

// Formato DDMMYY usando hora local de Argentina
const datePart = now.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
}).replace(/\//g, '');

// Formato HHMM usando hora local de Argentina
const timePart = now.toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
}).replace(/:/g, '');

const buildTag = `${datePart}${timePart}`;
const fullVersion = `${baseVersion}-build.${buildTag}`;

// Generamos contenido TypeScript válido
const fileContent = `// Este archivo es generado automáticamente por scripts/set-version.js
export const BuildVersion = "${fullVersion}";
export const BuildDate = "${now.toISOString()}";
`;

fs.writeFileSync(buildVersionPath, fileContent);

console.log(`🚀 CalixAuth v${fullVersion} (Hora local Argentina)`);