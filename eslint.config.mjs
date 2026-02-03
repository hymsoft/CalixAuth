import expo from "eslint-config-expo";

export default [
    ...expo,
    {
        rules: {
            "no-console": "off", // Permitimos logs ya que los sanitizamos con __DEV__
            "react-native/no-inline-styles": "off",
            "import/no-unresolved": "off",
        },
    },
];
